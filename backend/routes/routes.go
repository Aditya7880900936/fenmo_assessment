package routes

import (
	"expense-tracker/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "API running"})
	})

	r.POST("/expenses", controllers.CreateExpense)
}