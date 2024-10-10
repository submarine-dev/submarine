package interactor

import (
	"context"

	"github.com/submarine/submarine/backend/internal/domain/entity"
	"github.com/submarine/submarine/backend/internal/framework/scontext"
	"github.com/submarine/submarine/backend/internal/framework/stime"
	"github.com/submarine/submarine/backend/internal/usecase/service"
)

type UserSubscription struct {
	_us *service.UserSubscription
}

func NewUserSubscription(
	_us *service.UserSubscription,
) *UserSubscription {
	return &UserSubscription{
		_us: _us,
	}
}

type GetUserSubscriptionsResult struct {
	UserSubscriptions   []entity.UserSubscription
	TotalAmountPerDay   int
	TotalAmountPerMonth int
	TotalAmountPerYear  int
}

func (us *UserSubscription) GetUserSubscriptions(ctx context.Context, userID string) (GetUserSubscriptionsResult, error) {
	userSubscriptions, err := us._us.GetUserSubscriptions(ctx, scontext.GetUserID(ctx))
	if err != nil {
		return GetUserSubscriptionsResult{}, err
	}

	return GetUserSubscriptionsResult{
		UserSubscriptions:   userSubscriptions,
		TotalAmountPerDay:   us.calculateTotalAmountPerDay(userSubscriptions),
		TotalAmountPerMonth: us.calculateTotalAmountPerMonth(userSubscriptions),
		TotalAmountPerYear:  us.calculateTotalAmountPerYear(userSubscriptions),
	}, nil
}

func (us *UserSubscription) calculateTotalAmountPerDay(userSubscriptions []entity.UserSubscription) int {
	var totalAmount int
	for _, us := range userSubscriptions {
		switch us.PlanPaymentType {
		case entity.PaymentTypeDaily:
			totalAmount += us.PlanPrice
		case entity.PaymentTypeMonthly:
			totalAmount += (us.PlanPrice) / stime.DaysInMonth(stime.Month())
		case entity.PaymentTypeYearly:
			totalAmount += us.PlanPrice / 365
		}
	}

	return totalAmount
}

func (us *UserSubscription) calculateTotalAmountPerMonth(userSubscriptions []entity.UserSubscription) int {
	var totalAmount int
	for _, us := range userSubscriptions {
		switch us.PlanPaymentType {
		case entity.PaymentTypeDaily:
			totalAmount += us.PlanPrice * stime.DaysInMonth(stime.Month())
		case entity.PaymentTypeMonthly:
			totalAmount += (us.PlanPrice)
		case entity.PaymentTypeYearly:
			totalAmount += us.PlanPrice / 12
		}
	}

	return totalAmount
}

func (us *UserSubscription) calculateTotalAmountPerYear(userSubscriptions []entity.UserSubscription) int {
	var totalAmount int
	for _, us := range userSubscriptions {
		switch us.PlanPaymentType {
		case entity.PaymentTypeDaily:
			totalAmount += us.PlanPrice * 365
		case entity.PaymentTypeMonthly:
			totalAmount += (us.PlanPrice) * 12
		case entity.PaymentTypeYearly:
			totalAmount += us.PlanPrice
		}
	}

	return totalAmount
}
