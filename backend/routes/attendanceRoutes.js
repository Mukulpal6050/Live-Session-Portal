import express from "express";
import { joinSession } from "../controllers/sessionController.js";
import { getAttendanceBySession, leaveSession } from "../controllers/attendanceController.js";

const router = express.Router();

// ✅ Student joins session
router.post("/join", joinSession);

// ✅ Student leaves session
router.post("/leave", leaveSession);

// ✅ Admin views attendance
router.get("/:session_code", getAttendanceBySession);

export default router;
