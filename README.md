# 💸 Expense Tracker (Full Stack)

A production-ready full-stack Expense Tracker application built using **React (Vite)** and a **Go-based REST API backend**.  
This project focuses on **real-world reliability**, **data correctness**, and **clean system design** under constrained conditions.

---

## 🚀 Live Demo

- **Frontend:** https://fenmo-assessment-dcqj.vercel.app  
- **Backend API:** https://fenmo-assessment-pgl7.onrender.com  

---

## 🧠 Problem Statement

This application simulates a real-world personal finance tool where users can:

- Record expenses reliably
- View and analyze spending patterns
- Handle unreliable network conditions (retries, refreshes)

Special focus was given to:

- **Idempotency (duplicate request handling)**
- **Accurate money handling**
- **Production-like system behavior**

---

## ✨ Features

### ✏️ Add Expense

- Add expenses with **amount, category, description, and date**
- Input validation:
  - No negative amounts
  - Required fields enforced
- Prevents duplicate entries using **Idempotency-Key**
- Handles repeated clicks and network retries safely

### 📊 Expense List

- Displays all expenses in a clean and responsive UI
- Shows:
  - Category
  - Amount
  - Date
  - Description
- Graceful empty state handling

### 🔍 Filtering & Sorting

- Filter expenses by category
- Sort expenses by **date (newest first)**
- Implemented via backend query parameters (not client-side hacks)

### 💰 Total Calculation

- Displays total of **currently visible expenses**
- Updates dynamically based on filters and sorting

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Hooks

### Backend
- Go (Gin framework)
- MongoDB (Atlas)
- RESTful API design

---

## 🧩 Architecture Overview

### Frontend (Modular Design)
- **components/** → Reusable UI components
- **hooks/** → Custom hooks for state + API logic
- **services/** → Centralized API layer (Axios)
- **utils/** → Helpers (debounce, etc.)
- **pages/** → Page-level composition

### Backend (Layered Architecture)
- **routes/** → API route definitions
- **controllers/** → Request handling logic
- **models/** → Data schema
- **config/** → DB connection
- **middleware/** → Idempotency handling

---

## 🔌 API Design

### `POST /expenses`
- Creates a new expense
- Supports **Idempotency-Key** header
- Ensures safe retries (no duplicate inserts)

### `GET /expenses`
Supports:
- `category` → filtering
- `sort=date_desc` → sorting

---

## 🔥 Key Engineering Decisions

### 1. Idempotency Handling
- Implemented using a dedicated collection (`idempotency_keys`)
- Ensures:
  - Safe retries
  - No duplicate expense entries
- Critical for real-world reliability

### 2. Money Handling
- Stored as **integer (int64)** instead of float
- Prevents precision errors in financial data

### 3. Backend-Driven Filtering & Sorting
- Avoided frontend-only logic
- Ensures:
  - Consistent results
  - Scalable API behavior

### 4. CORS & Custom Headers
- Configured backend to support custom headers (`Idempotency-Key`)
- Solved real-world cross-origin constraints

---

## ⚙️ Setup Instructions

### 1) Clone Repository
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd frontend
```

### 2) Install Dependencies
```bash
npm install
```

### 3) Run Development Server
```bash
npm run dev
```

---

## 🌐 Environment Variables

Create a `.env` file in the frontend:

```env
VITE_API_URL=https://fenmo-assessment-pgl7.onrender.com
```

---

## 🧪 Production Considerations

- Handles **network retries and duplicate submissions**
- Uses **environment variables** for configuration
- Backend deployed with dynamic port handling
- MongoDB secured with network access configuration
- Proper **error and loading states**

---

## 🧑‍💻 Author

**Aditya Sanskar Srivastav**

---

## 🚀 Future Improvements

- Expense analytics dashboard (charts)
- Authentication (multi-user support)
- Pagination / infinite scroll
- Dark mode
- Category-wise aggregation

---

## ⭐ Conclusion

This project demonstrates **production-level thinking**, focusing on:

- Reliability (idempotency)
- Data correctness
- Clean architecture
- Real-world deployment challenges