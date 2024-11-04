package interactor

import (
	"context"
)

type GoogleLoginParam struct {
	Code string
}

type GoogleLoginResult struct {
	UserID    string
	SessionID string
	Icon string
}

func (l *Login) Google(ctx context.Context, param GoogleLoginParam) (*GoogleLoginResult, error) {
	user, err := l._user.Login(ctx, param.Code)
	if err != nil {
		return nil, err
	}
	// update session
	sessionID, err := l._session.CreateSession(ctx, user.UserID)
	if err != nil {
		return nil, err
	}
	return &GoogleLoginResult{
		UserID:    user.UserID,
		SessionID: sessionID,
		Icon: user.ProfileIcon,
	}, nil
}
