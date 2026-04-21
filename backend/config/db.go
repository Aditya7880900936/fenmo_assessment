package config

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectDB() {
	client, err := mongo.Connect(context.TODO(),
		options.Client().ApplyURI("YOUR_MONGO_URI"))

	if err != nil {
		log.Fatal("Mongo connection failed:", err)
	}

	DB = client.Database("expenseDB")

	log.Println("MongoDB connected 🚀")
}