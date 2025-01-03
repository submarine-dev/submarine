// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/login/google": {
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "LoginRequest"
                ],
                "summary": "Google Login",
                "operationId": "GoogleLogin",
                "parameters": [
                    {
                        "description": "GoogleLoginRequest",
                        "name": "q",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controller.GoogleLoginRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/controller.GoogleLoginResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    }
                }
            }
        },
        "/v1/subscriptions": {
            "get": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Subscription"
                ],
                "summary": "Get Subscriptions",
                "operationId": "GetSubscriptions",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/controller.GetSubscriptionsResponse"
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    }
                }
            }
        },
        "/v1/subscriptions/{subscriptionId}": {
            "get": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Subscription"
                ],
                "summary": "Get Subscription",
                "operationId": "GetSubscription",
                "parameters": [
                    {
                        "type": "string",
                        "description": "subscription id",
                        "name": "subscriptionId",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/controller.GetSubscriptionResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    }
                }
            }
        },
        "/v1/users/{userId}/subscriptions": {
            "get": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "UserSubscription"
                ],
                "summary": "Get Subscription",
                "operationId": "GetUserSubscriptions",
                "parameters": [
                    {
                        "type": "string",
                        "description": "user id",
                        "name": "userId",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/controller.GetUserSubscriptionsResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    }
                }
            },
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "UserSubscription"
                ],
                "summary": "User Subscription",
                "operationId": "CreateUserSubscription",
                "parameters": [
                    {
                        "type": "string",
                        "description": "user id",
                        "name": "userId",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "CreateUserSubscriptionRequest",
                        "name": "q",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controller.CreateUserSubscriptionRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/controller.CreateUserSubscriptionResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    }
                }
            }
        },
        "/v1/users/{userId}/subscriptions/{userSubscriptionId}": {
            "put": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "UserSubscription"
                ],
                "summary": "User Subscription",
                "operationId": "UpdateUserSubscription",
                "parameters": [
                    {
                        "type": "string",
                        "description": "user id",
                        "name": "userId",
                        "in": "path",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "user subscription id",
                        "name": "userSubscriptionId",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "UpdateUserSubscriptionRequest",
                        "name": "q",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controller.UpdateUserSubscriptionRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/controller.UpdateUserSubscriptionResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    }
                }
            },
            "delete": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "UserSubscription"
                ],
                "summary": "Get Subscription",
                "operationId": "DeleteUserSubscriptions",
                "parameters": [
                    {
                        "type": "string",
                        "description": "user id",
                        "name": "userId",
                        "in": "path",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "user subscription id",
                        "name": "userSubscriptionId",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/controller.DeleteUserSubscriptionResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "controller.CreateUserSubscriptionRequest": {
            "type": "object",
            "properties": {
                "currency": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "planId": {
                    "type": "string"
                },
                "planName": {
                    "type": "string"
                },
                "planPaymentType": {
                    "$ref": "#/definitions/entity.PaymentType"
                },
                "planPrice": {
                    "type": "integer"
                },
                "subscriptionId": {
                    "type": "string"
                },
                "unsubscribeLink": {
                    "type": "string"
                }
            }
        },
        "controller.CreateUserSubscriptionResponse": {
            "type": "object",
            "properties": {
                "userSubscrionId": {
                    "type": "string"
                }
            }
        },
        "controller.DeleteUserSubscriptionResponse": {
            "type": "object",
            "properties": {
                "userSubscriptionId": {
                    "type": "string"
                }
            }
        },
        "controller.GetSubscriptionResponse": {
            "type": "object",
            "properties": {
                "icon": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "isSubscribed": {
                    "type": "boolean"
                },
                "name": {
                    "type": "string"
                },
                "plan": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/entity.TemplPlan"
                    }
                }
            }
        },
        "controller.GetSubscriptionsResponse": {
            "type": "object",
            "properties": {
                "icon": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "isSubscribed": {
                    "type": "boolean"
                },
                "name": {
                    "type": "string"
                }
            }
        },
        "controller.GetUserSubscriptionsResponse": {
            "type": "object",
            "properties": {
                "totalAmountPerDay": {
                    "type": "integer"
                },
                "totalAmountPerMonth": {
                    "type": "integer"
                },
                "totalAmountPerYear": {
                    "type": "integer"
                },
                "userSubscriptions": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/entity.UserSubscription"
                    }
                }
            }
        },
        "controller.GoogleLoginRequest": {
            "type": "object",
            "properties": {
                "code": {
                    "type": "string"
                }
            }
        },
        "controller.GoogleLoginResponse": {
            "type": "object",
            "properties": {
                "icon": {
                    "type": "string"
                },
                "userId": {
                    "type": "string"
                }
            }
        },
        "controller.UpdateUserSubscriptionRequest": {
            "type": "object",
            "properties": {
                "currency": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "planId": {
                    "type": "string"
                },
                "planName": {
                    "type": "string"
                },
                "planPaymentType": {
                    "$ref": "#/definitions/entity.PaymentType"
                },
                "planPrice": {
                    "type": "integer"
                },
                "unsubscribeLink": {
                    "type": "string"
                },
                "userID": {
                    "type": "string"
                },
                "userSubscriptionID": {
                    "type": "string"
                }
            }
        },
        "controller.UpdateUserSubscriptionResponse": {
            "type": "object",
            "properties": {
                "totalAmountPerDay": {
                    "type": "integer"
                },
                "totalAmountPerMonth": {
                    "type": "integer"
                },
                "totalAmountPerYear": {
                    "type": "integer"
                },
                "userSubscriptions": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/entity.UserSubscription"
                    }
                }
            }
        },
        "echo.HTTPError": {
            "type": "object",
            "properties": {
                "message": {}
            }
        },
        "entity.PaymentType": {
            "type": "string",
            "enum": [
                "daily",
                "monthly",
                "yearly"
            ],
            "x-enum-varnames": [
                "PaymentTypeDaily",
                "PaymentTypeMonthly",
                "PaymentTypeYearly"
            ]
        },
        "entity.TemplPlan": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "paymentType": {
                    "$ref": "#/definitions/entity.PaymentType"
                },
                "price": {
                    "type": "integer"
                },
                "subscriptionId": {
                    "type": "string"
                }
            }
        },
        "entity.UserSubscription": {
            "type": "object",
            "properties": {
                "createdAt": {
                    "type": "string"
                },
                "icon": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "paidAt": {
                    "type": "string"
                },
                "paymentType": {
                    "$ref": "#/definitions/entity.PaymentType"
                },
                "planId": {
                    "type": "string"
                },
                "planName": {
                    "type": "string"
                },
                "price": {
                    "type": "integer"
                },
                "templId": {
                    "type": "string"
                },
                "unsubscribeLink": {
                    "type": "string"
                },
                "updatedAt": {
                    "type": "string"
                },
                "userId": {
                    "type": "string"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "0.0.1",
	Host:             "",
	BasePath:         "/v1",
	Schemes:          []string{},
	Title:            "submarine-api",
	Description:      "",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
