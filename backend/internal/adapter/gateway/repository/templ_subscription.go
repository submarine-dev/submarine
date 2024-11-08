package repository

import (
	"context"
	"database/sql"
	"errors"

	"github.com/submarine/submarine/backend/internal/domain/entity"
	"github.com/submarine/submarine/backend/internal/usecase/dai"
	"github.com/uptrace/bun"
)

type TemplSubscriptionRepo struct {
	db bun.IDB
}

func NewTemplSubscriptionRepo(db bun.IDB) *TemplSubscriptionRepo {
	return &TemplSubscriptionRepo{db: db}
}

var _ dai.TemplSubscription = (*TemplSubscriptionRepo)(nil)

func (r *TemplSubscriptionRepo) GetTemplSubscriptions(ctx context.Context, limit, offset int) ([]entity.TemplSubscription, error) {
	var templSubscriptions []entity.TemplSubscription

	query := r.db.NewSelect().Model(&templSubscriptions).
		Column("*").
		Relation("TemplPlan").
		Limit(limit).Offset(offset)

	if err := query.Scan(ctx); err != nil {
		return nil, err
	}

	return templSubscriptions, nil
}

func (r *TemplSubscriptionRepo) GetTemplSubscription(ctx context.Context, subscriptionID string) (entity.TemplSubscription, bool, error) {
	var templSubscriptions entity.TemplSubscription

	query := r.db.NewSelect().Model(&templSubscriptions).
		Column("*").
		Relation("TemplPlan").
		Where("ts.id = ?", subscriptionID)

	if err := query.Scan(ctx); err != nil {
		if !errors.Is(err, sql.ErrNoRows) {
			return entity.TemplSubscription{}, false, err
		}
		return entity.TemplSubscription{}, false, nil
	}

	return templSubscriptions, true, nil
}

func (r *TemplSubscriptionRepo) CreateTemplSubscription(ctx context.Context, subscription []entity.TemplSubscription) error {
	if _, err := r.db.NewInsert().Model(&subscription).Exec(ctx); err != nil {
		return err
	}
	var plans []*entity.TemplPlan
	for _, subs := range subscription {
		plans = append(plans, subs.TemplPlan...)
	}

	if _, err := r.db.NewInsert().Model(&plans).Exec(ctx); err != nil {
		return err
	}
	return nil
}
