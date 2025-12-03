// /src/pages/admin/Dashboard.jsx
import React, { useEffect, useState, useCallback } from "react";
import API from "../../api/api";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import io from "socket.io-client";

import StatsCard from "../../components/StatsCard";
import SessionForm from "../../components/SessionForm";
import LiveSessionPreview from "../../components/LiveSessionPreview";
import RecentSessionsTable from "../../components/RecentSessionsTable";

// ✅ Connect to backend socket
const socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:5000");

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalStudents: 0, totalSessions: 0, activeSessions: 0 });
  const [sessions, setSessions] = useState([]);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      const res = await API.get("/sessions/stats");
      if (res?.data) {
        setStats(res.data.stats || {});
        setSessions(res.data.recentSessions || []);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      toast.error("Could not load dashboard data");
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // ✅ Function to clean YouTube link
  const cleanYouTubeUrl = (url) => {
    if (!url) return url;
    try {
      const youtubeRegex = /(?:youtube\.com\/(?:.*v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(youtubeRegex);
      return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : url.trim();
    } catch {
      return url.trim();
    }
  };

  // ✅ Start Live Session (and emit socket event)
  const startSession = useCallback(async () => {
    if (!title.trim()) return toast.error("Please enter a session title");

    try {
      setIsCreating(true);
      const adminId = (JSON.parse(localStorage.getItem("user")) || {}).id || 1;

      const res = await API.post("/sessions/create", {
        admin_id: adminId,
        title,
        video_url: cleanYouTubeUrl(videoUrl),
      });

      toast.success("Live Session started");
      setTitle("");
      setVideoUrl("");

      const newSession = {
        unique_id: res.data.session_code,
        userurl: res.data.userurl,
        video_url: cleanYouTubeUrl(videoUrl),
        title,
      };

      // ✅ Save locally
      setCurrentSession(newSession);
      setSessions(prev => [
        { id: Date.now(), title, session_code: res.data.session_code, status: "active", created_at: new Date().toISOString() },
        ...prev,
      ]);

      // ✅ Emit to backend (students will get notified in real-time)
      socket.emit("session_started", newSession);

    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to create session");
    } finally {
      setIsCreating(false);
    }
  }, [title, videoUrl]);

  return (
    <div className="p-6 w-full min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex flex-col lg:flex-row items-start gap-6 mb-8"
      >
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            Welcome back, Admin!
          </h1>
          <p className="text-gray-600 text-lg">
            Create Sessions, Manage sessions, users, and settings from here.
          </p>
          <SessionForm
            title={title}
            setTitle={setTitle}
            videoUrl={videoUrl}
            setVideoUrl={setVideoUrl}
            startSession={startSession}
            isCreating={isCreating}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.995, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-96 flex-none"
        >
          <div className="flex flex-row justify-center items-center">
            <img
              src="/main.jpg"
              alt="Admin analytics"
              className="w-auto h-48 object-cover transition-transform transform hover:scale-105"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatsCard title="Total Students" value={stats.totalStudents ?? 0} />
        <StatsCard title="Total Sessions" value={stats.totalSessions ?? 0} />
        <StatsCard title="Active Live Sessions" value={stats.activeSessions ?? 0} />
      </motion.div>

      {/* Live Session */}
      <LiveSessionPreview session={currentSession} />

      {/* Recent Sessions */}
      <RecentSessionsTable sessions={sessions} />
    </div>
  );
}
