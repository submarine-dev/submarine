package service

import (
	"context"

	"github.com/submarine/submarine/backend/internal/domain/entity"
	"github.com/submarine/submarine/backend/internal/framework/serror"
	"github.com/submarine/submarine/backend/internal/usecase/dai"
)

type TemplSubscription struct {
	repo dai.DataAccessInterfaces
}

func NewTemplSubscription(
	repo dai.DataAccessInterfaces,
) *TemplSubscription {
	return &TemplSubscription{
		repo: repo,
	}
}

func (ts *TemplSubscription) GetTemplSubscriptions(ctx context.Context, limit, offset int) ([]entity.TemplSubscription, error) {
	if limit <= 0 {
		limit = 10
	}

	if offset < 0 {
		offset = 0
	}

	return ts.repo.GetTemplSubscriptions(ctx, limit, offset)
}

func (ts *TemplSubscription) GetTemplSubscription(ctx context.Context, subscriptionID string) (entity.TemplSubscription, error) {
	templSubscription, found, err := ts.repo.GetTemplSubscription(ctx, subscriptionID)
	if err != nil {
		return entity.TemplSubscription{}, err
	}

	if !found {
		return entity.TemplSubscription{}, serror.ErrResourceNotFound
	}

	return templSubscription, nil
}
