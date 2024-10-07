package service

import "github.com/submarine/submarine/backend/internal/usecase/dai"

type UserService struct {
	repo dai.DataAccessInterfaces
}

func NewUserService(
	repo dai.DataAccessInterfaces,
) *UserService {
	return &UserService{
		repo: repo,
	}
}
