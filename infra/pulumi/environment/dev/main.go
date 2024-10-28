package main

import (
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi/config"
	"github.com/submarine-dev/submarine/infra/module/gc"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		// Import the provider's configuration settings.
		providerConfig := config.New(ctx, "gcp")
		location := providerConfig.Require("region")
		project := providerConfig.Require("project")
		gci := gc.NewGoogleCloudInfra()

		if err := gci.CreateCloudSQL(ctx, gc.CraeteCloudSQLParam{
			Name:               "submarine-db",
			Project:            project,
			Location:           location,
			DeletionProtection: true,
			RootPassword:       "apwthuiogswapuhgjdskgpser1",
		}); err != nil {
			return err
		}

		return nil
	})
}
