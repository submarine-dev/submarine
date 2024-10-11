CREATE TABLE IF NOT EXISTS "user_subscriptions" (
  "id" varchar PRIMARY KEY,
  "user_id" varchar NOT NULL,
  "templ_id" varchar,
  "plan_id" varchar,
  "name" varchar NOT NULL,
  "icon" varchar NOT NULL,
  "unsubscribe_link" varchar NOT NULL,
  "plan_name" varchar NOT NULL,
  "plan_price" int NOT NULL,
  "plan_payment_type" payment_type NOT NULL,
  "paid_at" timestamp,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

ALTER TABLE "user_subscriptions" ADD FOREIGN KEY ("templ_id") REFERENCES "templ_subscriptions" ("id");
ALTER TABLE "user_subscriptions" ADD FOREIGN KEY ("plan_id") REFERENCES "templ_plans" ("id");
