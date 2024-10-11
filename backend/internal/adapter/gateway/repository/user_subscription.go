package repository

import (
	"context"

	"github.com/submarine/submarine/backend/internal/domain/entity"
	"github.com/submarine/submarine/backend/internal/usecase/dai"
	"github.com/uptrace/bun"
)

type UserSubscriptionRepo struct {
	db bun.IDB
}

func NewUserSubscriptionRepo(db bun.IDB) *UserSubscriptionRepo {
	return &UserSubscriptionRepo{db: db}
}

var _ dai.UserSubscription = (*UserSubscriptionRepo)(nil)

func (r *UserSubscriptionRepo) GetUserSubscriptions(ctx context.Context, userID string) ([]entity.UserSubscription, error) {
	var userSubscriptions []entity.UserSubscription
	query := r.db.NewSelect().Model(&userSubscriptions).
		Where("user_id = ?", userID)

	if err := query.Scan(ctx, &userSubscriptions); err != nil {
		return nil, err
	}

	return userSubscriptions, nil
}

func (r *UserSubscriptionRepo) CreateUserSubscription(ctx context.Context, userSubscription entity.UserSubscription) error {
	if _, err := r.db.NewInsert().Model(&userSubscription).Exec(ctx); err != nil {
		return err
	}
	return nil
}
