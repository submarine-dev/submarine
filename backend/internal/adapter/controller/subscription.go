package controller

import (
	"errors"
	"log/slog"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/submarine/submarine/backend/internal/domain/entity"
	"github.com/submarine/submarine/backend/internal/framework/serror"
	"github.com/submarine/submarine/backend/internal/usecase/interactor"
)

type GetSubscriptionsRequest struct {
	limit  int `query:"limit"`
	offset int `query:"limit"`
}

type GetSubscriptionsResponse struct {
	SubscriptionID   string `json:"id"`
	SubscriptionName string `json:"name"`
	SubscriptionIcon string `json:"icon"`
	IsSubscribed     bool   `json:"isSubscribed"`
}

// subscription godoc
// @Summary  Get Subscriptions
// @ID       GetSubscriptions
// @Tags     Subscription
// @Produce  json
// @Param 	 request 	query 		GetSubscriptionsRequest 	true		"get subscription request"
// @Success  200  {array}		GetSubscriptionsResponse
// @Failure  400  {object}  echo.HTTPError
// @Failure  500  {object}  echo.HTTPError
// @Router   /subscription [get]
func GetSubscriptions(ts *interactor.TemplSubscription) MustLogin {
	return func(ctx echo.Context) error {
		var reqQuery GetSubscriptionsRequest
		if err := ctx.Bind(&reqQuery); err != nil {
			return echo.ErrBadRequest
		}

		result, err := ts.GetTemplSubscriptions(ctx.Request().Context(), interactor.GetTemplSubscriptionParam{
			Limit:  reqQuery.limit,
			Offset: (reqQuery.offset - 1) * reqQuery.limit,
		})

		if err != nil {
			switch {
			default:
				return echo.ErrInternalServerError
			}
		}

		var responses []GetSubscriptionsResponse
		for _, r := range result {
			responses = append(responses, GetSubscriptionsResponse{
				SubscriptionID:   r.ID,
				SubscriptionName: r.Name,
				SubscriptionIcon: r.Icon,
				IsSubscribed:     r.IsSubscribed,
			})
		}

		ctx.JSON(http.StatusOK, responses)
		return nil
	}
}

type GetSubscriptionRequest struct {
	SubscriptionID string `param:"subscriptionId"`
}

type GetSubscriptionResponse struct {
	SubscriptionID   string              `json:"id"`
	SubscriptionName string              `json:"name"`
	SubscriptionIcon string              `json:"icon"`
	Plans            []*entity.TemplPlan `json:"plan"`
	IsSubscribed     bool                `json:"isSubscribed"`
}

// subscription godoc
// @Summary  Get Subscription
// @ID       GetSubscription
// @Tags     Subscription
// @Produce  json
// @Param 	 subscriptionId 	path 				string									true 	"subscription id"
// @Success  200  {object}  GetSubscriptionResponse
// @Failure  400  {object}  echo.HTTPError
// @Failure  500  {object}  echo.HTTPError
// @Router   /subscription/{subscriptionId} [get]
func GetSubscription(ts *interactor.TemplSubscription) MustLogin {
	return func(ctx echo.Context) error {
		var reqQuery GetSubscriptionRequest
		if err := ctx.Bind(&reqQuery); err != nil {
			return echo.ErrBadRequest
		}

		result, err := ts.GetTemplSubscription(ctx.Request().Context(), reqQuery.SubscriptionID)
		if err != nil {
			switch {
			case errors.Is(err, serror.ErrResourceNotFound):
				slog.Info("resource not found", "subscriptionID", reqQuery.SubscriptionID)
				return echo.ErrBadRequest
			default:
				return echo.ErrInternalServerError
			}
		}

		ctx.JSON(http.StatusOK, GetSubscriptionResponse{
			SubscriptionID:   result.ID,
			SubscriptionName: result.Name,
			SubscriptionIcon: result.Icon,
			IsSubscribed:     result.IsSubscribed,
			Plans:            result.TemplPlan,
		})
		return nil
	}
}
