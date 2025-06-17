
# 💸 Split Expense App - Backend

This is the backend system for a Split Expense App, designed to help groups of people split expenses fairly and track who owes whom. Inspired by Splitwise, the system supports expense tracking, settlement calculation, and data validation.

✅ Built with **Node.js, Express, MongoDB, Joi**, and follows modular, RESTful architecture.

---

## 📁 Project Structure

```
split-expense-backend/
├── config/
│   └── db.js
├── controllers/
│   ├── expenseController.js
│   └── settlementController.js
├── middleware/
│   ├── errorHandler.js
│   ├── responseFormatter.js
│   └── validateRequest.js
├── models/
│   └── Expense.js
├── routes/
│   ├── expenses.js
│   └── settlements.js
├── validators/
│   └── expenseSchema.js
├── .env
├── server.js
├── package.json
└── README.md
```

---

## 🚀 Features

### Core Functionalities

- Add, view, update, and delete expenses
- Split expenses equally, by percentage, or exact amounts
- Automatically calculate balances for all users
- Generate simplified settlements (minimize number of transactions)
- Derive all people from expense entries

### Validation & Error Handling

- Joi-based request validation
- Centralized response formatting middleware
- Proper HTTP status codes (400, 404, 500, etc.)
- Catch-all route for invalid endpoints

---

## 📡 API Endpoints

### Expense Management

- `GET /expenses` - List all expenses
- `POST /expenses` - Add a new expense
- `PUT /expenses/:id` - Update an existing expense
- `DELETE /expenses/:id` - Delete an expense

### Settlement & Balances

- `GET /people` - List all involved people
- `GET /balances` - Get current balances per person
- `GET /settlements` - Generate simplified settlement summary

---

## 🔐 Sample Payloads

### Add Expense

```json
POST /expenses
{
  "amount": 450,
  "description": "Groceries",
  "paid_by": "Sanket",
  "participants": ["Shantanu", "Om"],
  "split_type": "equal"
}
```

### Response Format

```json
{
  "success": true,
  "message": "Expense added successfully",
  "data": {
    "_id": "abc123",
    "amount": 450,
    "description": "Groceries",
    ...
  }
}
```

---

## 🧪 Validation Rules

| Field         | Rule                                        |
|---------------|---------------------------------------------|
| `amount`      | Required, must be a positive number         |
| `description` | Required string                             |
| `paid_by`     | Required string                             |
| `participants`| Required array with at least 1 participant  |
| `split_type`  | Must be 'equal', 'percentage', or 'exact'   |
| `split_values`| Required if type is not 'equal'             |

---

## 🌐 Deployment Link 

- [Render](https://splitexpenseapp.onrender.com/)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/split-expense-backend.git
cd split-expense-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```
MONGO_URI=<your-mongo-uri>
PORT=5000
```

### 4. Run the server

```bash
npm run dev
```

---

## 📬 Postman Collection

- 🔗 [Postman Gist](https://gist.github.com/3340f22c325e38c8dcd472b7b07c7a7f.git)
- Includes:
  - People: Shantanu, Sanket, Om
  - Expenses: Dinner, Groceries, Petrol, Pizza, Movie
  - Edge case tests and settlement scenarios

---

## 🧭 Known Limitations

- Authentication is not implemented (no JWT)
- No recurring or automated expenses
- No UI or dashboard (backend only)

---



## 🛠 Tech Stack

- Backend: Node.js + Express
- Database: MongoDB Atlas
- Validation: Joi
- Testing: Postman
- Deployment: Render / Railway / Vercel (API)

---

## 👨‍💻 Author

Made with ❤️ by **Sushant Gavaraskar**  
For **DevDynamics Backend Intern Assignment**

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
