package main

import (
	"expense-tracker/config"
	"expense-tracker/routes"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found (using env vars)")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	config.ConnectDB()

	r := gin.Default()
	r.Use(cors.Default())

	routes.RegisterRoutes(r)

	r.Run(":" + port)
}
