package rest

import (
	"encoding/json"
	"fmt"
	"github.com/GiterLab/urllib"
	"github.com/gin-gonic/gin"
	"net/http"
)

/*
type HandlerInterface interface {
	IndexHome(c *gin.Context)
} 핸들러 에러 해결 예정
*/

type Info struct {
	Title       string `json:"title"`
	Date        string `json:"date"`
	Explanation string `json:"explanation"`
	Url         string `json:"url"`
	HdUrl          string `json:"hdurl"`
	//MediaType      string `json:"media_type"`
	//ServiceVersion string `json:"service_version"`
}

func IndexHome(c *gin.Context) {
	
	// get values from API
	req := urllib.Get("https://api.nasa.gov/planetary/apod?api_key=rvU2JWqSHNFizqfke1599aJG4Ax3GvKmQYXPfSld&hd=true")
	
	req.Debug(true)
	strJson, err := req.String()
	if err != nil {
		fmt.Println(err)
	}

	var info Info

	// JSON decoding
	err = json.Unmarshal([]byte(strJson), &info)
	if err != nil {
		fmt.Println("Parsing error!!")
	}

	c.JSON(http.StatusOK, info)
	
}
