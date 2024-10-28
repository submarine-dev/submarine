package gc

import (
	"fmt"

	"github.com/pulumi/pulumi-gcp/sdk/v8/go/gcp/secretmanager"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"golang.org/x/sync/errgroup"
)

func (m *GoogleCloud) StoreSecrets(ctx *pulumi.Context, projectID string, secrets map[string]string, opts ...OptionFunc) error {
	errGroup := new(errgroup.Group)
	option := new(Option)

	for _, opt := range opts {
		opt(option)
	}

	for name, secret := range secrets {
		errGroup.Go(func() error {

			args := &secretmanager.SecretArgs{
				Project: pulumi.String(projectID),
				Replication: secretmanager.SecretReplicationArgs{
					Auto: secretmanager.SecretReplicationAutoArgs{},
				},
				SecretId: pulumi.String(name),
			}

			if option.Label != nil {
				args.Labels = pulumi.ToStringMap(option.Label)
			}
			if option.Annotation != nil {
				args.Annotations = pulumi.ToStringMap(option.Annotation)
			}

			s, err := secretmanager.NewSecret(ctx, name, args)
			if err != nil {
				return fmt.Errorf("new secret error. %+v", err)
			}

			_, err = secretmanager.NewSecretVersion(ctx, name, &secretmanager.SecretVersionArgs{
				Secret:     s.ID(),
				SecretData: pulumi.String(secret),
				Enabled:    pulumi.BoolPtr(true),
			})
			if err != nil {
				return err
			}

			return nil
		})
	}

	if err := errGroup.Wait(); err != nil {
		return err
	}
	return nil
}
