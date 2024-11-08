package gc

import (
	"github.com/pulumi/pulumi-gcp/sdk/v8/go/gcp/compute"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func (m *GoogleCloud) CreateComputeNetwork(ctx *pulumi.Context, name string) (*compute.Network, error) {
	return compute.NewNetwork(ctx, name, &compute.NetworkArgs{
		AutoCreateSubnetworks: pulumi.Bool(false),
		Description:           pulumi.String("A virtual network for your GKE cluster(s)"),
	})
}

func (m *GoogleCloud) CreateSubnetwork(ctx *pulumi.Context, name string, cidr string, network pulumi.StringInput) (*compute.Subnetwork, error) {
	return compute.NewSubnetwork(ctx, name, &compute.SubnetworkArgs{
		IpCidrRange:           pulumi.String(cidr),
		Network:               network,
		PrivateIpGoogleAccess: pulumi.Bool(true),
	})
}
