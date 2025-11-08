import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

/**
 * POST /api/sessions/create
 * Body: { admin_id, title }
 */
export const createSession = async (req, res) => {
  try {
    const { admin_id, title, video_url } = req.body;
    if (!admin_id || !title) {
      return res.status(400).json({ message: "admin_id and title required" });
    }

    const session_code = uuidv4();
    const status = "active";

    const sql = "INSERT INTO sessions (admin_id, session_code, title, status, video_url) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [admin_id, session_code, title, status, video_url || null]);

    const userurl = `http://localhost:5173/student/video/${session_code}`;

    return res.status(201).json({
      message: "Session created successfully",
      sessionId: result.insertId,
      session_code,
      userurl
    });
  } catch (error) {
    console.error("Error creating session:", error);
    return res.status(500).json({ message: "Error creating session", error });
  }
};


/**
 * GET /api/sessions/:code
 * Fetch session details by session_code
 */
export const getSessionByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const [rows] = await db.query("SELECT * FROM sessions WHERE session_code = ?", [code]);
    if (rows.length === 0) return res.status(404).json({ message: "Session not found" });
    return res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching session:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * POST /api/sessions/join
 * Body: { session_code, student_id }
 * Inserts attendance record
 */
export const joinSession = async (req, res) => {
  try {
    const { session_code, student_id } = req.body;
    if (!session_code || !student_id) return res.status(400).json({ message: "session_code and student_id required" });

    // find session id
    const [sessions] = await db.query("SELECT id FROM sessions WHERE session_code = ?", [session_code]);
    if (sessions.length === 0) return res.status(404).json({ message: "Session not found" });

    const session_id = sessions[0].id;

    // check if already joined
    const [exists] = await db.query("SELECT * FROM attendance WHERE session_id = ? AND student_id = ?", [session_id, student_id]);
    if (exists.length > 0) {
      return res.status(200).json({ message: "Already joined", attendanceId: exists[0].id });
    }

    const [insertRes] = await db.query("INSERT INTO attendance (session_id, student_id) VALUES (?, ?)", [session_id, student_id]);
    return res.status(201).json({ message: "Joined session and attendance marked", attendanceId: insertRes.insertId, session_id });
  } catch (error) {
    console.error("Error joining session:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * POST /api/sessions/end
 * Body: { session_code }
 * Sets session status = 'ended'
 */
export const endSession = async (req, res) => {
  try {
    const { session_code } = req.body;
    if (!session_code) return res.status(400).json({ message: "session_code required" });

    const [rows] = await db.query("UPDATE sessions SET status = 'ended' WHERE session_code = ?", [session_code]);
    return res.json({ message: "Session ended" });
  } catch (error) {
    console.error("Error ending session:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};


/**
 * GET /api/sessions/stats
 * Returns dashboard stats for admin
 */
export const getDashboardStats = async (req, res) => {
  try {
    const [[studentCount]] = await db.query(
      "SELECT COUNT(*) AS totalStudents FROM users WHERE role = 'student'"
    );
    const [[totalSessions]] = await db.query(
      "SELECT COUNT(*) AS totalSessions FROM sessions"
    );
    const [[activeSessions]] = await db.query(
      "SELECT COUNT(*) AS activeSessions FROM sessions WHERE status = 'active'"
    );

    const [recentSessions] = await db.query(
      "SELECT * FROM sessions ORDER BY created_at DESC"
    );

    res.json({
      stats: {
        totalStudents: studentCount.totalStudents,
        totalSessions: totalSessions.totalSessions,
        activeSessions: activeSessions.activeSessions,
      },
      recentSessions,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Server error", error });
  }
};



export const getStudentSessions = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      `SELECT s.title, s.status, s.created_at 
       FROM sessions s
       JOIN attendance a ON a.session_id = s.id
       WHERE a.student_id = ?`,
      [id]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching student sessions:", error);
    res.status(500).json({ message: "Server error" });
  }
};
