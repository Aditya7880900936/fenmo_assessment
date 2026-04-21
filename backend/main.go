package main

import (
	"expense-tracker/config"
	"expense-tracker/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectDB()

	r := gin.Default()

	routes.RegisterRoutes(r)

	r.Run(":8080")
}