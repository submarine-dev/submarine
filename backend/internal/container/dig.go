package container

import (
	"github.com/murasame29/go-httpserver-template/internal/adapter/gateway"
	"github.com/murasame29/go-httpserver-template/internal/driver"
	"github.com/murasame29/go-httpserver-template/internal/framework/cookie"
	"github.com/murasame29/go-httpserver-template/internal/router"
	"github.com/murasame29/go-httpserver-template/internal/usecase/dai"
	"github.com/murasame29/go-httpserver-template/internal/usecase/interactor"
	"github.com/murasame29/go-httpserver-template/internal/usecase/service"
	"github.com/uptrace/bun"
	"go.uber.org/dig"
)

var container *dig.Container

type provideArg struct {
	constructor any
	opts        []dig.ProvideOption
}

// NewContainer は、digを用いて依存注入を行う
func NewContainer() error {
	container = dig.New()

	args := []provideArg{
		// other
		{constructor: cookie.DefaultCookieOptions, opts: []dig.ProvideOption{}},
		{constructor: cookie.NewCookieSetter, opts: []dig.ProvideOption{}},
		// driver
		{constructor: driver.NewRelicApp, opts: []dig.ProvideOption{}},
		{constructor: driver.NewDB, opts: []dig.ProvideOption{}},
		{constructor: driver.NewBun, opts: []dig.ProvideOption{dig.As(new(bun.IDB))}},
		// gateway
		{constructor: gateway.NewRepositories, opts: []dig.ProvideOption{dig.As(new(dai.DataAccessInterfaces))}},
		// service
		{constructor: service.NewSession, opts: []dig.ProvideOption{}},
		{constructor: service.NewUserService, opts: []dig.ProvideOption{}},
		// interactor
		{constructor: interactor.NewLogin, opts: []dig.ProvideOption{}},
		// handler
		{constructor: router.NewDI, opts: []dig.ProvideOption{}},
		{constructor: router.NewEcho, opts: []dig.ProvideOption{}},
	}

	for _, arg := range args {
		if err := container.Provide(arg.constructor, arg.opts...); err != nil {
			return err
		}
	}

	return nil
}

// Invoke は、 *dig.ContainerのInvokeをwrapしてる関数
func Invoke[T any](opts ...dig.InvokeOption) (T, error) {
	var r T
	if err := container.Invoke(func(t T) error {
		r = t
		return nil
	}, opts...); err != nil {
		return r, err
	}
	return r, nil
}
