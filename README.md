# TaskFlow - Full Stack Task Management App

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MySQL

## Features
- User registration and login
- JWT authentication
- Create, update and delete tasks
- Status: Todo, In Progress, Completed
- Priority: Low, Medium, High
- Dashboard statistics

## Run

### 1. Database
Create MySQL database and import:
```bash
mysql -u root -p < database/schema.sql
```

### 2. Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

Backend runs on http://localhost:5000
Frontend usually runs on http://localhost:5173
