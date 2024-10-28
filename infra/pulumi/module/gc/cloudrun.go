package gc

import (
	"strconv"

	"github.com/pulumi/pulumi-gcp/sdk/v8/go/gcp/cloudrunv2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

type CloudRunOption struct {
	cpuLimit        *int
	memLimit        *string
	cpuIdle         *bool
	startupCpuBoost *bool
}

func (o *CloudRunOption) Resources() cloudrunv2.ServiceTemplateContainerResourcesArgs {
	limit := make(map[string]string)
	if o.cpuLimit != nil {
		limit["cpu"] = strconv.Itoa(*o.cpuLimit)
	}

	if o.memLimit != nil {
		limit["memory"] = *o.memLimit
	}

	return cloudrunv2.ServiceTemplateContainerResourcesArgs{
		Limits:          pulumi.ToStringMap(limit),
		CpuIdle:         pulumi.BoolPtr(*o.cpuIdle),
		StartupCpuBoost: pulumi.BoolPtr(*o.startupCpuBoost),
	}
}

type CloudRunOptionFunc func(*CloudRunOption)

func WithCPULimit(cpu int) CloudRunOptionFunc {
	return func(cro *CloudRunOption) {
		cro.cpuLimit = &cpu
	}
}

func WithMemoryLimit(memory string) CloudRunOptionFunc {
	return func(cro *CloudRunOption) {
		cro.memLimit = &memory
	}
}

func WithCPUIdle(idle bool) CloudRunOptionFunc {
	return func(cro *CloudRunOption) {
		cro.cpuIdle = &idle
	}
}

func WithStartupCpuBoost(startupCPUBoost bool) CloudRunOptionFunc {
	return func(cro *CloudRunOption) {
		cro.startupCpuBoost = &startupCPUBoost
	}
}

type CreateCloudRunParam struct {
	Name                 string
	Location             string
	Image                string
	ContainerPort        int
	ContainerConcurrency int
	SecretRef            []SecretRef
	Env                  map[string]string
}

type SecretRef struct {
	Name    string
	Version string
	Secret  string
}

func (p CreateCloudRunParam) Envs() cloudrunv2.ServiceTemplateContainerEnvArray {
	var envs cloudrunv2.ServiceTemplateContainerEnvArray

	// env val
	for name, value := range p.Env {
		envs = append(envs, cloudrunv2.ServiceTemplateContainerEnvArgs{
			Name:  pulumi.String(name),
			Value: pulumi.String(value),
		})
	}

	// secret ref
	for _, v := range p.SecretRef {
		envs = append(envs, cloudrunv2.ServiceTemplateContainerEnvArgs{
			Name: pulumi.String(v.Name),
			ValueSource: cloudrunv2.ServiceTemplateContainerEnvValueSourceArgs{
				SecretKeyRef: cloudrunv2.ServiceTemplateContainerEnvValueSourceSecretKeyRefArgs{
					Version: pulumi.String(v.Version),
					Secret:  pulumi.String(v.Secret),
				},
			},
		})
	}
	return envs
}

func (m *GoogleCloud) CreateCloudRun(ctx *pulumi.Context, param CreateCloudRunParam, opts ...CloudRunOptionFunc) error {
	option := new(CloudRunOption)
	for _, opt := range opts {
		opt(option)
	}

	_, err := cloudrunv2.NewService(ctx, param.Name,
		&cloudrunv2.ServiceArgs{
			Location: pulumi.String(param.Location),
			Template: cloudrunv2.ServiceTemplateArgs{
				Containers: cloudrunv2.ServiceTemplateContainerArray{
					cloudrunv2.ServiceTemplateContainerArgs{
						Name:      pulumi.String(param.Name),
						Envs:      param.Envs(),
						Resources: option.Resources(),
						Image:     pulumi.String(param.Image),
						Ports: cloudrunv2.ServiceTemplateContainerPortsArgs{
							ContainerPort: pulumi.IntPtr(param.ContainerPort),
						},
					},
				},
			},
		})

	return err
}
