// src/api/sessionAPI.js
import API from "./api";

export const fetchSessions = async () => {
  const res = await API.get("/sessions/stats");
  return res?.data?.recentSessions || [];
};

export const joinSession = async (session_code, student_id) => {
  return await API.post("/sessions/join", { session_code, student_id });
};
