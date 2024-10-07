package driver

import (
	"fmt"
	"log/slog"

	"github.com/newrelic/go-agent/v3/integrations/nrsecurityagent"
	"github.com/newrelic/go-agent/v3/newrelic"
	"github.com/submarine/submarine/backend/cmd/config"
)

func NewRelicApp() *newrelic.Application {
	app, err := newrelic.NewApplication(
		newrelic.ConfigAppName(fmt.Sprintf("submarine_backend_%s", config.Config.NewRelic.Suffix)),
		newrelic.ConfigLicense(config.Config.NewRelic.LicenseKey),
		newrelic.ConfigAppLogEnabled(true),
		newrelic.ConfigAppLogForwardingEnabled(true),
		newrelic.ConfigAppLogMetricsEnabled(true),
		newrelic.ConfigModuleDependencyMetricsEnabled(true),
		func(c *newrelic.Config) {
			c.Labels = map[string]string{
				"environment": string(config.Config.Application.Env),
			}
		},
	)

	if err != nil {
		slog.Error("failed to create new relic app instance", "error", err)
		panic(err)
	}

	// Production以外でIASTを有効化する
	if config.Config.Application.Env != config.EnvProduction {
		slog.Info(fmt.Sprintf("environment %s IAST enabled", config.Config.Application.Env))
		if err := nrsecurityagent.InitSecurityAgent(
			app,
			nrsecurityagent.ConfigSecurityMode("IAST"),
			nrsecurityagent.ConfigSecurityValidatorServiceEndPointUrl("wss://csec.nr-data.net"),
			nrsecurityagent.ConfigSecurityEnable(true),
		); err != nil {
			slog.Error("failed to create new relic app instance", "error", err)
			panic(err)
		}
	}

	return app
}
