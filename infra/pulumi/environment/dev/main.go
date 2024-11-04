package main

import (
	"bytes"
	"fmt"
	"os"

	"github.com/pulumi/pulumi-gcp/sdk/v8/go/gcp/compute"
	"github.com/pulumi/pulumi-gcp/sdk/v8/go/gcp/projects"
	synced "github.com/pulumi/pulumi-synced-folder/sdk/go/synced-folder"
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
			Image: apiImage.Tags.ApplyT(func(v []string)string{
				return v[0]
			}).(pulumi.StringOutput),
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

		bucket ,err := gci.CreateStorage(ctx,"front-storage",project,location)
		if err != nil {
			return err
		}

		if _ , err := synced.NewGoogleCloudFolder(ctx, "synced-front",&synced.GoogleCloudFolderArgs{
			BucketName: bucket.Name,
			Path: pulumi.String("./dist"),
		});err != nil {
			return err
		}

		backendBucket, err := compute.NewBackendBucket(ctx, "backend-bucket", &compute.BackendBucketArgs{
			BucketName: bucket.Name,
			EnableCdn:  pulumi.Bool(true),
		})
		if err != nil {
			return err
		}

		// Provision a global IP address for the CDN.
		ip, err := compute.NewGlobalAddress(ctx, "ip", nil)
		if err != nil {
			return err
		}

		// Create a URLMap to route requests to the storage bucket.
		urlMap, err := compute.NewURLMap(ctx, "url-map", &compute.URLMapArgs{
			DefaultService: backendBucket.SelfLink,
		})
		if err != nil {
			return err
		}

		// Create an HTTP proxy to route requests to the URLMap.
		httpProxy, err := compute.NewTargetHttpProxy(ctx, "http-proxy", &compute.TargetHttpProxyArgs{
			UrlMap: urlMap.SelfLink,
		})
		if err != nil {
			return err
		}

		// Create a GlobalForwardingRule rule to route requests to the HTTP proxy.
		_, err = compute.NewGlobalForwardingRule(ctx, "http-forwarding-rule", &compute.GlobalForwardingRuleArgs{
			IpAddress:  ip.Address,
			IpProtocol: pulumi.String("TCP"),
			PortRange:  pulumi.String("80"),
			Target:     httpProxy.SelfLink,
		})
		if err != nil {
			return err
		}
		return nil
	})
}
