package interactor

import (
	"context"

	"github.com/murasame29/go-httpserver-template/internal/usecase/service"
)

type Login struct {
	_session *service.SessionService
	_user    *service.UserService
}

func NewLogin(
	_session *service.SessionService,
	_user *service.UserService,
) *Login {
	return &Login{
		_session: _session,
		_user:    _user,
	}
}

type GoogleLoginParam struct {
	Code string
}

type GoogleLoginResult struct {
	UserID    string
	SessionID string
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
	}, nil
}
