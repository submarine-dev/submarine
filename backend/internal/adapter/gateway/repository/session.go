package repository

import (
	"context"
	"database/sql"
	"errors"

	"github.com/submarine/submarine/backend/internal/domain/entity"
	"github.com/submarine/submarine/backend/internal/usecase/dai"
	"github.com/uptrace/bun"
)

type SessionRepo struct {
	db bun.IDB
}

func NewSessionRepo(db bun.IDB) *SessionRepo {
	return &SessionRepo{db: db}
}

var _ dai.Session = (*SessionRepo)(nil)

func (r *SessionRepo) CreateSession(ctx context.Context, session *entity.Session) error {
	if _, err := r.db.NewInsert().Model(session).Exec(ctx); err != nil {
		return err
	}

	return nil
}

func (r *SessionRepo) GetSessionByID(ctx context.Context, sessionID, userAgent string) (*entity.Session, bool, error) {
	var session entity.Session
	query := r.db.NewSelect().Model(&session).
		Where("id = ?", sessionID).
		Where("user_agent = ?", userAgent)

	if err := query.Scan(ctx, &session); err != nil {
		if !errors.Is(err, sql.ErrNoRows) {
			return nil, false, err
		}
		return nil, false, nil
	}

	return &session, true, nil
}
