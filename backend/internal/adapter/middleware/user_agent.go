package middleware

import (
	"github.com/labstack/echo/v4"
	"github.com/submarine/submarine/backend/internal/framework/scontext"
)

func GetUserAgent() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			userAgent := c.Request().Header.Get("User-Agent")

			c.Set(scontext.UserAgent.String(), userAgent)

			return next(c)
		}
	}
}
