package main

import (
	"bytes"
	"fmt"
	"os"

	"github.com/pulumi/pulumi-gcp/sdk/v8/go/gcp/projects"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi/config"
	"github.com/submarine-dev/submarine/infra/module/gc"
)

func mustGet(env string) (string,error){
	v := os.Getenv(env)
	if v == "" {
		return "", fmt.Errorf("plz set env: %s",env)
	}
	return v,nil
}

func main() {
	file, err := os.ReadFile(".env")
	if err != nil {
		panic(err)
	}

	env := make(map[string]pulumi.StringInput)

	for _, line := range bytes.Split(file, []byte("\n")) {
		if bytes.Contains(line, []byte("#")) && len(bytes.TrimSpace(line)) == 0 {
			continue
		}

		v := bytes.Split(line, []byte("="))
		env[string(v[0])] = pulumi.String(v[1])
	}

	pulumi.Run(func(ctx *pulumi.Context) error {
		dbPassword,err := mustGet("DB_PASSWORD")
		if err != nil {
			return err
		}
		providerConfig := config.New(ctx, "gcp")
		location := providerConfig.Require("region")
		project := providerConfig.Require("project")
		backendName := "submarine-api"

		gci := gc.NewGoogleCloudInfra()
		// Create an Artifact Registry repository
		if _, err := gci.CreateDockerRegistry(ctx, gc.CreateDockerRegistryParam{
			Project:  project,
			Name:     backendName,
			Location: location,
		}); err != nil {
			return err
		}

		apiImage, err := gci.BuildAPI(ctx, gc.BuildSubmarineAPIParam{
			Project:      project,
			Location:     location,
			RepositoryID: backendName,
		})
		if err != nil {
			return err
		}

		cloudsql, err := gci.CreateCloudSQL(ctx, gc.CraeteCloudSQLParam{
			Name:         "submarine-db",
			Project:      project,
			Location:     location,
			RootPassword: dbPassword,
		})
		if err != nil {
			return err
		}

		env["DB_HOST"] = cloudsql.ConnectionName
		env["DB_PASSWORD"] = pulumi.String(dbPassword)

		cloudrunSA ,err := gci.CreateServiceAccount(ctx,"api-sa","submarine api service account",pulumi.String("submarineapi"))
		if err != nil {
			return err
		}


		secrets, err := gci.StoreSecrets(ctx,gc.StoreSecretsParam{
			Project: project,
			Members: pulumi.StringArray{cloudrunSA.Member},
			Secrets: env,
		})
		if err != nil {
			return err
		}
		
		if _ ,err := projects.NewIAMMember(ctx,"cloudrun-conn",&projects.IAMMemberArgs{
			Member: cloudrunSA.Member,
			Role: pulumi.String("roles/cloudsql.client"),
			Project: pulumi.String(project),
		}); err != nil {
			return err
		}

		if err := gci.CreateService(ctx,"backend-api",gc.CreateServiceParam{
			Location: location,
			Project: project,
			Image: pulumi.Sprintf("%s@%s",apiImage.Tags.ApplyT(func(v []string)string{
				return v[0]
			}).(pulumi.StringOutput),apiImage.Digest),
			ServiceAccount: cloudrunSA.AccountId,
			CloudSQLInstance: cloudsql.ConnectionName,
			CPULimit: "1",
			MEMLimit: "1Gi",
			Secrets: secrets,
			Configs: map[string]string{
				"APP_ENV":"development",
				"HOST":"0.0.0.0",
				"DB_PORT":"5432",
				"DB_USER":"postgres",
				"DB_NAME":"submarine",
				"DB_SSLMODE":"disable",
			},
		});err != nil {
			return err
		}

		if _, err := gci.CreateFrontBacket(ctx,"front-storage",project,location,"./dist");err != nil {
			return err 
		}

		return nil
	})
}
