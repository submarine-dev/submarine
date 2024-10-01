package router

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/newrelic/go-agent/v3/integrations/nrecho-v4"
	"github.com/newrelic/go-agent/v3/newrelic"
)

func NewEcho(app *newrelic.Application) http.Handler {
	engine := echo.New()

	engine.Use(
		nrecho.Middleware(app),
	)

	return engine
}
