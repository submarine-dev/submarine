FROM golang:1.22.2 AS builder
WORKDIR /build

COPY . .

RUN go build -o app ./cmd/app/main.go

FROM gcr.io/distroless/static-debian11:nonroot
WORKDIR /app

COPY --from=builder /build/app .

ENV PORT=

EXPOSE ${PORT}

USER 1001

CMD ["/app/main"]