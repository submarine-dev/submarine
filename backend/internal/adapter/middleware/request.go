package middleware

import (
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/submarine/submarine/backend/internal/framework/scontext"
)

func RequestID() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Set(scontext.RequestID.String(), uuid.NewString())
			return next(c)
		}
	}
}
