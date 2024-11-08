package gc

import (
	"github.com/pulumi/pulumi-gcp/sdk/v8/go/gcp/serviceaccount"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func (m *GoogleCloud) CreateServiceAccount(ctx *pulumi.Context, name, description string, accountID pulumi.StringInput) (*serviceaccount.Account, error) {
	return serviceaccount.NewAccount(ctx, name, &serviceaccount.AccountArgs{
		AccountId:   accountID,
		Description: pulumi.String(description),
	})
}
