package driver

import (
	"context"
	"database/sql"
	"fmt"
	"log/slog"
	"net"
	"os"
	"time"

	"cloud.google.com/go/cloudsqlconn"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/stdlib"
	"github.com/pandoratoolbox/bun/extra/bunslog"
	"github.com/submarine/submarine/backend/cmd/config"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
)

func NewDB() *sql.DB {
	var sqlDB *sql.DB
	if config.Config.Application.Env == config.EnvLocal {
		dsn := fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=%s",
		config.Config.DB.User,
		config.Config.DB.Password,
		config.Config.DB.Host,
		config.Config.DB.Port,
		config.Config.DB.DBName,
		config.Config.DB.SSLMode,
	)
	slog.Debug("connecting database.", "dsn", dsn)

	pgxConfig, err := pgx.ParseConfig(dsn)
	if err != nil {
		slog.Error("failed to parse config.", "error", err)
		panic(err)
	}

	sqlDB = stdlib.OpenDB(*pgxConfig)
	}else {
		db, err  := connectWithConnector()
		if err != nil {
			slog.Error("failed to connection.", "error", err)
			panic(err)
		}
		sqlDB = db
	}
	

	return sqlDB
}

func connectWithConnector() (*sql.DB, error) {

	usePrivate             := os.Getenv("PRIVATE_IP")
	dsn := fmt.Sprintf("user=%s password=%s database=%s", config.Config.DB.User, config.Config.DB.Password, config.Config.DB.DBName)
	pgxConfig, err := pgx.ParseConfig(dsn)
	if err != nil {
					return nil, err
	}
	var opts []cloudsqlconn.Option
	if usePrivate != "" {
					opts = append(opts, cloudsqlconn.WithDefaultDialOptions(cloudsqlconn.WithPrivateIP()))
	}
	d, err := cloudsqlconn.NewDialer(context.Background(), opts...)
	if err != nil {
					return nil, err
	}
	// Use the Cloud SQL connector to handle connecting to the instance.
	// This approach does *NOT* require the Cloud SQL proxy.
	pgxConfig.DialFunc = func(ctx context.Context, network, instance string) (net.Conn, error) {
					return d.Dial(ctx, config.Config.DB.Host)
	}
	dbURI := stdlib.RegisterConnConfig(pgxConfig)
	dbPool, err := sql.Open("pgx", dbURI)
	if err != nil {
					return nil, fmt.Errorf("sql.Open: %w", err)
	}
	return dbPool, nil
}

func NewBun(sqlDB *sql.DB) *bun.DB {
	var err error
	for i := range 5 {
		slog.Info("trying open DB.", "attempts", i+1)
		db := bun.NewDB(sqlDB, pgdialect.New())
		if err = db.Ping(); err == nil {

			db.AddQueryHook(bunslog.NewQueryHook(
				bunslog.WithQueryLogLevel(slog.LevelDebug),
				bunslog.WithSlowQueryLogLevel(slog.LevelWarn),
				bunslog.WithErrorQueryLogLevel(slog.LevelError),
				bunslog.WithSlowQueryThreshold(3*time.Second),
			))

			return db
		}
	}

	slog.Error("failed to open DB.", "error", err)
	return nil
}
