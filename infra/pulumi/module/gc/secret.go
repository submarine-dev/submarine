package gc

import (
	"fmt"
	"strings"

	"github.com/pulumi/pulumi-gcp/sdk/v8/go/gcp/secretmanager"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"golang.org/x/sync/errgroup"
)

type StoreSecretsParam struct {
	Project string
	Members pulumi.StringArrayInput
	Secrets map[string]pulumi.StringInput
}

func (m *GoogleCloud) StoreSecrets(ctx *pulumi.Context, param StoreSecretsParam, opts ...OptionFunc) ([]string, error) {
	errGroup := new(errgroup.Group)
	option := new(Option)

	for _, opt := range opts {
		opt(option)
	}

	var secretOutput []string

	for name, secret := range param.Secrets {
		errGroup.Go(func() error {

			args := &secretmanager.SecretArgs{
				Project: pulumi.String(param.Project),
				Replication: secretmanager.SecretReplicationArgs{
					Auto: secretmanager.SecretReplicationAutoArgs{},
				},
				SecretId: pulumi.String(name),
			}

			if option.Label != nil {
				args.Labels = pulumi.StringMap(option.Label)
			}
			if option.Annotation != nil {
				args.Annotations = pulumi.StringMap(option.Annotation)
			}

			s, err := secretmanager.NewSecret(ctx, name, args)
			if err != nil {
				return fmt.Errorf("new secret error. %+v", err)
			}

			if _, err := secretmanager.NewSecretVersion(ctx, name, &secretmanager.SecretVersionArgs{
				Secret:     s.ID(),
				SecretData: secret,
				Enabled:    pulumi.BoolPtr(true),
			}); err != nil {
				return err
			}

			if _, err := secretmanager.NewSecretIamBinding(ctx, fmt.Sprintf("%s-binding", strings.ToLower(name)), &secretmanager.SecretIamBindingArgs{
				Project:  args.Project,
				SecretId: s.ID(),
				Role:     pulumi.String("roles/secretmanager.secretAccessor"),
				Members:  param.Members,
			}); err != nil {
				return err
			}

			secretOutput = append(secretOutput, name)
			return nil
		})
	}

	if err := errGroup.Wait(); err != nil {
		return nil, err
	}
	return secretOutput, nil
}
