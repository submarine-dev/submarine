package entity

type PaymentType string

const (
	PaymentTypeDaily   = PaymentType("daily")
	PaymentTypeMonthly = PaymentType("monthly")
	PaymentTypeYearly  = PaymentType("yearly")
)
