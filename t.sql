INSERT INTO \"user_subscriptions\" (\"id\", \"user_id\", \"templ_id\", \"plan_id\", \"name\", \"icon\", \"unsubscribe_link\", \"plan_name\", \"plan_price\", \"plan_payment_type\", \"paid_at\", \"created_at\", \"updated_at\", \"deleted_at\") VALUES ('7bb25145-8dea-42ff-81da-d692d9cea74a', '01927a25-a6b5-703a-8184-74d0aba597e4', '', DEFAULT, 'test', '', 'test link', 'good plan', 1000, 'monthly', DEFAULT, '0001-01-01 00:00:00+00:00', '0001-01-01 00:00:00+00:00', DEFAULT) RETURNING \"plan_id\", \"paid_at\", \"deleted_at\"