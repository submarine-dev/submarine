CREATE TABLE IF NOT EXISTS "users" (
  "id" varchar PRIMARY KEY,
  "name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "icon" varchar NOT NULL,
  "refresh_token" varchar NOT NULL,
  "created_at" timestamp,
  "updated_at" timestamp
);
