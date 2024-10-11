package entity

import (
	"time"

	"github.com/uptrace/bun"
)

type TemplSubscription struct {
	bun.BaseModel `bun:"table:templ_subscriptions,alias:ts"`

	ID              string    `bun:"id,pk"`
	Name            string    `bun:"name"`
	Icon            string    `bun:"icon"`
	UnsubscribeLink string    `bun:"unsubscribe_link"`
	CreatedAt       time.Time `bun:"created_at"`
	UpdatedAt       time.Time `bun:"updated_at"`

	TemplPlan []*TemplPlan `bun:"rel:has-many,join:id=subscription_id" json:"plans"`
}

func (ts TemplSubscription) FindPlan(planID string) (*TemplPlan, bool) {
	for _, plan := range ts.TemplPlan {
		if plan.ID == planID {
			return plan, true
		}
	}
	return nil, false
}
