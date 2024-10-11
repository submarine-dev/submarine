package dai

import (
	"context"

	"github.com/submarine/submarine/backend/internal/domain/entity"
)

type Session interface {
	CreateSession(ctx context.Context, session *entity.Session) error
	GetSessionByID(ctx context.Context, sessionID, userAgent string) (*entity.Session, bool, error)
}
