package router

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/newrelic/go-agent/v3/integrations/nrecho-v4"
	"github.com/newrelic/go-agent/v3/newrelic"
	"github.com/submarine/submarine/backend/internal/adapter/controller"
	"github.com/submarine/submarine/backend/internal/adapter/middleware"
)

func NewEcho(app *newrelic.Application, i *di) http.Handler {
	engine := echo.New()

	engine.GET("/healthz", func(c echo.Context) error {
		c.JSON(http.StatusOK, map[string]string{"result": "ok"})
		return nil
	})

	engine.Use(
		nrecho.Middleware(app),
		middleware.RequestID(),
		middleware.SetupCORS(),
		middleware.GetUserAgent(),
	)

	nrecho.WrapRouter(engine)

	// Login Endpoint
	engine.POST("/login/google", controller.LoginGoogle(i.login, i.cookie))

	{
		v1Route(engine, i)
	}

	return engine
}
