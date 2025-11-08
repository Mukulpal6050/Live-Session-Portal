// /src/components/RecentSessionsTable.jsx
import React from "react";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function RecentSessionsTable({ sessions }) {
  const rowVariant = { hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } };

  const copyCode = (code) => {
    try {
      navigator.clipboard.writeText(code);
      toast.success("Session code copied");
    } catch {
      toast.error("Could not copy");
    }
  };

  if (!sessions || sessions.length === 0) {
    return (
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center text-gray-500">
        No sessions
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <h1  className="text-3xl font-bold text-gray-800 mb-3">Recent Sessions</h1>
      <table className="w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 text-left text-sm text-gray-600">#</th>
            <th className="p-2 text-left text-sm text-gray-600">Title</th>
            <th className="p-2 text-left text-sm text-gray-600">Code</th>
            <th className="p-2 text-left text-sm text-gray-600">Status</th>
            <th className="p-2 text-left text-sm text-gray-600">Created</th>
            <th className="p-2 text-left text-sm text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s, idx) => (
            <motion.tr key={s.id} variants={rowVariant} initial="hidden" animate="show" className={`transition ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50`}>
              <td className="p-2 text-sm">{idx + 1}</td>
              <td className="p-2 text-sm">{s.title}</td>
              <td className="p-2 text-sm  font-mono flex items-center gap-2">
                <span>{s.session_code}</span>
                <button onClick={() => copyCode(s.session_code)} className="text-blue-600 pointer" aria-label="Copy code">
                  <FiCopy />
                </button>
              </td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded-full text-sm ${s.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {s.status || "inactive"}
                </span>
              </td>
              <td className="p-2 text-sm">{s.created_at ? new Date(s.created_at).toLocaleString() : "-"}</td>
              <td className="p-2 text-sm">
                <a href={`/student/video/${s.session_code}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Open</a>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
