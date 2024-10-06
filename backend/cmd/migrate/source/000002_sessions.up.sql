CREATE TABLE IF NOT EXISTS "sessions" (
  "id" varchar PRIMARY KEY,
  "user_id" varchar NOT NULL,
  "user_agent" varchar NOT NULL,
  "created_at" timestamp,
  "updated_at" timestamp
);

ALTER TABLE "sessions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");