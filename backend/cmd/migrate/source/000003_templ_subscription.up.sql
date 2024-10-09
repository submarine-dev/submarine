CREATE TYPE IF NOT EXISTS "payment_type" AS ENUM (
  'daily',
  'monthly',
  'yearly'
);

CREATE TABLE IF NOT EXISTS "templ_subscriptions" (
  "id" varchar PRIMARY KEY,
  "name" varchar NOT NULL,
  "icon" varchar NOT NULL,
  "unsubscribe_link" varchar NOT NULL,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE IF NOT EXISTS "templ_plans" (
  "subscription_id" varchar NOT NULL,
  "name" varchar NOT NULL,
  "price" int NOT NULL,
  "payment_type" payment_type NOT NULL
);

ALTER TABLE "templ_plans" ADD FOREIGN KEY ("subscription_id") REFERENCES "templ_subscriptions" ("id");
