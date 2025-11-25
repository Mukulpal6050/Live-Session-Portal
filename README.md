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

Frontend (React + Vite)
https://live-session-portal.vercel.app/


Backend (Node.js + Express)
https://live-session-portal-backend.onrender.com/api/sessions/stats


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

