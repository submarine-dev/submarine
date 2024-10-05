package middleware

import (
	"github.com/labstack/echo/v4"
	"github.com/murasame29/go-httpserver-template/internal/utils/scontext"
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
