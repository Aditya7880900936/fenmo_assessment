package main

import (
	"context"
	"log"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var collection *mongo.Collection

func main() {
	client, err := mongo.Connect(context.TODO(),
		options.Client().ApplyURI("mongodb+srv://adityasanskarsrivastav788_db_user:pass7880@cluster0.hwixfs7.mongodb.net/?appName=Cluster0"))

	if err != nil {
		log.Fatal(err)
	}

	collection = client.Database("expenseDB").Collection("expenses")

	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Mongo connected 🚀"})
	})

	r.Run(":8080")
}
