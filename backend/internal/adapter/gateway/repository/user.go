package repository

import (
	"context"

	"github.com/murasame29/go-httpserver-template/internal/domain/entity"
	"github.com/murasame29/go-httpserver-template/internal/usecase/dai"
	"github.com/uptrace/bun"
)

type UserRepo struct {
	db bun.IDB
}

func NewUserRepo(db bun.IDB) *UserRepo {
	return &UserRepo{db: db}
}

var _ dai.User = (*UserRepo)(nil)

func (r *UserRepo) GetUserByID(ctx context.Context, id string) (*entity.User, error) {
	var user entity.User
	err := r.db.NewSelect().
		Model(&user).
		Where("id = ?", id).
		Scan(ctx, &user)

	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepo) GetUserByEmail(ctx context.Context, email string) (*entity.User, bool, error) {
	var user entity.User
	query := r.db.NewSelect().
		Model(&user).
		Where("email = ?", email)

	exists, err := query.Exists(ctx)
	if err != nil {
		return nil, false, err
	}
	if !exists {
		return nil, false, nil
	}

	if err := query.Scan(ctx, &user); err != nil {
		return nil, false, err
	}

	return &user, true, nil
}

func (r *UserRepo) CreateUser(ctx context.Context, user *entity.User) error {
	if _, err := r.db.NewInsert().Model(user).Exec(ctx); err != nil {
		return err
	}

	return nil
}

func (r *UserRepo) UpdaterUser(ctx context.Context, id string, user *entity.User) error {
	if _, err := r.db.NewUpdate().Model(user).WherePK().Exec(ctx); err != nil {
		return err
	}

	return nil
}
