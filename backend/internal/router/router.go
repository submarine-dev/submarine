package router

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/murasame29/go-httpserver-template/internal/adapter/controller"
	"github.com/murasame29/go-httpserver-template/internal/adapter/middleware"
	"github.com/newrelic/go-agent/v3/integrations/nrecho-v4"
	"github.com/newrelic/go-agent/v3/newrelic"
)

func NewEcho(app *newrelic.Application, i *di) http.Handler {
	engine := echo.New()

	engine.Use(
		nrecho.Middleware(app),
		middleware.GetUserAgent(),
	)

	// Login Endpoint
	engine.POST("/login/google", controller.LoginGoogle(i.login, i.cookie))

	// subscriptions route
	subscriptionRoute := engine.Group("/subscriptions")
	{
		subscriptionRoute.GET("", nil)
		subscriptionRoute.POST("", nil)

		subscriptionRoute.GET("/:subscriptionId", nil)
		subscriptionRoute.PUT("/:subscriptionId", nil)
		subscriptionRoute.DELETE("/:subscriptionId", nil)
	}
	// user route
	userRoute := engine.Group("/users")
	{
		// user subscriptions route
		userSubscriptionRoute := userRoute.Group("/:userId/subscriptions")
		{
			userSubscriptionRoute.GET("", nil)
			userSubscriptionRoute.POST("", nil)

			userSubscriptionRoute.GET("/:userSubscriptionId", nil)
			userSubscriptionRoute.PUT("/:userSubscriptionId", nil)
			userSubscriptionRoute.DELETE("/:userSubscriptionId", nil)
		}
	}

	return engine
}
