package scontext

import (
	"context"

	"github.com/labstack/echo/v4"
)

type ContextKey string

const (
	UserAgent ContextKey = "submarine_context_user_agent"
	UserID    ContextKey = "submarine_context_user_id"
)

var keys []ContextKey = []ContextKey{
	UserAgent,
	UserID,
}

func (c ContextKey) String() string {
	return string(c)
}

func GetUserAgent(ctx context.Context) string {
	userAgent, ok := ctx.Value(UserAgent).(string)
	if !ok {
		return ""
	}

	return userAgent
}

func GetUserID(ctx context.Context) string {
	userID, ok := ctx.Value(UserID).(string)
	if !ok {
		return ""
	}

	return userID
}

func ConvertContext(c echo.Context) context.Context {
	ctx := context.Background()
	for _, key := range keys {
		v := c.Get(key.String())
		ctx = context.WithValue(ctx, key, v)
	}

	return ctx
}
