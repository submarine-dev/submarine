package config

import "time"

type ENV string

const (
	EnvLocal       ENV = "local"
	EnvDevelopment ENV = "development"
	EnvStaging     ENV = "staging"
	EnvProduction  ENV = "production"
)

// config はアプリケーションの設定を表す構造体です。基本的には環境変数から読み込みます。
type config struct {
	Application struct {
		Name        string `env:"APP_NAME" envDefault:"submarine-backend"`
		Env         ENV    `env:"APP_ENV" envDefault:"local"`
		AllowOrigin string `env:"APP_ALLOW_ORIGIN" envDefault:"http://localhost:3000"`
	}

	Server struct {
		Host            string        `env:"HOST" envDefault:"localhost"`
		Port            int           `env:"PORT" envDefault:"8080"`
		ShutdownTimeout time.Duration `env:"SHUTDOWN_TIMEOUT" envDefault:"10s"`
	}

	DB struct {
		Host     string `env:"DB_HOST" envDefault:"postgres"`
		Port     int    `env:"DB_PORT" envDefault:"5432"`
		User     string `env:"DB_USER" envDefault:"postgres"`
		Password string `env:"DB_PASSWORD" envDefault:"postgres"`
		DBName   string `env:"DB_NAME" envDefault:"submarine"`
		SSLMode  string `env:"DB_SSLMODE" envDefault:"disable"`
	}

	NewRelic struct {
		Suffix     string `env:"NEW_RELIC_APP_NAME_SUFFIX" envDefault:"dev"`
		LicenseKey string `env:"NEW_RELIC_LICENSE_KEY" envDefault:""`
	}

	GoogleService struct {
		RedirectURI  string `env:"GOOGLE_AUTH_REDIRECT_URI" envDefault:"http://localhost:3000"`
		ClientID     string `env:"GOOGLE_CLIENT_ID" envDefault:""`
		ClientSecret string `env:"GOOGLE_CLIENT_SERCRET" envDefault:""`
	}
}

// Config は読み込まれた設定を保持します。
var Config *config
