package main

import (
	"github.com/forest747/Astronomy-Picture-of-the-Day/rest"
	"log"

)

func main() {
	log.Println("Main log....")
	log.Fatal(rest.RunAPI("localhost:3000"))
}
