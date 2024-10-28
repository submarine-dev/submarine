package gc

import (
	"github.com/pulumi/pulumi-gcp/sdk/v8/go/gcp/artifactregistry"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func (m *GoogleCloud) CreateDockerRegistry(ctx *pulumi.Context, name string, location string) error {
	_, err := artifactregistry.NewRepository(ctx, "repository", &artifactregistry.RepositoryArgs{
		Description:  pulumi.String("Repository for container image"),
		Format:       pulumi.String("DOCKER"),
		Location:     pulumi.String(location),
		RepositoryId: pulumi.String(name),
	})
	if err != nil {
		return err
	}
	return nil
}
