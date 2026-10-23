# Employee Management System

A simple full-stack CRUD app for managing employees (Name, Email, Department).

- **Frontend:** React + Vite, Axios, plain CSS
- **Backend:** Node.js + Express, Sequelize
- **Database:** MySQL

## Project Structure

```text
employee-management/
├── frontend/              React app (Vite)
│   ├── src/
│   │   ├── App.jsx        Form + table (all CRUD logic)
│   │   ├── api.js         Axios instance
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/               Express API
│   ├── config/            Sequelize connection
│   ├── models/            Employee model
│   ├── routes/            API routes
│   ├── controllers/       Route handlers
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js 18 or newer
- MySQL running locally

## 1. Create the database

Log in to MySQL and run:

```sql
CREATE DATABASE employee_db;
```

The `employees` table is created automatically by Sequelize `sync()` when the backend starts.

## 2. Run the backend

```bash
cd backend
npm install
cp .env.example .env     # Windows: copy .env.example .env
```

Edit `backend/.env` and set your MySQL username and password:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=employee_db
DB_USER=root
DB_PASSWORD=your_mysql_password
```

Start the server:

```bash
npm run dev     # restarts automatically when files change
# or
npm start
```

The API runs at http://localhost:5000.

## 3. Run the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

The frontend calls `http://localhost:5000/api` by default. To use a different backend URL, create `frontend/.env` (see `frontend/.env.example`) and set `VITE_API_URL`.

## API Endpoints

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| GET    | `/api/employees`     | Get all employees     |
| POST   | `/api/employees`     | Create an employee    |
| PUT    | `/api/employees/:id` | Update an employee    |
| DELETE | `/api/employees/:id` | Delete an employee    |

Example request body for POST and PUT:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "department": "Engineering"
}
```

Errors are returned as JSON, for example `{ "message": "Email is already in use" }`, with status `400` (invalid data), `404` (employee not found) or `500` (server error).
