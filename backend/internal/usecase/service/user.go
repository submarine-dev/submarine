package service

import "github.com/murasame29/go-httpserver-template/internal/usecase/dai"

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
