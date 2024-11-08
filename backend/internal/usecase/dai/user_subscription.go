package dai

import (
	"context"

	"github.com/submarine/submarine/backend/internal/domain/entity"
)

type UserSubscription interface {
	GetUserSubscriptions(ctx context.Context, userID string) ([]entity.UserSubscription, error)
	GetUserSubscription(ctx context.Context, userID, subscriptionID string) (*entity.UserSubscription, bool, error)
	CreateUserSubscription(ctx context.Context, userSubscription entity.UserSubscription) error
	UpdateUserSubscription(ctx context.Context, subscription *entity.UserSubscription) error
	DeleteUserSubscription(ctx context.Context, userSubscriptionID string) error
}
