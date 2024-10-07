package main

import (
	"errors"
	"flag"
	"fmt"
	"log/slog"
	"os"
	"strings"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	"github.com/submarine/submarine/backend/cmd/config"
	"github.com/submarine/submarine/backend/internal/driver"
)

type envFlag []string

var (
	file      string
	operation string
)

func (e *envFlag) String() string {
	return strings.Join(*e, ",")
}

func (e *envFlag) Set(v string) error {
	*e = append(*e, v)
	return nil
}

func init() {
	// Usage: eg. go run main.go -e .env -e hoge.env -e fuga.env ...
	var envFile envFlag
	flag.Var(&envFile, "e", "path to .env file \n eg. -e .env -e another.env . ")
	flag.Var(&envFile, "o", "path to migrate schema file \n eg. -o cmd/migrate/source .")
	flag.Var(&envFile, "f", "select to operation \n eg. -f up / down .")
	flag.Parse()

	if err := config.LoadEnv(envFile...); err != nil {
		slog.Error("Error loading .env file", "error", err)
	}

	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelDebug,
	})))
}
func main() {
	if err := run(); err != nil {
		slog.Error("Error running server", "error", err)
	}
}

func run() error {
	sqlDB := driver.NewDB()

	driver, err := postgres.WithInstance(sqlDB, &postgres.Config{})
	if err != nil {
		return fmt.Errorf("failed to create postgres instance. %+v", err)
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file:///"+file,
		"postgres",
		driver,
	)
	if err != nil {
		return fmt.Errorf("failed to create postgres database instance. %+v", err)
	}

	slog.Info("trying migrate ...", "operation", operation)

	switch operation {
	case "up":
		if err := m.Up(); err != nil {
			if !errors.Is(err, migrate.ErrNoChange) {
				return fmt.Errorf("failed to migrate up. %+v", err)
			}
		}
	case "down":
		if err := m.Down(); err != nil {
			if !errors.Is(err, migrate.ErrNoChange) {
				return fmt.Errorf("failed to migrate up. %+v", err)
			}
		}
	default:
		return fmt.Errorf("missing operation. %s", operation)
	}

	slog.Info("migrate successful")
	return nil
}
