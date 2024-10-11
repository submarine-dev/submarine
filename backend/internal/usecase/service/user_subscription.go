package service

import (
	"context"
	"time"

	"github.com/submarine/submarine/backend/internal/domain/entity"
	"github.com/submarine/submarine/backend/internal/usecase/dai"
)

type UserSubscription struct {
	repo dai.DataAccessInterfaces
}

func NewUserSubscription(
	repo dai.DataAccessInterfaces,
) *UserSubscription {
	return &UserSubscription{
		repo: repo,
	}
}

func (ts *UserSubscription) GetUserSubscriptions(ctx context.Context, userID string) ([]entity.UserSubscription, error) {
	return ts.repo.GetUserSubscriptions(ctx, userID)
}

func (ts *UserSubscription) CreateUserSubscription(ctx context.Context, userSubscription entity.UserSubscription) error {
	userSubscription.CreatedAt = time.Now()
	return ts.repo.CreateUserSubscription(ctx, userSubscription)
}
