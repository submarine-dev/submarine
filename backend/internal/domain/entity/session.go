package entity

import (
	"context"
	"fmt"
	"time"

	"github.com/submarine/submarine/backend/internal/framework/svalidate"
	"github.com/uptrace/bun"
)

type Session struct {
	bun.BaseModel `bun:"table:sessions,alias:s"`

	ID        string `bun:"id"`
	UserID    string `bun:"user_id"`
	UserAgent string `bun:"user_agent"`

	CreatedAt time.Time `bun:"created_at"`
	UpdatedAt time.Time `bun:"updated_at"`
}

var _ bun.BeforeAppendModelHook = (*Session)(nil)

func (m *Session) BeforeAppendModel(ctx context.Context, query bun.Query) error {
	switch query.(type) {
	case *bun.InsertQuery:
		m.CreatedAt = time.Now()
	case *bun.UpdateQuery:
		m.UpdatedAt = time.Now()
	}
	return nil
}

func (s *Session) ValidateSession() error {
	if !svalidate.IsASCII(s.UserAgent) {
		return fmt.Errorf("invalid user agent. %s", s.UserAgent)
	}

	if len(s.UserAgent) > 255 {
		s.UserAgent = s.UserAgent[:255]
	}

	return nil
}
