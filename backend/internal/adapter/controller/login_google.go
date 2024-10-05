package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/murasame29/go-httpserver-template/internal/usecase/interactor"
)

type GoogleLoginRequest struct {
	Code string `json:"code"`
}

type GoogleLoginResponse struct {
	ID   string `json:"userId"`
	Name string `json:"userName"`
	Icon string `json:"userIcon"`
}

func LoginGoogle(
	login *interactor.Login,
) echo.HandlerFunc {
	return func(c echo.Context) error {
		var reqBody GoogleLoginRequest
		if err := c.Bind(&reqBody); err != nil {
			return echo.ErrBadRequest
		}

		// exchange token and create or update user info by google serivce
		user, err := login.Google(c.Request().Context(), interactor.GoogleLoginParam{
			Code: reqBody.Code,
		})

		if err != nil {
			switch err.(type) {
			// TODO: error handle
			default:
				return echo.ErrInternalServerError
			}
		}

		// update session

		// set cookie

		c.JSON(http.StatusOK, GoogleLoginResponse{
			ID:   user.UserID,
			Name: user.UserName,
			Icon: user.ProfileIcon,
		})
		return nil
	}
}
