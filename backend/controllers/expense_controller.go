package controllers

import (
	"context"
	"net/http"
	"time"

	"expense-tracker/config"
	"expense-tracker/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateExpense(c *gin.Context) {
	var expense models.Expense

	if err := c.ShouldBindJSON(&expense); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	expense.CreatedAt = time.Now().Format(time.RFC3339)

	collection := config.DB.Collection("expenses")

	result, err := collection.InsertOne(context.TODO(), expense)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save"})
		return
	}

	expense.ID = result.InsertedID.(primitive.ObjectID)

	c.JSON(http.StatusOK, expense)
}

func GetExpenses(c *gin.Context) {
	collection := config.DB.Collection("expenses")

	category := c.Query("category")
	sort := c.Query("sort")

	filter := bson.M{}
	if category != "" {
		filter["category"] = category
	}

	findOptions := options.Find()

	if sort == "date_desc" {
		findOptions.SetSort(bson.D{{Key: "date", Value: -1}})
	}

	cursor, err := collection.Find(context.TODO(), filter, findOptions)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch"})
		return
	}

	var expenses []models.Expense
	cursor.All(context.TODO(), &expenses)

	c.JSON(200, expenses)
}
