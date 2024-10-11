package interactor

import (
	"context"

	"github.com/submarine/submarine/backend/internal/usecase/service"
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

func (l *Login) CheckSession(ctx context.Context, sessionID string) (string, error) {
	session, err := l._session.GetSession(ctx, sessionID)
	if err != nil {
		return "", err
	}
	return session.UserID, nil
}
