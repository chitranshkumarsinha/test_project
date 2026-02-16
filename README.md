# 🚀 Task Management System (MERN Stack)

A secure full-stack Task Management application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
This project demonstrates authentication, authorization, protected routes, and CRUD operations with a scalable backend architecture.

---

## 📌 Overview

This application allows users to:

- Register and log in securely
- Access a protected dashboard
- Create, update, delete, and manage tasks
- Toggle task completion
- Log out securely

The backend follows a modular architecture with middleware-based authentication and versioned APIs.

---

## 🛠 Tech Stack

### 🔹 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- CORS

### 🔹 Frontend
- React.js
- Axios
- CSS

---

## 🔐 Features

### Authentication & Authorization
- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- Role-based access (User/Admin)

### Task Management
- Create task
- Read all tasks
- Update task
- Delete task
- Toggle completion status

### Security
- Input validation
- Hashed passwords
- JWT verification middleware
- Error handling
- API versioning (`/api/v1/`)

---

## 📂 Project Structure

test_project/
│
├── server/
│ ├── config/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── app.js
│ └── server.js
│
└── client/
├── components/
├── services/
└── App.js


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/chitranshkumarsinha/test_project.git
cd test_project
🖥 Backend Setup
cd server
npm install
Create a .env file inside the server/ directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=expire_time

Start backend:
npm run dev
Backend runs on:
http://localhost:5000

🌐 Frontend Setup
cd client
npm install
npm start
Frontend runs on:
http://localhost:5173

🔑 API Endpoints
🔐 Auth Routes
Method	Endpoint	Description
POST	/api/v1/auth/register	Register a new user
POST	/api/v1/auth/login	Login user
📋 Task Routes (Protected)
Method	Endpoint	Description
GET	/api/v1/tasks	Get all tasks
POST	/api/v1/tasks	Create a task
PUT	/api/v1/tasks/:id	Update a task
DELETE	/api/v1/tasks/:id	Delete a task
🔐 Authentication Flow
User registers or logs in.

Server generates JWT token.

Token is stored in frontend (localStorage).

Token is sent in request headers:

Authorization: Bearer <token>
Backend verifies token using middleware.

If valid → access granted.

🧠 Architecture Highlights
Modular folder structure

Middleware-based authentication

Clean separation of concerns

Versioned API structure

Scalable backend design

📈 Future Improvements
Refresh token implementation

Swagger API documentation

Token rotation

Pagination and filtering

Deployment (Render / Railway / Vercel)

CI/CD integration

👨‍💻 Author
Chitransh Kumar Sinha

📜 License
This project is built for educational and internship demonstration purposes.
