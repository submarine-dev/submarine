package gc

import (
	"fmt"

	"github.com/pulumi/pulumi-gcp/sdk/v8/go/gcp/storage"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func (m *GoogleCloud) CreateStorage(ctx *pulumi.Context, name, project, location string) error {
	_, err := storage.NewBucketIAMBinding(ctx, fmt.Sprintf("%s-iam-binding", name), &storage.BucketIAMBindingArgs{
		Bucket: pulumi.String(name),
		Role:   pulumi.String("roles/storage.objectViewer"),
		Members: pulumi.StringArray{
			pulumi.String("allUsers"),
		},
	})
	if err != nil {
		return err
	}

	// Create another storage bucket for the serverless app.
	if _, err := storage.NewBucket(ctx, name, &storage.BucketArgs{
		Location: pulumi.String(location),
		Project:  pulumi.String(project),
	}); err != nil {
		return err
	}
	return nil
}
