package entity

import (
	"fmt"

	"github.com/murasame29/go-httpserver-template/internal/framework/svalidate"
)

type Session struct {
	ID        string
	UserID    string
	UserAgent string
	CreatedAt string
	UpdatedAt string
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
