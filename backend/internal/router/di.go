package router

import (
	"github.com/submarine/submarine/backend/internal/framework/cookie"
	"github.com/submarine/submarine/backend/internal/usecase/interactor"
)

type di struct {
	login  *interactor.Login
	ts     *interactor.TemplSubscription
	us     *interactor.UserSubscription
	cookie *cookie.CookieSetter
}

func NewDI(
	login *interactor.Login,
	ts *interactor.TemplSubscription,
	us *interactor.UserSubscription,
	cookie *cookie.CookieSetter,
) *di {
	return &di{
		cookie: cookie,
		ts:     ts,
		us:     us,
		login:  login,
	}
}
