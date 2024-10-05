package scontext

import "context"

type ContextKey string

const (
	UserAgent ContextKey = "submarine_context_user_agent"
)

func (c ContextKey) String() string {
	return string(c)
}

func GetUserAgent(ctx context.Context) string {
	userAgent, ok := ctx.Value(UserAgent.String()).(string)
	if !ok {
		return ""
	}

	return userAgent
}
