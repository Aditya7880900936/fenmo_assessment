package controllers

import (
	"context"
	"net/http"
	"time"

	"expense-tracker/config"
	"expense-tracker/models"

	"github.com/gin-gonic/gin"
)

func CreateExpense(c *gin.Context) {
	var expense models.Expense

	if err := c.ShouldBindJSON(&expense); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	expense.CreatedAt = time.Now().Format(time.RFC3339)

	collection := config.DB.Collection("expenses")

	_, err := collection.InsertOne(context.TODO(), expense)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save"})
		return
	}

	c.JSON(http.StatusOK, expense)
}