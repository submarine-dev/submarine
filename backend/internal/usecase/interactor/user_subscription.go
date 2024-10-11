package interactor

import (
	"context"

	"github.com/google/uuid"
	"github.com/submarine/submarine/backend/internal/domain/entity"
	"github.com/submarine/submarine/backend/internal/framework/scontext"
	"github.com/submarine/submarine/backend/internal/framework/serror"
	"github.com/submarine/submarine/backend/internal/framework/stime"
	"github.com/submarine/submarine/backend/internal/usecase/service"
)

type UserSubscription struct {
	_us *service.UserSubscription
	_ts *service.TemplSubscription
}

func NewUserSubscription(
	_us *service.UserSubscription,
	_ts *service.TemplSubscription,
) *UserSubscription {
	return &UserSubscription{
		_us: _us,
		_ts: _ts,
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

type CreateUserSubscriptionParam struct {
	UserID string

	TemplID     string
	TemplPlanID string

	Name            string
	UnsubscribeLink string
	PlanName        string
	Price           int
	PaymentType     entity.PaymentType
}

func (p CreateUserSubscriptionParam) isUseTemplate() bool {
	return p.TemplID != "" || p.TemplPlanID != ""
}

func (us *UserSubscription) CreateUserSubscription(ctx context.Context, param CreateUserSubscriptionParam) (string, error) {
	var userSubscription entity.UserSubscription

	if param.isUseTemplate() { // use template handle
		templSubscription, err := us._ts.GetTemplSubscription(ctx, param.TemplID)
		if err != nil {
			return "", err
		}

		plan, found := templSubscription.FindPlan(param.TemplPlanID)
		if !found {
			return "", serror.ErrResourceNotFound
		}
		userSubscription = entity.UserSubscription{
			TemplID:         param.TemplID,
			PlanID:          param.TemplPlanID,
			Name:            templSubscription.Name,
			Icon:            templSubscription.Icon,
			UnsubscribeLink: templSubscription.UnsubscribeLink,
			PlanName:        userSubscription.PlanName,
			PlanPrice:       plan.Price,
			PlanPaymentType: plan.PaymentType,
		}

	} else {
		userSubscription = entity.UserSubscription{
			Name:            param.Name,
			UnsubscribeLink: param.UnsubscribeLink,
			PlanName:        param.PlanName,
			PlanPrice:       param.Price,
			PlanPaymentType: param.PaymentType,
		}
	}

	userSubscription.ID = uuid.NewString()
	userSubscription.UserID = param.UserID

	if err := us._us.CreateUserSubscription(ctx, userSubscription); err != nil {
		return "", err
	}

	return userSubscription.ID, nil
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
