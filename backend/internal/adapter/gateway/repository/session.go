package repository

import (
	"context"

	"github.com/murasame29/go-httpserver-template/internal/domain/entity"
	"github.com/murasame29/go-httpserver-template/internal/usecase/dai"
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
