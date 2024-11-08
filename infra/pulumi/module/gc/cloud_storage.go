package gc

import (
	"fmt"

	"github.com/pulumi/pulumi-gcp/sdk/v8/go/gcp/compute"
	"github.com/pulumi/pulumi-gcp/sdk/v8/go/gcp/storage"
	synced "github.com/pulumi/pulumi-synced-folder/sdk/go/synced-folder"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func (m *GoogleCloud) CreateFrontBacket(ctx *pulumi.Context, name, project, location, objectPath string) (*storage.Bucket, error) {
	bucket, err := storage.NewBucket(ctx, name, &storage.BucketArgs{
		Location: pulumi.String(location),
		Project:  pulumi.String(project),
		Website: storage.BucketWebsiteArgs{
			MainPageSuffix: pulumi.String("index.html"),
			NotFoundPage:   pulumi.String("index.html"),
		},
	})
	if err != nil {
		return nil, err
	}

	imgbucket, err := storage.NewBucket(ctx, fmt.Sprintf("%s-store", name), &storage.BucketArgs{
		Location: pulumi.String(location),
		Project:  pulumi.String(project),
	})
	if err != nil {
		return nil, err
	}

	_, err = storage.NewBucketIAMBinding(ctx, "site-bucket-iam-binding", &storage.BucketIAMBindingArgs{
		Bucket: bucket.Name,
		Role:   pulumi.String("roles/storage.objectViewer"),
		Members: pulumi.StringArray{
			pulumi.String("allUsers"),
		},
	})
	if err != nil {
		return nil, err
	}

	_, err = storage.NewBucketIAMBinding(ctx, "site-bucket-store-iam-binding", &storage.BucketIAMBindingArgs{
		Bucket: imgbucket.Name,
		Role:   pulumi.String("roles/storage.objectViewer"),
		Members: pulumi.StringArray{
			pulumi.String("allUsers"),
		},
	})
	if err != nil {
		return nil, err
	}

	if _, err := synced.NewGoogleCloudFolder(ctx, "synced-front", &synced.GoogleCloudFolderArgs{
		BucketName: bucket.Name,
		Path:       pulumi.String(objectPath),
	}); err != nil {
		return nil, err
	}

	backendBucket, err := compute.NewBackendBucket(ctx, "backend-bucket", &compute.BackendBucketArgs{
		BucketName: bucket.Name,
		EnableCdn:  pulumi.Bool(true),
	})
	if err != nil {
		return nil, err
	}

	// Provision a global IP address for the CDN.
	ip, err := compute.NewGlobalAddress(ctx, "ip", nil)
	if err != nil {
		return nil, err
	}

	// Create a URLMap to route requests to the storage bucket.
	urlMap, err := compute.NewURLMap(ctx, "url-map", &compute.URLMapArgs{
		DefaultService: backendBucket.SelfLink,
	})
	if err != nil {
		return nil, err
	}

	// Create an HTTP proxy to route requests to the URLMap.
	httpProxy, err := compute.NewTargetHttpProxy(ctx, "http-proxy", &compute.TargetHttpProxyArgs{
		UrlMap: urlMap.SelfLink,
	})
	if err != nil {
		return nil, err
	}

	// Create a GlobalForwardingRule rule to route requests to the HTTP proxy.
	_, err = compute.NewGlobalForwardingRule(ctx, "http-forwarding-rule", &compute.GlobalForwardingRuleArgs{
		IpAddress:  ip.Address,
		IpProtocol: pulumi.String("TCP"),
		PortRange:  pulumi.String("80"),
		Target:     httpProxy.SelfLink,
	})
	if err != nil {
		return nil, err
	}

	return imgbucket, nil
}
