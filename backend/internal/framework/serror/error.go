package serror

import "errors"

var (
	ErrResourceNotFound = errors.New("resource not found")
	ErrUserIDDontMatch  = errors.New("userID dont match")
)
