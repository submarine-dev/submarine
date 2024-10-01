package config

import "time"

type ENV string

const (
	EnvDevelopment ENV = "development"
	EnvStaging     ENV = "staging"
	EnvProduction  ENV = "production"
)

// config はアプリケーションの設定を表す構造体です。基本的には環境変数から読み込みます。
type config struct {
	Application struct {
		Name string `env:"APP_NAME" envDefault:"submarine-backend"`
		Env  ENV    `env:"APP_ENV" envDefault:"development"`
	}

	Server struct {
		Host            string        `env:"HOST" envDefault:"localhost"`
		Port            int           `env:"PORT" envDefault:"8080"`
		ShutdownTimeout time.Duration `env:"SHUTDOWN_TIMEOUT" envDefault:"10s"`
	}

	NewRelic struct {
		LicenseKey string `env:"NEW_RELIC_LICENSE_KEY" envDefault:""`
	}
}

// Config は読み込まれた設定を保持します。
var Config *config
