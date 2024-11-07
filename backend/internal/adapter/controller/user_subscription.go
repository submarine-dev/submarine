package controller

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/submarine/submarine/backend/internal/domain/entity"
	"github.com/submarine/submarine/backend/internal/framework/scontext"
	"github.com/submarine/submarine/backend/internal/framework/serror"
	"github.com/submarine/submarine/backend/internal/usecase/interactor"
)

// MARK: GetUserSubscriptions
type GetUserSubscriptionsRequest struct {
	UserID string `param:"userId"`
}

func (r GetUserSubscriptionsRequest) Validate(ctx context.Context) error {
	if r.UserID == "" {
		return fmt.Errorf("userId is required")
	}

	if scontext.GetUserID(ctx) != r.UserID {
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
// @Tags     UserSubscription
// @Produce  json
// @Param 	 userId		 	path 				string									false 	"user id"
// @Success  200  {object}  GetUserSubscriptionsResponse
// @Failure  400  {object}  echo.HTTPError
// @Failure  500  {object}  echo.HTTPError
// @Router   /users/{userId}/subscriptions [get]
func GetUserSubscriptions(us *interactor.UserSubscription) MustLogin {
	return func(c echo.Context) error {
		var reqQuery GetUserSubscriptionsRequest
		if err := c.Bind(&reqQuery); err != nil {
			return echo.ErrBadRequest
		}

		ctx := scontext.ConvertContext(c)

		if err := reqQuery.Validate(ctx); err != nil {
			slog.Warn("validate error", "error", err)
			return echo.ErrBadRequest
		}

		result, err := us.GetUserSubscriptions(ctx, reqQuery.UserID)
		if err != nil {
			switch {
			default:
				slog.Warn("failed to request.", "error", err)
				return echo.ErrInternalServerError
			}
		}

		c.JSON(http.StatusOK, GetUserSubscriptionsResponse(result))

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
	Currency        string             `json:"currency"`
	PlanPaymentType entity.PaymentType `json:"planPaymentType"`
}

func (r CreateUserSubscriptionRequest) Validate(ctx context.Context, userID string) error {
	if userID != scontext.GetUserID(ctx) {
		return serror.ErrUserIDDontMatch
	}

	if r.SubscriptionID == "" || r.PlanID == "" {
		if r.Name == "" || r.PlanPaymentType == "" {
			return errors.New("invalid argment")
		}
	}

	if r.PlanID != "" && r.Name != "" || r.UnsubscribeLink != "" || r.PlanName != "" || r.Currency != "" || r.PlanPaymentType != "" {
		return errors.New("too much request body. If you set the planID, do not set other args")
	}

	return nil
}

type CreateUserSubscriptionResponse struct {
	UserSubscrionID string `json:"userSubscrionId"`
}

// usersubscription godoc
// @Summary  User Subscription
// @ID       CreateUserSubscription
// @Tags     UserSubscription
// @Accept   json
// @Produce  json
// @Param 	 userId		 	path 				string									false 	"user id"
// @Param 	 q			 	body 		 	CreateUserSubscriptionRequest  	true 		"CreateUserSubscriptionRequest"
// @Success  200  	 	{object}  CreateUserSubscriptionResponse
// @Failure  400  {object}  echo.HTTPError
// @Failure  500  {object}  echo.HTTPError
// @Router   /users/{userId}/subscriptions [post]
func CreateUserSubscription(us *interactor.UserSubscription) MustLogin {
	return func(c echo.Context) error {
		var reqBody CreateUserSubscriptionRequest
		if err := c.Bind(&reqBody); err != nil {
			slog.Warn("failed to bind.", "error", err)
			return echo.ErrBadRequest
		}

		ctx := scontext.ConvertContext(c)

		userID := c.Param("userId")

		if err := reqBody.Validate(ctx, userID); err != nil {
			slog.Warn("failed to validate.", "error", err, "userID", userID, "sUserID", scontext.GetUserID(ctx))
			return echo.ErrBadRequest
		}

		newID, err := us.CreateUserSubscription(ctx, interactor.CreateUserSubscriptionParam{
			UserID:          userID,
			TemplID:         reqBody.SubscriptionID,
			TemplPlanID:     reqBody.PlanID,
			Name:            reqBody.Name,
			UnsubscribeLink: reqBody.UnsubscribeLink,
			PlanName:        reqBody.PlanName,
			Price:           reqBody.PlanPrice,
			PaymentType:     reqBody.PlanPaymentType,
		})

		if err != nil {
			switch {
			case errors.Is(err, serror.ErrResourceNotFound):
				return echo.ErrBadRequest

			default:
				return echo.ErrInternalServerError
			}
		}

		c.JSON(http.StatusOK, CreateUserSubscriptionResponse{
			UserSubscrionID: newID,
		})

		return nil
	}
}

// MARK: UpdateUserSubscription
type UpdateUserSubscriptionRequest struct {
	UserID             string `param:"userId"`
	UserSubscriptionID string `param:"userSubscriptionId"`
	PlanID             string `json:"planId"`

	Name            string             `json:"name"`
	UnsubscribeLink string             `json:"unsubscribeLink"`
	PlanName        string             `json:"planName"`
	PlanPrice       int                `json:"planPrice"`
	Currency        string             `json:"currency"`
	PlanPaymentType entity.PaymentType `json:"planPaymentType"`
}

func (r *UpdateUserSubscriptionRequest) Validate(ctx context.Context) error {
	if r.UserID != scontext.GetUserID(ctx) {
		return serror.ErrUserIDDontMatch
	}

	if r.UserSubscriptionID == "" {
		return errors.New("user subscription required")
	}

	if r.PlanID == "" {
		if r.Name == "" &&
			r.UnsubscribeLink == "" &&
			r.PlanName == "" &&
			r.Currency == "" &&
			r.PlanPaymentType == "" {
			return errors.New("invalid argment")
		}
	}

	if r.PlanID != "" && r.Name != "" || r.UnsubscribeLink != "" || r.PlanName != "" || r.Currency != "" || r.PlanPaymentType != "" {
		return errors.New("too much request body. If you set the planID, do not set other Args")
	}

	return nil
}

type UpdateUserSubscriptionResponse struct {
	UserSubscriptions   []entity.UserSubscription
	TotalAmountPerDay   int `json:"totalAmountPerDay"`
	TotalAmountPerMonth int `json:"totalAmountPerMonth"`
	TotalAmountPerYear  int `json:"totalAmountPerYear"`
}

// usersubscription godoc
// @Summary  User Subscription
// @ID       UpdateUserSubscription
// @Tags     UserSubscription
// @Accept   json
// @Produce  json
// @Param 	 userId		 							path 				string									false 	"user id"
// @Param 	 userSubscriptionId		 	path 				string									false 	"userSubscriptionId"
// @Param 	 q			 	body 		 	UpdateUserSubscriptionRequest  	true 		"UpdateUserSubscriptionRequest"
// @Success  200  	 	{object}  UpdateUserSubscriptionResponse
// @Failure  400  {object}  echo.HTTPError
// @Failure  500  {object}  echo.HTTPError
// @Router   /users/{userId}/subscriptions/{:userSubscriptionId} [put]
func UpdateUserSubscription(us *interactor.UserSubscription) MustLogin {
	return func(c echo.Context) error {
		var reqQuery UpdateUserSubscriptionRequest
		if err := c.Bind(&reqQuery); err != nil {
			slog.Warn("failed to bind.", "error", err)
			return echo.ErrBadRequest
		}

		ctx := scontext.ConvertContext(c)

		if err := reqQuery.Validate(ctx); err != nil {
			slog.Warn("failed to validate.", "error", err, "userID", reqQuery.UserID, "sUserID", scontext.GetUserID(ctx))
			return echo.ErrBadRequest
		}

		if err := us.DeleteUserSubscription(ctx, reqQuery.UserSubscriptionID); err != nil {
			switch {
			case errors.Is(err, serror.ErrResourceNotFound):
				return echo.ErrBadRequest

			default:
				return echo.ErrInternalServerError
			}
		}

		result, err := us.GetUserSubscriptions(ctx, reqQuery.UserID)
		if err != nil {
			switch {
			default:
				slog.Warn("failed to request.", "error", err)
				return echo.ErrInternalServerError
			}
		}

		return c.JSON(http.StatusOK, UpdateUserSubscriptionResponse(result))
	}
}

// MARK: DeleteUserSubscription
type DeleteUserSubscriptionRequest struct {
	UserID             string `param:"userId"`
	UserSubscriptionID string `param:"userSubscriptionId"`
}

func (r *DeleteUserSubscriptionRequest) Validate(ctx context.Context) error {
	if r.UserID != scontext.GetUserID(ctx) {
		return serror.ErrUserIDDontMatch
	}

	if r.UserSubscriptionID == "" {
		return errors.New("user subscription required")
	}

	return nil
}

type DeleteUserSubscriptionResponse struct {
	UserSubscriptionID string `json:"userSubscriptionId"`
}

// subscription godoc
// @Summary  Get Subscription
// @ID       DeleteUserSubscriptions
// @Tags     UserSubscription
// @Produce  json
// @Param 	 userId		 	path 				string									false 	"user id"
// @Param 	 userSubscriptionId		 	path 				string									false 	"userSubscriptionId"
// @Success  200  {object}  DeleteUserSubscriptionResponse
// @Failure  400  {object}  echo.HTTPError
// @Failure  500  {object}  echo.HTTPError
// @Router   /users/{userId}/subscriptions/{:userSubscriptionId} [delete]
func DeleteUserSubscription(us *interactor.UserSubscription) MustLogin {
	return func(c echo.Context) error {
		var reqQuery DeleteUserSubscriptionRequest
		if err := c.Bind(&reqQuery); err != nil {
			slog.Warn("failed to bind.", "error", err)
			return echo.ErrBadRequest
		}

		ctx := scontext.ConvertContext(c)

		if err := reqQuery.Validate(ctx); err != nil {
			slog.Warn("failed to validate.", "error", err, "userID", reqQuery.UserID, "sUserID", scontext.GetUserID(ctx))
			return echo.ErrBadRequest
		}

		if err := us.DeleteUserSubscription(ctx, reqQuery.UserSubscriptionID); err != nil {
			switch {
			case errors.Is(err, serror.ErrResourceNotFound):
				return echo.ErrBadRequest

			default:
				return echo.ErrInternalServerError
			}
		}

		c.JSON(http.StatusOK, CreateUserSubscriptionResponse{
			UserSubscrionID: reqQuery.UserSubscriptionID,
		})
		return nil
	}
}
