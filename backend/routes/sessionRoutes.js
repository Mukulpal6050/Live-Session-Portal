// backend/routes/sessionRoutes.js
import express from "express";
import { getStudentSessions } from "../controllers/sessionController.js";
import {
  createSession,
  getSessionByCode,
  joinSession,
  endSession,
  getDashboardStats,
} from "../controllers/sessionController.js";

const router = express.Router();

// ✅ Admin dashboard stats
router.get("/stats", getDashboardStats);

// ✅ Session routes
router.get("/student/:id", getStudentSessions);
router.post("/create", createSession);       // admin creates session
router.get("/:code", getSessionByCode);      // get session by session_code (student opens)
router.post("/join", joinSession);           // student joins (marks attendance)
router.post("/end", endSession);             // admin ends session

export default router;
