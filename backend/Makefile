BINARY_NAME=app
ENV_FILE=

.PHONY: setup

setup: 
	cp .env.template .env

.PHONY: new-migrate migrate-up migrate-down

name=
new-migrate:
	migrate create -ext sql -dir cmd/migrate/source -seq $(name)


migrate-up: # todo remove
	migrate --path cmd/migrate/source --database 'postgresql://postgres:postgres@localhost:5432/submarine?sslmode=disable' -verbose up

migrate-down: # todo remove
	migrate --path cmd/migrate/source --database 'postgresql://postgres:postgres@localhost:5432/submarine?sslmode=disable' -verbose down


swag:
	swag init --dir cmd/app/ --parseDependencyLevel 10 