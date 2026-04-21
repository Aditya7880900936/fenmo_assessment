package controllers

import (
	"context"
	"fmt"
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
	collection := config.DB.Collection("expenses")
	idemCollection := config.DB.Collection("idempotency_keys")

	idemKey := c.GetHeader("Idempotency-Key")

	// 🔥 STEP 1: check if key exists
	if idemKey != "" {
		var existing bson.M
		err := idemCollection.FindOne(context.TODO(), bson.M{"key": idemKey}).Decode(&existing)

		if err == nil {
			// already processed → return old response
			c.JSON(http.StatusOK, existing["response"])
			return
		}
	}

	var expense models.Expense

	// ✅ FIRST: bind JSON
	if err := c.ShouldBindJSON(&expense); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// ✅ NOW: debug
	fmt.Println("Incoming Amount:", expense.Amount)

	// ✅ NOW: validation
	if expense.Amount <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Amount must be positive"})
		return
	}

	if expense.Category == "" || expense.Date == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Category and Date required"})
		return
	}
	expense.CreatedAt = time.Now().Format(time.RFC3339)

	result, err := collection.InsertOne(context.TODO(), expense)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save"})
		return
	}

	expense.ID = result.InsertedID.(primitive.ObjectID)

	// 🔥 STEP 2: store idempotency result
	if idemKey != "" {
		idemCollection.InsertOne(context.TODO(), bson.M{
			"key":      idemKey,
			"response": expense,
		})
	}

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
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch"})
		return
	}

	var expenses []models.Expense
	cursor.All(context.TODO(), &expenses)

	c.JSON(http.StatusOK, expenses)
}
