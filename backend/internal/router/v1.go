package router

import (
	"github.com/labstack/echo/v4"
	"github.com/submarine/submarine/backend/internal/adapter/controller"
)

func v1Route(engine *echo.Echo, i *di) {
	v1 := engine.Group("/v1")
	// subscriptions route
	subscriptionRoute := v1.Group("/subscriptions")
	{
		subscriptionRoute.GET("", controller.GetSubscriptions(i.ts).MustLogin(i.login))
		subscriptionRoute.GET("/:subscriptionId", controller.GetSubscription(i.ts).MustLogin(i.login))
	}

	// user route
	userRoute := v1.Group("/users")
	{
		// user subscriptions route
		userSubscriptionRoute := userRoute.Group("/:userId/subscriptions")
		{
			userSubscriptionRoute.GET("", controller.GetUserSubscriptions(i.us).MustLogin(i.login))
			userSubscriptionRoute.POST("", controller.CreateUserSubscription(i.us).MustLogin(i.login))

			userSubscriptionRoute.PUT("/:userSubscriptionId", nil)
			userSubscriptionRoute.DELETE("/:userSubscriptionId", nil)
		}
	}
}
