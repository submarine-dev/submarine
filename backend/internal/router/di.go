package router

import (
	"github.com/murasame29/go-httpserver-template/internal/framework/cookie"
	"github.com/murasame29/go-httpserver-template/internal/usecase/interactor"
)

type di struct {
	login  *interactor.Login
	cookie *cookie.CookieSetter
}

func NewDI(
	login *interactor.Login,
	cookie *cookie.CookieSetter,
) *di {
	return &di{
		cookie: cookie,
		login:  login,
	}
}
