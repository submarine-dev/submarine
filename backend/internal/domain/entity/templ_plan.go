package entity

import "github.com/uptrace/bun"

type TemplPlan struct {
	bun.BaseModel `bun:"table:templ_plans,alias:tp"`

	SubscriptionID string      `bun:"subscription_id" json:"subscriptionId"`
	Name           string      `bun:"name" json:"name"`
	Price          int         `bun:"price" json:"price"`
	PaymentType    PaymentType `bun:"payment_type" json:"paymentType"`
}
