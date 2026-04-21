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
		options.Client().ApplyURI("mongodb+srv://adityasanskarsrivastav788_db_user:pass7880@cluster0.hwixfs7.mongodb.net/?appName=Cluster0"))

	if err != nil {
		log.Fatal("Mongo connection failed:", err)
	}

	DB = client.Database("expenseDB")

	log.Println("MongoDB connected 🚀")
}
