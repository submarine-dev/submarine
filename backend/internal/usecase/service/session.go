package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/murasame29/go-httpserver-template/internal/domain/entity"
	"github.com/murasame29/go-httpserver-template/internal/framework/scontext"
	"github.com/murasame29/go-httpserver-template/internal/usecase/dai"
)

type SessionService struct {
	repo dai.DataAccessInterfaces
}

func NewSession(
	repo dai.DataAccessInterfaces,
) *SessionService {
	return &SessionService{
		repo: repo,
	}
}

func (s *SessionService) CreateSession(ctx context.Context, userID string) (string, error) {
	sessionID, err := uuid.NewV7()
	if err != nil {
		return "", err
	}

	session := &entity.Session{
		ID:        sessionID.String(),
		UserID:    userID,
		UserAgent: scontext.GetUserAgent(ctx),
	}

	if err := session.ValidateSession(); err != nil {
		return "", err
	}

	if err := s.repo.CreateSession(ctx, session); err != nil {
		return "", err
	}

	return session.ID, nil
}
