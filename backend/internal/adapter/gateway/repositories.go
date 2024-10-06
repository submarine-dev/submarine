package gateway

import (
	"github.com/murasame29/go-httpserver-template/internal/adapter/gateway/google"
	"github.com/murasame29/go-httpserver-template/internal/adapter/gateway/repository"
	"github.com/murasame29/go-httpserver-template/internal/usecase/dai"
	"github.com/uptrace/bun"
)

type Repositories struct {
	*repository.UserRepo
	*repository.SessionRepo
	*google.GoogleService
}

func NewRepositories(db bun.IDB) *Repositories {
	return &Repositories{
		UserRepo:      repository.NewUserRepo(db),
		SessionRepo:   repository.NewSessionRepo(db),
		GoogleService: google.NewGoogleService(),
	}
}

var _ dai.DataAccessInterfaces = (*Repositories)(nil)
