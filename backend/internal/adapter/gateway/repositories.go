package gateway

import (
	"github.com/submarine/submarine/backend/internal/adapter/gateway/google"
	"github.com/submarine/submarine/backend/internal/adapter/gateway/repository"
	"github.com/submarine/submarine/backend/internal/usecase/dai"
	"github.com/uptrace/bun"
)

type Repositories struct {
	*repository.UserRepo
	*repository.SessionRepo
	*repository.TemplSubscriptionRepo
	*repository.UserSubscriptionRepo

	*google.GoogleService
}

func NewRepositories(db bun.IDB) *Repositories {
	return &Repositories{
		UserRepo:              repository.NewUserRepo(db),
		SessionRepo:           repository.NewSessionRepo(db),
		TemplSubscriptionRepo: repository.NewTemplSubscriptionRepo(db),
		UserSubscriptionRepo:  repository.NewUserSubscriptionRepo(db),

		GoogleService: google.NewGoogleService(),
	}
}

var _ dai.DataAccessInterfaces = (*Repositories)(nil)
