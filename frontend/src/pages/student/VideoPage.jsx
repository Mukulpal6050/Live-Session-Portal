// src/pages/student/VideoPage.jsx
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";
import { toast } from "react-hot-toast";
import ReactPlayer from "react-player";
import Hls from "hls.js";
import { FiCode, FiCheckCircle, FiSearch } from "react-icons/fi";
import Loader from "../../components/Loader";
import { motion } from "framer-motion";

export default function VideoPage() {
  const { id: session_code } = useParams();
  const nav = useNavigate();
  const [session, setSession] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState(null);
  const [streamUrl, setStreamUrl] = useState("");
  const videoRef = useRef(null);

  // UI states
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.id) setStudentId(user.id);
    loadSession();
    // eslint-disable-next-line
  }, [session_code]);

  const isYouTubeOrMP4 = (url) => {
    if (!url || typeof url !== "string") return false;
    return (
      url.includes("youtube.com") ||
      url.includes("youtu.be") ||
      url.endsWith(".mp4")
    );
  };

  const cleanYouTubeUrl = (url) => {
    if (!url || (!url.includes("youtube.com") && !url.includes("youtu.be")))
      return url;
    const match = url.match(/v=([a-zA-Z0-9_-]{11})/);
    if (match) return `https://www.youtube.com/watch?v=${match[1]}`;
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) return `https://www.youtube.com/watch?v=${shortMatch[1]}`;
    return url;
  };

  const loadSession = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/sessions/${session_code}`);
      setSession(res.data);
      setStreamUrl(cleanYouTubeUrl(res.data.video_url));

      // join attendance silently if user present
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const uid = user?.id;
      if (uid) {
        try {
          await API.post("/sessions/join", {
            session_code,
            student_id: uid,
          });
          setStudentId(uid);
        } catch (err) {
          // ignore join error
        }
      }

      try {
        const att = await API.get(`/attendance/${session_code}`);
        if (Array.isArray(att.data)) setAttendance(att.data);
      } catch (err) {
        // ignore attendance fetch error
      }
    } catch (err) {
      console.error("Error fetching session:", err);
      toast.error("Session not found");
    } finally {
      setLoading(false);
    }
  };

  // HLS setup (unchanged logic)
  useEffect(() => {
    if (!streamUrl || isYouTubeOrMP4(streamUrl)) return;
    const video = videoRef.current;
    let hls;

    if (video) {
      if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: true, lowLatencyMode: true });
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {});
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = streamUrl;
        video.addEventListener("loadedmetadata", () => {
          video.play().catch(() => {});
        });
      }
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [streamUrl]);

  const handleLeave = useCallback(async () => {
    if (!studentId) {
      toast.error("Login required to leave");
      return;
    }
    try {
      const res = await API.post("/attendance/leave", {
        student_id: studentId,
        session_code,
      });
      toast.success(res.data.message || "Leave recorded");
      nav("/student/dashboard");
    } catch (err) {
      console.error("Leave error:", err);
      toast.error("Could not record leave");
    }
  }, [studentId, session_code, nav]);

  // Attendance filtering + pagination
  const filteredAttendance = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return attendance;
    return attendance.filter((a) => {
      const name = (a.name || "").toLowerCase();
      const email = (a.email || "").toLowerCase();
      return name.includes(q) || email.includes(q);
    });
  }, [attendance, query]);

  const totalPages = Math.max(1, Math.ceil(filteredAttendance.length / PAGE_SIZE));
  useEffect(() => {
    if (page > totalPages) setPage(1);
    // eslint-disable-next-line
  }, [totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredAttendance.slice(start, start + PAGE_SIZE);
  }, [filteredAttendance, page]);

  if (loading) return <Loader />;

  if (!session)
    return (
      <div className="p-6 text-red-500 text-center">Session not found</div>
    );

  const presentCount = attendance.length;
  const totalCount = attendance.length; // If separate totals exist, replace accordingly.

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="p-4 min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900"
    >
      <div className="mb-6 text-gray-600 text-lg">
        Dashboard /{" "}
        <span className="text-gray-900 text-2xl font-bold">{session.title}</span>
      </div>

      <div className="w-full mx-auto flex flex-col lg:flex-row gap-6">
        {/* Video card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.995, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-1/2 flex-1 relative rounded-2xl overflow-hidden shadow-sm bg-white border border-gray-200"
        >
          {session.status === "active" && (
            <div className="absolute top-3 left-3 bg-red-600 px-2 py-1 rounded text-xs font-bold z-10 animate-pulse text-white">
              LIVE
            </div>
          )}

          {/* Video player area */}
          <div className="w-full bg-black">
            {streamUrl ? (
              isYouTubeOrMP4(streamUrl) ? (
                <ReactPlayer
                  url={streamUrl}
                  controls
                  muted
                  playing
                  width="100%"
                  height="500px"
                />
              ) : (
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full"
                  style={{ maxHeight: "500px", backgroundColor: "#000" }}
                />
              )
            ) : (
              <div className="text-center text-gray-500 p-6">No video available.</div>
            )}
          </div>

          {/* small controls / meta below video */}
          <div className="p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 rounded bg-gray-50 text-sm text-gray-700 border border-gray-200">
                <FiCode className="inline mr-2" /> {session.session_code}
              </span>
              <span
                className={`px-2 py-1 rounded text-sm font-semibold ${
                  session.status === "active" ? "text-green-700 bg-green-50 border border-green-100" : "text-red-700 bg-red-50 border border-red-100"
                }`}
              >
                {session.status.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLeave}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-md font-medium transition transform hover:scale-[1.03] hover:bg-blue-700 shadow-sm"
                aria-label="Leave session"
              >
                Leave
              </button>
              {session.userurl && (
                <a
                  href={session.userurl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-3 py-1.5 rounded-md bg-white border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 shadow-sm"
                >
                  Open Raw Link
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Right info column */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="lg:w-1/2 flex-1 space-y-4"
        >
          {/* Session info */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <h1 className="text-2xl font-bold mb-2 text-gray-900">{session.title}</h1>

            <p className="flex items-center gap-2 text-gray-700 mb-2">
              <FiCode /> Code: <span className="font-mono">{session.session_code}</span>
            </p>

            <p className="flex items-center gap-2 text-gray-700 mb-2">
              <FiCheckCircle /> Status:{" "}
              <span className={session.status === "active" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                {session.status.toUpperCase()}
              </span>
            </p>

            <p className="text-sm text-gray-600">Instructor: <span className="text-gray-800 font-medium">{session.instructor_name || session.owner || "—"}</span></p>
          </div>

          {/* Attendance with search + pagination */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3 gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Attendance</h2>
                <p className="text-sm text-gray-500">
                  Present: <span className="font-medium text-gray-700">{presentCount}</span>
                  {totalCount ? <span className="ml-3 text-sm text-gray-400">• total {totalCount}</span> : null}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-2 text-gray-400" />
                  <input
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                    placeholder="Search name or email..."
                    className="pl-10 pr-3 py-2 rounded-md border border-gray-200 bg-white text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-300"
                    aria-label="Search attendance"
                  />
                </div>
              </div>
            </div>

            {/* Table (desktop) */}
            <div className="hidden lg:block">
              {filteredAttendance.length === 0 ? (
                <div className="text-gray-500 py-4">No attendance records found.</div>
              ) : (
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="text-gray-700 border-b border-gray-200">
                    <tr>
                      <th className="py-2 px-2 w-12">#</th>
                      <th className="px-2">Name</th>
                      <th className="px-2">Email</th>
                      <th className="px-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageItems.map((a, i) => (
                      <tr key={a.id || `${a.email}-${i}`} className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}>
                        <td className="py-2 px-2">{(page - 1) * PAGE_SIZE + i + 1}</td>
                        <td className="px-2 py-2 text-gray-900">{a.name}</td>
                        <td className="px-2 py-2 text-gray-600">{a.email}</td>
                        <td className="px-2 py-2">{a.duration || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden space-y-2">
              {filteredAttendance.length === 0 ? (
                <div className="text-gray-500 py-4">No attendance records found.</div>
              ) : (
                pageItems.map((a, i) => (
                  <div key={a.id || `${a.email}-${i}`} className="p-3 rounded-md border border-gray-100 bg-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{a.name}</div>
                        <div className="text-sm text-gray-600">{a.email}</div>
                      </div>
                      <div className="text-sm text-gray-500">{a.duration || "—"}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{filteredAttendance.length === 0 ? 0 : Math.min(filteredAttendance.length, (page - 1) * PAGE_SIZE + 1)}</span> -
                <span className="font-medium"> {Math.min(filteredAttendance.length, page * PAGE_SIZE)}</span> of <span className="font-medium">{filteredAttendance.length}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 text-white py-1 rounded-md border border-gray-200 bg-white text-sm disabled:opacity-50"
                >
                  Prev
                </button>
                <div className="px-3 py-1 text-sm text-gray-700">{page} / {totalPages}</div>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 text-white py-1 rounded-md border border-gray-200 bg-white text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
