# Build the Go API
FROM golang:latest AS builder
ADD . /app
WORKDIR /app/servers
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-w" -a -o /main .
# Build the React application
FROM node:alpine AS node_builder
COPY --from=builder /app/client ./
RUN npm install
RUN npm run build
# Final stage build, this will be the container
# that we will deploy to production
FROM alpine:latest
RUN apk --no-cache add ca-certificates
RUN mkdir -p /make
RUN mkdir -p /client/build
COPY --from=builder /main ./make
COPY --from=node_builder /build ./client/build
RUN chmod +x ./make/main
EXPOSE 3000
CMD ./make/main