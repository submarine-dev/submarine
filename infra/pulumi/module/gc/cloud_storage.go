package gc

import (
	"github.com/pulumi/pulumi-gcp/sdk/v8/go/gcp/storage"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func (m *GoogleCloud) CreateStorage(ctx *pulumi.Context, name, project, location string) (*storage.Bucket,error) {
	backet, err := storage.NewBucket(ctx, name, &storage.BucketArgs{
		Location: pulumi.String(location),
		Project:  pulumi.String(project),
	})
	if err != nil {
		return nil, err
	}

	_, err = storage.NewBucketIAMBinding(ctx, "site-bucket-iam-binding", &storage.BucketIAMBindingArgs{
		Bucket: backet.Name,
		Role:   pulumi.String("roles/storage.objectViewer"),
		Members: pulumi.StringArray{
			pulumi.String("allUsers"),
		},
	})
	if err != nil {
		return nil, err
	}

	return backet, nil
}
