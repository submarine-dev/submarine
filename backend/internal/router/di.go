package router

import (
	"github.com/submarine/submarine/backend/internal/framework/cookie"
	"github.com/submarine/submarine/backend/internal/usecase/interactor"
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
