package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/murasame29/go-httpserver-template/internal/framework/cookie"
	"github.com/murasame29/go-httpserver-template/internal/usecase/interactor"
)

type GoogleLoginRequest struct {
	Code string `json:"code"`
}

type GoogleLoginResponse struct {
	ID string `json:"userId"`
}

func LoginGoogle(
	login *interactor.Login,
	cookieSetter *cookie.CookieSetter,
) echo.HandlerFunc {
	return func(c echo.Context) error {
		var reqBody GoogleLoginRequest
		if err := c.Bind(&reqBody); err != nil {
			return echo.ErrBadRequest
		}
		ctx := c.Request().Context()

		result, err := login.Google(ctx, interactor.GoogleLoginParam{
			Code: reqBody.Code,
		})

		if err != nil {
			switch err.(type) {
			default:
				return echo.ErrInternalServerError
			}
		}

		// set cookie
		cookieSetter.CreateCookieSetter(c).SetCookieValue(string(cookie.SessionID), result.SessionID)

		c.JSON(http.StatusOK, GoogleLoginResponse{
			ID: result.UserID,
		})
		return nil
	}
}
