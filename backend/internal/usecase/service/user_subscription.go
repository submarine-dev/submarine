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

func (us *UserSubscription) GetUserSubscriptions(ctx context.Context, userID string) ([]entity.UserSubscription, error) {
	return us.repo.GetUserSubscriptions(ctx, userID)
}

func (us *UserSubscription) CreateUserSubscription(ctx context.Context, userSubscription entity.UserSubscription) error {
	userSubscription.CreatedAt = time.Now()
	return us.repo.CreateUserSubscription(ctx, userSubscription)
}

func (us *UserSubscription) DeleteUserSubscription(ctx context.Context, userSubscriptionID string) error {
	return us.repo.DeleteUserSubscription(ctx, userSubscriptionID)
}
