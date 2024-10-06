package main

import (
	"flag"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/murasame29/go-httpserver-template/cmd/config"
)

const GoogleAuthURL = "https://accounts.google.com/o/oauth2/v2/auth?scope=%s&redirect_uri=%s&response_type=code&client_id=%s&access_type=offline&prompt=consent"

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
	engine := echo.New()
	engine.Server.Addr = ":3000"

	engine.GET("/", func(c echo.Context) error {
		googleAuthURL := fmt.Sprintf(GoogleAuthURL,
			"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
			"http://localhost:3000/google/callback",
			config.Config.GoogleService.ClientID,
		)
		tmpl := fmt.Sprintf(`
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>debug</title>
		</head>
		<body>
			<a href="%s">LoginGoogle</a>
		</body>
		</html>		
		`,
			googleAuthURL,
		)

		return c.HTML(http.StatusOK, tmpl)
	})

	engine.GET("/google/callback", func(c echo.Context) error {
		tmpl := `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>debug</title>
			</head>
			<body>
			</body>
			</html>
		`

		return c.HTML(http.StatusOK, tmpl)
	})

	if err := engine.Server.ListenAndServe(); err != nil {
		panic(err)
	}
}
