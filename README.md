Project Overview  :

Live Session Portal is a real-time session management platform where an admin can start a live session and verify participants through webcam preview.
This project includes:


🔹 Admin can create sessions


🔹 Student can Join the session and marked the Attendance


🔹 Session tracking


🔹 Attendance logs


🔹 React Player video streaming


🔹 Full backend REST APIs


🔹 MySQL relational database


🔹 JWT authentication



🧪 Live Demo

Auth Details:

Email:  sample@example.com
Password: 6 digit password

Frontend (React + Vite)
https://live-session-portal.vercel.app/


Backend (Node.js + Express)
https://live-session-portal-backend.onrender.com/api/sessions/stats


API Documentation
	1 POST → http://localhost:5000/api/auth/register
	
	Body (JSON):
	
	{
	  "name": "Mukul Pal",
	  "email": "mukul@example.com",
	  "password": "123456",
	  "role": "admin"
	}
	
	
	Agar sab sahi, response milega 👇
	
	{
	  "message": "User registered successfully"
	}
	
	
	
	
	2 POST : http://localhost:5000/api/auth/login
	
	Body:
	
	{
	  "email": "mukul@example.com",
	  "password": "123456"
	}
	
	
	Response:
	
	{
	  "id": 1,
	  "name": "Mukul Pal",
	  "email": "mukul@example.com",
	  "role": "admin",
	  "token": "eyJhbGciOiJIUzI1NiIs..."
	}
	
	
	
	
	3 POST: http://localhost:5000/api/sessions/create
	
	Body:
	
	{ "admin_id": 1, "title": "Maths Class" }
	
	
	Response:
	
	{
	  "message": "Session created successfully",
	  "sessionId": 13,
	  "session_code": "ec4ffc59-125f-4f1e-b9db-c848fd73a9e6",
	  "userurl": "http://localhost:5173/session/ec4ffc59-125f-4f1e-b9db-c848fd73a9e6"
	}
	
	
	
	
	
	4 GET: http://localhost:5000/api/sessions/b9f03f7b-9994-4c15-9623-7dc9728f7e90
	
	Response:
	
	{
	  "id": 12,
	  "admin_id": 1,
	  "session_code": "b9f03f7b-9994-4c15-9623-7dc9728f7e90",
	  "title": "Physics Class",
	  "status": "active",
	  "created_at": "2025-11-05T10:08:32.000Z"
	}
	
	
	5 POST: http://localhost:5000/api/sessions/join
	
	Body:
	
	{
	  "session_code": "ec4ffc59-125f-4f1e-b9db-c848fd73a9e6",
	  "student_id": 3
	}
	
	
	Response:
	
	{
	  "message": "Joined session and attendance marked",
	  "attendanceId": 14,
	  "session_id": 13
	}
	
	
	6 POST: http://localhost:5000/api/sessions/join
	
	Body:
	
	{
	  "session_code": "1948b751-b733-4c76-85f8-cac1b8b36aa9",
	  "student_id": 3
	}
	
	
	Response:
	
	{
	  "message": "Joined session and attendance marked",
	  "attendanceId": 15,
	  "session_id": 12
	}
	
	
	7 GET:  http://localhost:5000/api/attendance/leave
	
	Body:
	{
	  "student_id": 2,
	  "session_code": "1948b751-b733-4c76-85f8-cac1b8b36aa9"
	}
	
	Response:
	{
	  "message": "Leave time recorded successfully"
	}
	
	
	
	8 GET : http://localhost:5000/api/attendance/1948b751-b733-4c76-85f8-cac1b8b36aa9
	
	Response:
	
	[
	  {
	    "id": 1,
	    "join_time": "2025-10-31T18:16:57.000Z",
	    "leave_time": "2025-10-31T18:33:11.000Z",
	    "duration_minutes": 16,
	    "student_id": 2,
	    "name": "Ravi Sharma",
	    "email": "ravi@example.com",
	    "duration": "16 min"
	  },
	  {
	    "id": 2,
	    "join_time": "2025-10-31T18:17:10.000Z",
	    "leave_time": "2025-10-31T18:35:32.000Z",
	    "duration_minutes": 18,
	    "student_id": 3,
	    "name": "Mukul Pal",
	    "email": "mukulpal@example.com",
	    "duration": "18 min"
	  },
	  {
	    "id": 3,
	    "join_time": "2025-10-31T18:18:55.000Z",
	    "leave_time": "2025-10-31T18:40:18.000Z",
	    "duration_minutes": 21,
	    "student_id": 4,
	    "name": "Ankit Pal",
	    "email": "ankitpal@example.com",
	    "duration": "21 min"
	  },
	  {
	    "id": 4,
	    "join_time": "2025-10-31T18:20:22.000Z",
	    "leave_time": "2025-10-31T18:42:07.000Z",
	    "duration_minutes": 21,
	    "student_id": 5,
	    "name": "Amit Verma",
	    "email": "amit@example.com",
	    "duration": "21 min"
	  },
	  {
	    "id": 5,
	    "join_time": "2025-10-31T18:21:40.000Z",
	    "leave_time": "2025-10-31T18:39:00.000Z",
	    "duration_minutes": 17,
	    "student_id": 6,
	    "name": "Sneha Kapoor",
	    "email": "sneha@example.com",
	    "duration": "17 min"
	  },
	  {
	    "id": 6,
	    "join_time": "2025-10-31T18:23:30.000Z",
	    "leave_time": "2025-10-31T18:41:25.000Z",
	    "duration_minutes": 17,
	    "student_id": 7,
	    "name": "Rajesh Gupta",
	    "email": "rajesh@example.com",
	    "duration": "17 min"
	  }
	]


🛠️ Tech Stack
Frontend


React.js


Vite


react-player


Axios


Tailwind / Custom CSS


Backend


Node.js


Express.js


JWT Authentication


Multer (for webcam image uploads)


Database


MySQL (Hosted on Railway)



📂 Project Structure
Frontend


src/
 ├─ components/
 │   ├─ AdminDashboard.jsx
 │   ├─ LiveSession.jsx
 │   ├─ UserJoin.jsx
 │   └─ VideoPlayer.jsx
 ├─ pages/
 │   ├─ Login.jsx
 │   ├─ SessionsList.jsx
 │   └─ StartSession.jsx
 ├─ utils/
 │   └─ api.js
 ├─ App.jsx
 └─ main.jsx

Backend


src/
 ├─ controllers/
 │   ├─ authController.js
 │   ├─ sessionController.js
 │   ├─ attendanceController.js
 │   └─ webcamController.js
 ├─ routes/
 │   ├─ authRoutes.js
 │   ├─ sessionRoutes.js
 │   ├─ attendanceRoutes.js
 │   └─ webcamRoutes.js
 ├─ config/
 │   └─ db.js
 ├─ middleware/
 │   └─ auth.js
 └─ server.js


🗃️ Database Structure
Tables

1. users

| Field         | Type                 | Description    |
| ------------- | -------------------- | -------------- |
| id            | PK                   | Auto-increment |
| name          | varchar              | User name      |
| email         | varchar              | Unique         |
| password_hash | varchar              | Encrypted      |
| role          | enum("admin","user") | Role           |
| status        | active/inactive      | Account state  |
| created_at    | timestamp            |                |


2. sessions

| Field         | Type            |
| ------------- | --------------- |
| id            | PK              |
| admin_id      | FK (users.id)   |
| session_title | varchar         |
| session_type  | live/url-stream |
| start_time    | datetime        |
| end_time      | datetime        |
| status        | running/ended   |


3. attendance

| Field      | Type     |
| ---------- | -------- |
| id         | PK       |
| session_id | FK       |
| user_id    | FK       |
| join_time  | datetime |
| leave_time | datetime |



📡 API Documentation

Auth

| Method | Endpoint             | Description      |
| ------ | -------------------- | ---------------- |
| POST   | `/api/auth/login`    | User/Admin Login |
| POST   | `/api/auth/register` | Register user    |
| GET    | `/api/auth/me`       | Profile          |


Sessions

| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| POST   | `/api/sessions/start`   | Start a session      |
| POST   | `/api/sessions/end/:id` | End session          |
| GET    | `/api/sessions`         | Get all sessions     |
| GET    | `/api/sessions/:id`     | Session details      |
| GET    | `/api/sessions/stats`   | Dashboard statistics |


Attendance

| Method | Endpoint                      |
| ------ | ----------------------------- |
| POST   | `/api/attendance/join`        |
| POST   | `/api/attendance/leave`       |
| GET    | `/api/attendance/session/:id` |





🖥️ Features Overview
Admin


Start session and render a Video Player with full control





View participant  preview


Track join/leave timestamp


End session


User


Join live session using URL


Participate in session


Logout



🧩 Flow Diagram
User/Admin → Login → Dashboard

Admin:
  Start Session → Capture Webcam → Share URL → Monitor Participants → End Session

User:
  Open Join URL → Allow Webcam → Preview → Join Session → Leave Session

Backend:
  Store session → Save logs → Generate stats → Provide API data to frontend


📌 Environment Variables
.env (Backend)
PORT=5000
DB_HOST=
DB_USER=root
DB_PASSWORD=
DB_NAME=railway
DB_PORT=
JWT_SECRET=


🧪 How to Run Locally
Backend
cd backend
npm install
npm start

Frontend
cd frontend
npm install
npm run dev



📞 Contact
Developer: Mukul
📧 Email: mukulpal6050@gmail.com
📍 Muzaffarnagar, India

