package dai

import (
	"context"

	"github.com/murasame29/go-httpserver-template/internal/domain/entity"
)

type User interface {
	GetUserByID(ctx context.Context, id string) (*entity.User, error)
	GetUserByEmail(ctx context.Context, email string) (*entity.User, bool, error)
	CreateUser(ctx context.Context, user *entity.User) error
	UpdaterUser(ctx context.Context, id string, user *entity.User) error
}
