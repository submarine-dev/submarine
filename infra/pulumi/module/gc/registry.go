package gc

import (
	"github.com/pulumi/pulumi-gcp/sdk/v8/go/gcp/artifactregistry"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

type CreateDockerRegistryParam struct {
	Project  string
	Name     string
	Location string
}

func (m *GoogleCloud) CreateDockerRegistry(ctx *pulumi.Context, param CreateDockerRegistryParam) (*artifactregistry.Repository, error) {
	return artifactregistry.NewRepository(ctx, "repository", &artifactregistry.RepositoryArgs{
		Project:      pulumi.String(param.Project),
		Description:  pulumi.String("Repository for container image"),
		Format:       pulumi.String("DOCKER"),
		Location:     pulumi.String(param.Location),
		RepositoryId: pulumi.String(param.Name),
	})
}
