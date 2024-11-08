package controller

import (
	"encoding/json"
	"io"
	"log/slog"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/submarine/submarine/backend/internal/framework/cookie"
	"github.com/submarine/submarine/backend/internal/framework/scontext"
	"github.com/submarine/submarine/backend/internal/usecase/interactor"
)

type GoogleLoginRequest struct {
	Code string `json:"code"`
}

type GoogleLoginResponse struct {
	ID   string `json:"userId"`
	Icon string `json:"icon"`
}

// googleLogin godoc
// @Summary  Google Login
// @ID       GoogleLogin
// @Tags     LoginRequest
// @Accept   json
// @Produce  json
// @Param 	 q			 body 		 GoogleLoginRequest  true "GoogleLoginRequest"
// @Success  200  	 {object}  GoogleLoginResponse
// @Failure  400  {object}  echo.HTTPError
// @Failure  500  {object}  echo.HTTPError
// @Router   /login/google [post]
func LoginGoogle(
	login *interactor.Login,
	cookieSetter *cookie.CookieSetter,
) echo.HandlerFunc {
	return func(c echo.Context) error {
		var reqBody GoogleLoginRequest
		ctx := scontext.ConvertContext(c)		
		// if err := c.Bind(&reqBody); err != nil {
		// 	slog.Warn("failed to bind request body", "error",err,"requestID", scontext.GetRequestID(ctx))
		// 	return echo.ErrBadRequest
		// }

	body ,err := io.ReadAll(c.Request().Body)
	if err != nil {
		slog.Warn("failed to read request body", "error",err,"requestID", scontext.GetRequestID(ctx))
		return echo.ErrBadRequest
	}

	if err := json.Unmarshal(body,&reqBody);err != nil {
		slog.Warn("failed to bind request body", "error",err,"requestID", scontext.GetRequestID(ctx))
		return echo.ErrBadRequest
	}
		
		result, err := login.Google(ctx, interactor.GoogleLoginParam{
			Code: reqBody.Code,
		})
		if err != nil {
			switch err.(type) {
			default:
				slog.Error("failed to login google", "error", err,"requestID", scontext.GetRequestID(ctx))
				return echo.ErrInternalServerError
			}
		}
		// set cookie
		cookieSetter.CreateCookieSetter(c).SetCookieValue(string(cookie.SessionID), result.SessionID)

		c.JSON(http.StatusOK, GoogleLoginResponse{
			ID:   result.UserID,
			Icon: result.Icon,
		})
		return nil
	}
}
