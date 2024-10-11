package service

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/submarine/submarine/backend/internal/domain/entity"
	"github.com/submarine/submarine/backend/internal/framework/scontext"
	"github.com/submarine/submarine/backend/internal/framework/serror"
	"github.com/submarine/submarine/backend/internal/usecase/dai"
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

func (s *SessionService) GetSession(ctx context.Context, sessionID string) (*entity.Session, error) {
	session := &entity.Session{
		UserAgent: scontext.GetUserAgent(ctx),
	}

	if err := session.ValidateSession(); err != nil {
		return nil, err
	}

	session, found, err := s.repo.GetSessionByID(ctx, sessionID, session.UserAgent)
	if err != nil {
		return nil, err
	}

	if !found {
		return nil, serror.ErrResourceNotFound
	}
	session.CreatedAt = time.Now()
	return session, nil
}
