package middleware

import (
	"log/slog"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/submarine/submarine/backend/cmd/config"
)

func SetupCORS() echo.MiddlewareFunc {
	switch config.Config.Application.Env {
	// Productionのみ限定的なスコープでのCORS
	case config.EnvProduction:
		InitWhiteList()
		return AllowRestrictiveOrigins()
	case config.EnvDevelopment:
		return AllowAllOrigins()
	default:
		return AllowAllOrigins()
	}
}

func AllowAllOrigins() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			requestAddr := c.Request().Header.Get("Origin")
			// no origin ignore
			if requestAddr == "" {
				slog.Error("origin is empty")
				return echo.ErrUnauthorized
			}
			// ignore /healthz
			if c.Path() == "/healthz" {
				return next(c)
			}
			slog.Info("origin", "origin", requestAddr)
			c.Response().Header().Set("Access-Control-Allow-Origin", requestAddr)
			c.Response().Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
			c.Response().Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			c.Response().Header().Set("Access-Control-Max-Age", "3600")
			c.Response().Header().Set("Access-Control-Allow-Credentials", "true")

			return next(c)
		}
	}
}

var originWhiteList map[string]struct{}

func InitWhiteList() {
	origins := strings.Split(config.Config.Application.AllowOrigin, ",")
	originWhiteList = make(map[string]struct{})
	for _, origin := range origins {
		originWhiteList[origin] = struct{}{}
	}
}

func AllowRestrictiveOrigins() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			requestAddr := c.Request().Header.Get("Origin")

			_, ok := originWhiteList[requestAddr]

			if !ok || requestAddr == "" || c.Path() == "/healthz" {
				slog.Error("origin is not allowed")
				return echo.ErrUnauthorized
			}

			c.Response().Header().Set("Access-Control-Allow-Origin", requestAddr)
			c.Response().Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
			c.Response().Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			c.Response().Header().Set("Access-Control-Max-Age", "3600")
			c.Response().Header().Set("Access-Control-Allow-Credentials", "true")

			return next(c)
		}
	}
}
