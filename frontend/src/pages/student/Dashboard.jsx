import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { fetchSessions, joinSession } from "../../api/sessionAPI";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
import SessionCard from "../../components/SessionCard";
import { AuthContext } from "../../components/AuthProvider";
import { motion } from "framer-motion";
import io from "socket.io-client";

// ✅ Connect socket to backend
const socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:5000");

export default function StudentDashboard() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(null);
  const { user } = useContext(AuthContext);

  // ✅ Fetch sessions when page loads
  useEffect(() => {
    const loadSessions = async () => {
      try {
        const all = await fetchSessions();
        const active = all.filter((s) => s.status === "active");
        setSessions(active);
      } catch (err) {
        toast.error("Could not load sessions");
      } finally {
        setLoading(false);
      }
    };
    loadSessions();
  }, []);

  // ✅ Listen to socket event for new sessions
  useEffect(() => {
    socket.on("session_started", (newSession) => {
      toast.success(`🎥 New Live Session Started: ${newSession.title}`);
      setSessions((prev) => [newSession, ...prev]);
    });

    return () => {
      socket.off("session_started");
    };
  }, []);

  // ✅ Join Session
  const handleJoin = async (session) => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = storedUser?.id || user?.id || user?._id;

    if (!userId) {
      toast.error("Please login first");
      return;
    }

    setJoining(session.session_code);
    try {
      await joinSession(session.session_code, userId);
      toast.success("Joined successfully!");
      window.location.href = `/student/video/${session.session_code}`;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Cannot join session");
    } finally {
      setJoining(null);
    }
  };

  // ✅ Render sessions
  const renderSessions = () => {
    if (loading) return <Loader text="Fetching active sessions..." />;

    if (sessions.length === 0)
      return (
        <EmptyState message="No active sessions right now. Please wait for the admin to start a session." />
      );

    return (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {sessions.map((s) => (
          <SessionCard
            key={s.session_code}
            session={s}
            onJoin={handleJoin}
            joining={joining}
          />
        ))}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12">
      {/* Hero Section */}
      <motion.div
        className="flex flex-col lg:flex-row justify-center items-center min-h-[75vh] px-6 gap-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Text */}
        <motion.div
          className="lg:w-1/2 flex flex-col justify-center"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-[42px] md:text-[55px] lg:text-[70px] font-bold leading-tight">
            Welcome to <span className="text-blue-600">LiveClass Portal</span>
            {user?.name ? `, ${user.name}` : ""}!
          </h1>
          <p className="text-gray-500 text-base mt-2">
            Learn LIVE. Practice LIVE. Grow LIVE.
          </p>

          <p className="text-gray-700 text-lg mt-4">
            Your gateway to live online classes, real-time attendance tracking,
            and interactive learning.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          className="lg:w-1/2 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src="/main.jpg"
            alt="LiveClass Illustration"
            className="max-w-[350px] h-auto rounded-2xl shadow-xl border-4 border-white"
          />
        </motion.div>
      </motion.div>

      {/* Info Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {["Upcoming Sessions", "Recent Attendance", "Active Sessions"].map(
          (t, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-all hover:scale-[1.02] border border-gray-100"
              whileHover={{ y: -5 }}
            >
              <h2 className="text-xl font-semibold mt-1">{t}</h2>
            </motion.div>
          )
        )}
      </motion.div>

      {/* Active Sessions */}
      <div className="px-6 pb-20">
        <h2 className="text-2xl font-bold mb-3">🖥️ Active Live Sessions</h2>
        <p className="text-gray-600 mb-6">
          Click “Join” or “Open Video” to watch the session with full controls.
        </p>
        {renderSessions()}
      </div>
    </div>
  );
}
