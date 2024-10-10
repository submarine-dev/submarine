package controller

import (
	"errors"
	"fmt"
	"log/slog"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/submarine/submarine/backend/internal/domain/entity"
	"github.com/submarine/submarine/backend/internal/framework/scontext"
	"github.com/submarine/submarine/backend/internal/usecase/interactor"
)

// MARK: GetUserSubscriptions
type GetUserSubscriptionsRequest struct {
	UserID string `param:"userId"`
}

func (r GetUserSubscriptionsRequest) Validate(ctx echo.Context) error {
	if r.UserID == "" {
		return fmt.Errorf("userId is required")
	}

	if scontext.GetUserID(ctx.Request().Context()) != r.UserID {
		return fmt.Errorf("userID dont match")
	}

	return nil
}

type GetUserSubscriptionsResponse struct {
	UserSubscriptions   []entity.UserSubscription
	TotalAmountPerDay   int `json:"totalAmountPerDay"`
	TotalAmountPerMonth int `json:"totalAmountPerMonth"`
	TotalAmountPerYear  int `json:"totalAmountPerYear"`
}

// subscription godoc
// @Summary  Get Subscription
// @ID       GetUserSubscriptions
// @Tags     Subscription
// @Produce  json
// @Param 	 userId		 	path 				string									false 	"user id"
// @Success  200  {object}  GetUserSubscriptionsResponse
// @Failure  400  {object}  echo.HTTPError
// @Failure  500  {object}  echo.HTTPError
// @Router   /subscription/{userId}/subscriptions [get]
func GetUserSubscriptions(us *interactor.UserSubscription) MustLogin {
	return func(ctx echo.Context) error {
		var reqQuery GetUserSubscriptionsRequest
		if err := ctx.Bind(&reqQuery); err != nil {
			return echo.ErrBadRequest
		}

		if err := reqQuery.Validate(ctx); err != nil {
			slog.Warn("validate error", "error", err)
			return echo.ErrBadRequest
		}

		result, err := us.GetUserSubscriptions(ctx.Request().Context(), reqQuery.UserID)
		if err != nil {
			switch {
			default:
				slog.Warn("failed to request.", "error", err)
				return echo.ErrInternalServerError
			}
		}

		ctx.JSON(http.StatusOK, GetUserSubscriptionsResponse(result))

		return nil
	}
}

// MARK: CreateUserSubscription
type CreateUserSubscriptionRequest struct {
	SubscriptionID string `json:"subscriptionId"`
	PlanID         string `json:"planId"`

	Name            string             `json:"name"`
	UnsubscribeLink string             `json:"unsubscribeLink"`
	PlanName        string             `json:"planName"`
	PlanPrice       int                `json:"planPrice"`
	PlanPaymentType entity.PaymentType `json:"planPaymentType"`
}

func (r *CreateUserSubscriptionRequest) Validate(ctx echo.Context) error {
	if r.SubscriptionID == "" || r.PlanID == "" {
		if r.Name == "" || r.PlanPaymentType == "" {
			return errors.New("invalid argment")
		}
	}

	return nil
}

type CreateUserSubscriptionResponse struct {
}

func CreateUserSubscription() MustLogin {
	return func(ctx echo.Context) error {
		panic("impl me")
	}
}

// MARK: UpdateUserSubscription
type UpdateUserSubscriptionRequest struct {
}

type UpdateUserSubscriptionResponse struct {
}

func UpdateUserSubscription() MustLogin {
	return func(ctx echo.Context) error {
		panic("impl me")
	}
}

// MARK: DeleteUserSubscription
type DeleteUserSubscriptionRequest struct {
}

type DeleteUserSubscriptionResponse struct {
}

func DeleteUserSubscription() MustLogin {
	return func(ctx echo.Context) error {
		panic("impl me")
	}
}
