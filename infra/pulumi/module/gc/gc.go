package gc

import "github.com/pulumi/pulumi/sdk/v3/go/pulumi"

type GoogleCloud struct{}

func NewGoogleCloudInfra() *GoogleCloud {
	return &GoogleCloud{}
}

type Option struct {
	Label      map[string]pulumi.StringInput
	Annotation map[string]pulumi.StringInput
	DependOn   []pulumi.Resource
}

type OptionFunc func(*Option)

func WithLabel(label map[string]pulumi.StringInput) OptionFunc {
	return func(o *Option) {
		o.Label = label
	}
}

func WithAnnotation(annotation map[string]pulumi.StringInput) OptionFunc {
	return func(o *Option) {
		o.Annotation = annotation
	}
}

func DependOn(depend ...pulumi.Resource) OptionFunc {
	return func(o *Option) {
		o.DependOn = depend
	}
}
