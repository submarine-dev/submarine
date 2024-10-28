package gc

type GoogleCloud struct{}

func NewGoogleCloudInfra() *GoogleCloud {
	return &GoogleCloud{}
}

type Option struct {
	Label      map[string]string
	Annotation map[string]string
}

type OptionFunc func(*Option)

func WithLabel(label map[string]string) OptionFunc {
	return func(o *Option) {
		o.Label = label
	}
}

func WithAnnotation(annotation map[string]string) OptionFunc {
	return func(o *Option) {
		o.Annotation = annotation
	}
}
