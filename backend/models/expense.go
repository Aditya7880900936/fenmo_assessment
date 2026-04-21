package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Expense struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Amount      int64              `json:"amount"`
	Category    string             `json:"category"`
	Description string             `json:"description"`
	Date        string             `json:"date"`
	CreatedAt   string             `json:"created_at"`
}