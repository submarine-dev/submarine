package dai

import (
	"context"

	"golang.org/x/oauth2"
	v2 "google.golang.org/api/oauth2/v2"
)

type GoogleService interface {
	FetchToken(ctx context.Context, code string) (*oauth2.Token, error)
	GetUserByToken(ctx context.Context, token *oauth2.Token) (*v2.Userinfo, error)
}
