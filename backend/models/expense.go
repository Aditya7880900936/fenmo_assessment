package models

type Expense struct {
	ID          string `json:"id" bson:"_id,omitempty"`
	Amount      int64  `json:"amount" bson:"amount"`
	Category    string `json:"category" bson:"category"`
	Description string `json:"description" bson:"description"`
	Date        string `json:"date" bson:"date"`
	CreatedAt   string `json:"created_at" bson:"created_at"`
}