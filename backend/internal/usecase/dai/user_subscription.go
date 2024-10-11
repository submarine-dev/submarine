package dai

import (
	"context"

	"github.com/submarine/submarine/backend/internal/domain/entity"
)

type UserSubscription interface {
	GetUserSubscriptions(ctx context.Context, userID string) ([]entity.UserSubscription, error)
	CreateUserSubscription(ctx context.Context, userSubscription entity.UserSubscription) error
}
