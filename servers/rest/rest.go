package rest

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/static"
	"encoding/json"
	"io/ioutil"
	"fmt"
	"net/http"
	cors "github.com/rs/cors/wrapper/gin"
)


type Info struct {
	Title       string `json:"title"`
	Date        string `json:"date"`
	Explanation string `json:"explanation"`
	Url         string `json:"url"`
	HdUrl       string `json:"hdurl"`
	//MediaType      string `json:"media_type"`
	//ServiceVersion string `json:"service_version"`
}

func RunAPI(address string) error {
	// Gin 엔진
	r := gin.Default()
	// "github.com/gin-contrib/cors"

	// r.Use(cors.New(cors.Config{
	// 	AllowOrigins:     []string{"*"},
	// 	AllowMethods:     []string{"GET"},
	// 	AllowHeaders:     []string{"Origin"},
	// 	ExposeHeaders:    []string{"Content-Length"},
	// 	AllowCredentials: true,
	// }))
	// r.GET("/search", IndexHome)
	// run server
	r.Use(cors.Default())
	// r.GET("/search", IndexHome)

	r.GET("/search", func(c *gin.Context){
	
		c.Header("Access-Control-Allow-Headers","Content-Type,Authorization,Origin")
		c.Header("Access-Control-Allow-Origin","*")
		c.Header("Access-Control-Allow-Credentials","true")
		c.Header("Access-Control-Allow-Methods","GET")
		// get values from API
		// 	"github.com/GiterLab/urllib"
		// req := urllib.Get("https://api.nasa.gov/planetary/apod?api_key=rvU2JWqSHNFizqfke1599aJG4Ax3GvKmQYXPfSld&hd=true")
		
		resp, err := http.Get("https://api.nasa.gov/planetary/apod?api_key=rvU2JWqSHNFizqfke1599aJG4Ax3GvKmQYXPfSld&hd=true")
	
		// req.Debug(true)
		// strJson, err := req.String()
		if err != nil {
			fmt.Println(err)
		}
		// req.Heade;
		var info Info
		defer resp.Body.Close()
		
		// // JSON decoding
		// err = json.Unmarshal([]byte(strJson), &info)
		// if err != nil {
		// 	fmt.Println("Parsing error!!")
		// }
	
		// c.JSON(http.StatusOK, info)
		strJson, err := ioutil.ReadAll(resp.Body)
		err = json.Unmarshal([]byte(strJson), &info)
		if err != nil {
			fmt.Println("Parsing error!!")
		}
	
		c.JSON(http.StatusOK, info)
	})
	

	r.Use(static.Serve("/", static.LocalFile("../client/build", true)))	// r.StaticFile("/show","./build/index.html")
	return r.Run(address)
}

/*
	원본코드
	h := HandlerInterface
	r.GET("/", h.IndexHome)
	핸들러 사용시 에러 발생. 추후 해결 예정
*/

// export GOPATH=$HOME