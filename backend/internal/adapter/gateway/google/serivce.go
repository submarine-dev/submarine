package google

import (
	"context"

	"github.com/murasame29/go-httpserver-template/cmd/config"
	"github.com/murasame29/go-httpserver-template/internal/usecase/dai"
	"golang.org/x/oauth2"
	v2 "google.golang.org/api/oauth2/v2"
	"google.golang.org/api/option"
)

type GoogleService struct {
	oac oauth2.Config
}

func NewGoogleService() *GoogleService {
	return &GoogleService{
		oac: oauth2.Config{
			ClientID:     config.Config.GoogleService.ClientID,
			ClientSecret: config.Config.GoogleService.ClientSecret,
			Scopes: []string{
				v2.UserinfoEmailScope,
				v2.UserinfoProfileScope,
			},
			Endpoint: oauth2.Endpoint{
				AuthURL:  "https://accounts.google.com/o/oauth2/auth",
				TokenURL: "https://accounts.google.com/o/oauth2/token",
			},
			RedirectURL: config.Config.GoogleService.RedirectURI,
		},
	}
}

var _ dai.GoogleService = (*GoogleService)(nil)

func (o *GoogleService) FetchToken(ctx context.Context, code string) (*oauth2.Token, error) {
	token, err := o.oac.Exchange(ctx, code)
	if err != nil {
		return nil, err
	}

	return token, nil
}

func (o *GoogleService) GetUserByToken(ctx context.Context, token *oauth2.Token) (*v2.Userinfo, error) {
	client := o.oac.Client(ctx, token)

	service, err := v2.NewService(ctx, option.WithHTTPClient(client))
	if err != nil {
		return nil, err
	}

	googleUser, err := service.Userinfo.V2.Me.Get().Context(ctx).Do()
	if err != nil {
		return nil, err
	}

	return googleUser, nil
}
