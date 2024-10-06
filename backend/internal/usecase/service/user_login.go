package service

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"github.com/murasame29/go-httpserver-template/internal/domain/entity"
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
		user.ID = userID.String()

		if err := l.repo.CreateUser(ctx, entity.User{
			ID:    user.ID,
			Name:  user.Name,
			Email: user.Email,
			Icon:  user.Icon,

			RefreshToken: token.RefreshToken,
		}); err != nil {
			return nil, err
		}
	} else { // handle exist user
		if err := l.repo.UpdaterUser(ctx, user.ID, entity.User{
			Name:         user.Name,
			Email:        user.Email,
			Icon:         user.Icon,
			RefreshToken: token.RefreshToken,
		}); err != nil {
			return nil, err
		}
	}

	user, exist, err := l.repo.GetUserByID(ctx, user.ID)
	if err != nil {
		return nil, err
	}

	if !exist {
		return nil, fmt.Errorf("user not found")
	}

	if user.RefreshToken == "" {
		return nil, fmt.Errorf("token is disabled. please re login")
	}

	return &LoginResult{
		UserID:      user.ID,
		UserName:    user.Name,
		ProfileIcon: user.Icon,
	}, nil
}
