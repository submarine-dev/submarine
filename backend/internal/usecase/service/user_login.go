package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/submarine/submarine/backend/internal/domain/entity"
)

type LoginResult struct {
	UserID      string
	UserName    string
	ProfileIcon string
}

func (l *UserService) Login(ctx context.Context, code string) (*LoginResult, error) {
	token, err := l.repo.FetchToken(ctx, code)
	if err != nil {
		return nil, err
	}

	// Get Profile
	userInfo, err := l.repo.GetUserByToken(ctx, token)
	if err != nil {
		return nil, err
	}

	user, ok, err := l.repo.GetUserByEmail(ctx, userInfo.Email)
	if err != nil {
		return nil, err
	}

	// handle new user
	if !ok {
		userID, err := uuid.NewV7()
		if err != nil {
			return nil, err
		}
		user = &entity.User{
			ID:           userID.String(),
			Name:         userInfo.Name,
			Email:        userInfo.Email,
			Icon:         userInfo.Picture,
			RefreshToken: token.RefreshToken,
		}

		if err := l.repo.CreateUser(ctx, user); err != nil {
			return nil, err
		}
	} else { // handle exist user
		if err := l.repo.UpdaterUser(ctx, user.ID, &entity.User{
			ID:           user.ID,
			Name:         user.Name,
			Email:        user.Email,
			Icon:         user.Icon,
			RefreshToken: token.RefreshToken,
		}); err != nil {
			return nil, err
		}
	}
	user, err = l.repo.GetUserByID(ctx, user.ID)
	if err != nil {
		return nil, err
	}

	return &LoginResult{
		UserID:      user.ID,
		UserName:    user.Name,
		ProfileIcon: user.Icon,
	}, nil
}
