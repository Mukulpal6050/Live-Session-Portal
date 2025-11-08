import db from "../config/db.js";

// ✅ View attendance by session_code with duration
export const getAttendanceBySession = async (req, res) => {
  try {
    const { session_code } = req.params;

    // find session_id from session_code
    const [sessions] = await db.query("SELECT id FROM sessions WHERE session_code = ?", [session_code]);
    if (sessions.length === 0) {
      return res.status(404).json({ message: "Session not found" });
    }

    const session_id = sessions[0].id;

    // fetch attendance with student info + duration calculation
    const [rows] = await db.query(
      `SELECT 
         a.id, 
         a.join_time, 
         a.leave_time,
         TIMESTAMPDIFF(MINUTE, a.join_time, a.leave_time) AS duration_minutes,
         u.id AS student_id, 
         u.name, 
         u.email
       FROM attendance a
       JOIN users u ON a.student_id = u.id
       WHERE a.session_id = ?`,
      [session_id]
    );

    // handle null leave_time (ongoing session)
    const updatedRows = rows.map((r) => ({
      ...r,
      duration: r.duration_minutes === null ? "Ongoing" : `${r.duration_minutes} min`,
    }));

    res.json(updatedRows);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


// ✅ Student leaves session (update leave_time)
export const leaveSession = async (req, res) => {
  try {
    const { student_id, session_code } = req.body;

    // find session_id from session_code
    const [sessions] = await db.query("SELECT id FROM sessions WHERE session_code = ?", [session_code]);
    if (sessions.length === 0) {
      return res.status(404).json({ message: "Session not found" });
    }

    const session_id = sessions[0].id;

    // update leave_time for that student's attendance
    await db.query(
      "UPDATE attendance SET leave_time = NOW() WHERE student_id = ? AND session_id = ? AND leave_time IS NULL",
      [student_id, session_id]
    );

    res.json({ message: "Leave time recorded successfully" });
  } catch (error) {
    console.error("Error updating leave time:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
