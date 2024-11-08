package gc

import (
	"github.com/pulumi/pulumi-gcp/sdk/v8/go/gcp/cloudrunv2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

type CreateServiceParam struct {
	Project          string
	Location         string
	Image            pulumi.StringInput
	ServiceAccount   pulumi.StringInput
	CloudSQLInstance pulumi.StringInput
	CPULimit         string
	MEMLimit         string

	Secrets []string
	Configs map[string]string
}

func (p CreateServiceParam) Envs() cloudrunv2.ServiceTemplateContainerEnvArray {
	var envs cloudrunv2.ServiceTemplateContainerEnvArray

	for _, secret := range p.Secrets {
		envs = append(envs, cloudrunv2.ServiceTemplateContainerEnvArgs{
			Name: pulumi.String(secret),
			ValueSource: cloudrunv2.ServiceTemplateContainerEnvValueSourceArgs{
				SecretKeyRef: cloudrunv2.ServiceTemplateContainerEnvValueSourceSecretKeyRefArgs{
					Secret:  pulumi.String(secret),
					Version: pulumi.String("latest"),
				},
			},
		})
	}

	for k, v := range p.Configs {
		envs = append(envs, cloudrunv2.ServiceTemplateContainerEnvArgs{
			Name:  pulumi.String(k),
			Value: pulumi.String(v),
		})
	}

	return envs
}

func (p CreateServiceParam) resources() cloudrunv2.ServiceTemplateContainerResourcesPtrInput {
	cpuLimit := p.CPULimit
	memLimit := p.MEMLimit

	if cpuLimit == "" {
		cpuLimit = "1"
	}

	if memLimit == "" {
		memLimit = "1Gi"
	}

	return cloudrunv2.ServiceTemplateContainerResourcesArgs{
		Limits: pulumi.ToStringMap(map[string]string{
			"cpu":    cpuLimit,
			"memory": memLimit,
		}),
	}
}
func (m *GoogleCloud) CreateService(ctx *pulumi.Context, name string, param CreateServiceParam) error {
	_, err := cloudrunv2.NewService(ctx, name, &cloudrunv2.ServiceArgs{
		Project:  pulumi.String(param.Project),
		Name:     pulumi.String(name),
		Location: pulumi.String(param.Location),
		Template: cloudrunv2.ServiceTemplateArgs{
			ServiceAccount: param.ServiceAccount,
			Containers: cloudrunv2.ServiceTemplateContainerArray{
				cloudrunv2.ServiceTemplateContainerArgs{
					Resources: param.resources(),
					Image:     param.Image,
					VolumeMounts: cloudrunv2.ServiceTemplateContainerVolumeMountArray{
						cloudrunv2.ServiceTemplateContainerVolumeMountArgs{
							Name:      pulumi.String("cloudsql"),
							MountPath: pulumi.String("/cloudsql"),
						},
					},
					Envs: param.Envs(),
				},
			},
			Volumes: cloudrunv2.ServiceTemplateVolumeArray{
				cloudrunv2.ServiceTemplateVolumeArgs{
					Name: pulumi.String("cloudsql"),
					CloudSqlInstance: cloudrunv2.ServiceTemplateVolumeCloudSqlInstanceArgs{
						Instances: pulumi.StringArray{param.CloudSQLInstance},
					},
				},
			},
		},
	})
	return err
}
