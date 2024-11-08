package dai

import (
	"context"

	"github.com/submarine/submarine/backend/internal/domain/entity"
)

type TemplSubscription interface {
	GetTemplSubscriptions(ctx context.Context, limit, offset int) ([]entity.TemplSubscription, error)
	GetTemplSubscription(ctx context.Context, subscriptionID string) (entity.TemplSubscription, bool, error)
	CreateTemplSubscription(ctx context.Context,subscription []entity.TemplSubscription) error
}
