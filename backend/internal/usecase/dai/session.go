package dai

import (
	"context"

	"github.com/murasame29/go-httpserver-template/internal/domain/entity"
)

type Session interface {
	CreateSession(ctx context.Context, session *entity.Session) error
}
