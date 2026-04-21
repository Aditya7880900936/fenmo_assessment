package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Expense struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Amount      int64              `json:"amount" bson:"amount"`
	Category    string             `json:"category" bson:"category"`
	Description string             `json:"description" bson:"description"`
	Date        string             `json:"date" bson:"date"`
	CreatedAt   string             `json:"created_at" bson:"created_at"`
}