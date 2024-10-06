package main

import (
	"context"
	"flag"
	"log/slog"
	"net/http"
	"os"
	"strings"

	"github.com/murasame29/go-httpserver-template/cmd/config"
	"github.com/murasame29/go-httpserver-template/internal/container"
	"github.com/murasame29/go-httpserver-template/internal/framework/server"
)

type envFlag []string

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
	// サーバーの起動
	if err := container.NewContainer(); err != nil {
		return err
	}

	// handler をinvoke
	var handler http.Handler
	handler, err := container.Invoke[http.Handler]()
	if err != nil {
		return err
	}

	server.New(
		handler,
		server.WithHost(config.Config.Server.Host),
		server.WithPort(config.Config.Server.Port),
		server.WithShutdownTimeout(config.Config.Server.ShutdownTimeout),
	).RunWithGracefulShutdown(context.Background())

	return nil
}
