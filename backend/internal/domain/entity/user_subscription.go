package entity

import (
	"time"

	"github.com/uptrace/bun"
)

type UserSubscription struct {
	bun.BaseModel `bun:"table:user_subscriptions,alias:us"`

	ID              string      `bun:"id,pk" json:"id"`
	UserID          string      `bun:"user_id" json:"userID"`
	TemplID         string      `bun:"templ_id" json:"templID"`
	Name            string      `bun:"name" json:"name"`
	Icon            string      `bun:"icon" json:"icon"`
	UnsubscribeLink string      `bun:"unsubscribe_link" json:"unsubscribeLink"`
	PlanName        string      `bun:"plan_name" json:"planName"`
	PlanPrice       int         `bun:"plan_price" json:"price"`
	PlanPaymentType PaymentType `bun:"plan_payment_type" json:"paymentType"`
	PaidAt          *time.Time  `bun:"paid_at" json:"paidAt"`
	CreatedAt       time.Time   `bun:"created_at" json:"-"`
	UpdatedAt       time.Time   `bun:"updated_at" json:"-"`
	DeletedAt       *time.Time  `bun:"deleted_at" json:"-"`
}
