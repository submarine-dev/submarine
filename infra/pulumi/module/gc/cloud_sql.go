package gc

import (
	"github.com/pulumi/pulumi-gcp/sdk/v8/go/gcp/sql"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

type CraeteCloudSQLParam struct {
	Name               string
	Project            string
	Location           string
	DeletionProtection bool
	RootPassword       string
}

func (m *GoogleCloud) CreateCloudSQL(ctx *pulumi.Context, param CraeteCloudSQLParam) error {
	_, err := sql.NewDatabaseInstance(ctx, param.Name, &sql.DatabaseInstanceArgs{
		Project:            pulumi.String(param.Project),
		DatabaseVersion:    pulumi.String("POSTGRES_15"),
		DeletionProtection: pulumi.Bool(param.DeletionProtection),
		Region:             pulumi.String(param.Location),
		RootPassword:       pulumi.String(param.RootPassword),
		Settings: sql.DatabaseInstanceSettingsArgs{
			Tier: pulumi.String("db-f1-micro"),
		},
	})

	return err
}
