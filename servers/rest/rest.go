package rest

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/static"
	"github.com/gin-contrib/cors"
)


func RunAPI(address string) error {
	// Gin 엔진
	r := gin.Default()
	// r.Use(cors.New(cors.Config{
	// 	AllowOrigins:     []string{"*"},
	// 	AllowMethods:     []string{"GET"},
	// 	AllowHeaders:     []string{"Origin"},
	// 	ExposeHeaders:    []string{"Content-Length"},
	// 	AllowCredentials: true,
	// }))
	// r.GET("/search", IndexHome)
	// run server
	r.GET("/search", IndexHome)
	r.Use(static.Serve("/", static.LocalFile("../client/build", true)))	// r.StaticFile("/show","./build/index.html")
	// r.Static("/","../../build");
	return r.Run(address)
}

/*
	원본코드
	h := HandlerInterface
	r.GET("/", h.IndexHome)
	핸들러 사용시 에러 발생. 추후 해결 예정
*/

// export GOPATH=$HOME