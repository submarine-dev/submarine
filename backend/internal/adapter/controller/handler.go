package controller

import (
	"fmt"
	"log/slog"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/submarine/submarine/backend/internal/framework/cookie"
	"github.com/submarine/submarine/backend/internal/framework/scontext"
	"github.com/submarine/submarine/backend/internal/framework/serror"
	"github.com/submarine/submarine/backend/internal/usecase/interactor"
)

type MustLogin func(c echo.Context) error

func (h MustLogin) MustLogin(login *interactor.Login) echo.HandlerFunc {
	return func(c echo.Context) error {
		sessionID, err := c.Cookie(string(cookie.SessionID))
		if err != nil {
			if err == http.ErrNoCookie {
				slog.Info("session cookie not found")
				return echo.ErrUnauthorized
			}
			slog.Error(fmt.Sprintf("failed to get session cookie: %v", err))
			return echo.ErrInternalServerError
		}

		if sessionID.Value == "" {
			slog.Info("session cookie value is empty")
			return echo.ErrUnauthorized
		}

		ctx := scontext.ConvertContext(c)

		userID, err := login.CheckSession(ctx, sessionID.Value)

		if err != nil {
			slog.Info(fmt.Sprintf("failed to get user by session id: %v", err))
			switch err {
			case serror.ErrResourceNotFound:
				slog.Info("session not found")
				return echo.ErrUnauthorized
			default:
				return echo.ErrInternalServerError
			}
		}

		c.Set(scontext.UserID.String(), userID)

		return h(c)
	}
}
