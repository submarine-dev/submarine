package middleware

import (
	"log/slog"

	"github.com/labstack/echo/v4"
	"github.com/submarine/submarine/backend/internal/framework/scontext"
)

func GetUserAgent() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			userAgent := c.Request().Header.Get("User-Agent")
			slog.Info("ua ok", "request_id", c.Get(scontext.RequestID.String()))

			c.Set(scontext.UserAgent.String(), userAgent)

			return next(c)
		}
	}
}
