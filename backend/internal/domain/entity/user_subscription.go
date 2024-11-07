package entity

import (
	"time"

	"github.com/uptrace/bun"
)

type UserSubscription struct {
	bun.BaseModel `bun:"table:user_subscriptions,alias:us"`

	ID              string      `bun:"id,pk" json:"id"`
	UserID          string      `bun:"user_id" json:"userId"`
	TemplID         string      `bun:"templ_id,nullzero" json:"templId"`
	PlanID          string      `bun:"plan_id,nullzero" json:"planId"`
	Name            string      `bun:"name" json:"name"`
	Icon            string      `bun:"icon" json:"icon"`
	UnsubscribeLink string      `bun:"unsubscribe_link" json:"unsubscribeLink"`
	PlanName        string      `bun:"plan_name" json:"planName"`
	PlanPrice       int         `bun:"plan_price" json:"price"`
	PlanPaymentType PaymentType `bun:"plan_payment_type" json:"paymentType"`
	PaidAt          *time.Time  `bun:"paid_at" json:"paidAt"`
	CreatedAt       time.Time   `bun:",nullzero,notnull,default:current_timestamp"`
	UpdatedAt       time.Time   `bun:",nullzero,notnull,default:current_timestamp"`
	DeletedAt       *time.Time  `bun:"deleted_at,soft_delete" json:"-"`
}

func (p UserSubscription) IsUseTemplate() bool {
	return p.TemplID != "" || p.PlanID != ""
}
