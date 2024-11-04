package gc

import (
	"github.com/pulumi/pulumi-docker-build/sdk/go/dockerbuild"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

type BuildSubmarineAPIParam struct {
	Location     string
	Project      string
	RepositoryID string
}

func (m *GoogleCloud) BuildAPI(ctx *pulumi.Context, param BuildSubmarineAPIParam) (*dockerbuild.Image, error) {
	return dockerbuild.NewImage(ctx, "image", &dockerbuild.ImageArgs{
		Tags: pulumi.StringArray{pulumi.Sprintf("%s-docker.pkg.dev/%s/%s/%s", param.Location, param.Project, param.RepositoryID, "api")},
		Context: &dockerbuild.BuildContextArgs{
			Location: pulumi.String("../../../../backend"),
		},
		Dockerfile: dockerbuild.DockerfileArgs{
			Location: pulumi.String("../../../../backend/.docker/app/Dockerfile"),
		},
		// Cloud Run currently requires x86_64 images
		// https://cloud.google.com/run/docs/container-contract#languages
		Platforms: dockerbuild.PlatformArray{"linux/amd64"},
		Push:      pulumi.Bool(true),
	})
}


func (m *GoogleCloud) BuildMigrate(ctx *pulumi.Context, param BuildSubmarineAPIParam) (*dockerbuild.Image, error) {
	return dockerbuild.NewImage(ctx, "image", &dockerbuild.ImageArgs{
		Tags: pulumi.StringArray{pulumi.Sprintf("%s-docker.pkg.dev/%s/%s/%s", param.Location, param.Project, param.RepositoryID, "api")},
		Context: &dockerbuild.BuildContextArgs{
			Location: pulumi.String("../../../../backend"),
		},
		Dockerfile: dockerbuild.DockerfileArgs{
			Location: pulumi.String("../../../../backend/.docker/app/migrate.Dockerfile"),
		},
		Platforms: dockerbuild.PlatformArray{"linux/amd64"},
		Push:      pulumi.Bool(true),
	})
}