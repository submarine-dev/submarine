package interactor

import (
	"context"

	"github.com/submarine/submarine/backend/internal/domain/entity"
	"github.com/submarine/submarine/backend/internal/framework/scontext"
	"github.com/submarine/submarine/backend/internal/usecase/service"
)

type TemplSubscription struct {
	_ts *service.TemplSubscription
	_us *service.UserSubscription
}

func NewTemplSubscription(
	_ts *service.TemplSubscription,
	_us *service.UserSubscription,
) *TemplSubscription {
	return &TemplSubscription{
		_ts: _ts,
		_us: _us,
	}
}

type GetTemplSubscriptionParam struct {
	Limit, Offset int
}

type GetTemplSubscriptionResult struct {
	entity.TemplSubscription
	IsSubscribed bool
}

func (s *TemplSubscription) GetTemplSubscriptions(ctx context.Context, param GetTemplSubscriptionParam) ([]GetTemplSubscriptionResult, error) {
	templSubscriptions, err := s._ts.GetTemplSubscriptions(ctx, param.Limit, param.Offset)
	if err != nil {
		return nil, err
	}

	userSubscriptions, err := s._us.GetUserSubscriptions(ctx, scontext.GetUserID(ctx))
	if err != nil {
		return nil, err
	}

	templSubscriptionMap := s.checkEnabled(userSubscriptions, templSubscriptions...)

	var result []GetTemplSubscriptionResult
	for _, ts := range templSubscriptionMap {
		result = append(result, ts)
	}

	return result, nil
}

func (s *TemplSubscription) GetTemplSubscription(ctx context.Context, subscriptionID string) (GetTemplSubscriptionResult, error) {
	templSubscription, err := s._ts.GetTemplSubscription(ctx, subscriptionID)
	if err != nil {
		return GetTemplSubscriptionResult{}, err
	}

	userSubscriptions, err := s._us.GetUserSubscriptions(ctx, scontext.GetUserID(ctx))
	if err != nil {
		return GetTemplSubscriptionResult{}, err
	}

	templSubscriptionMap := s.checkEnabled(userSubscriptions, templSubscription)

	return templSubscriptionMap[subscriptionID], nil
}

func (s *TemplSubscription) checkEnabled(userSubscriptions []entity.UserSubscription, templSubscriptions ...entity.TemplSubscription) map[string]GetTemplSubscriptionResult {
	templSubscriptionMap := make(map[string]GetTemplSubscriptionResult, len(templSubscriptions))
	for _, ts := range templSubscriptions {
		templSubscriptionMap[ts.ID] = GetTemplSubscriptionResult{
			TemplSubscription: ts,
			IsSubscribed:      false,
		}
	}

	for _, us := range userSubscriptions {
		ts, ok := templSubscriptionMap[us.TemplID]
		if ok {
			ts.IsSubscribed = true
			templSubscriptionMap[us.TemplID] = ts
		}
	}
	return templSubscriptionMap
}
