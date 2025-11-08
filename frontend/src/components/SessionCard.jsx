// src/components/SessionCard.jsx
import React from "react";
import { FiPlayCircle, FiCode, FiClock } from "react-icons/fi";

export default function SessionCard({ session, onJoin, joining }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-5 hover:border-blue-400">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg text-gray-900">{session.title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            session.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {session.status}
        </span>
      </div>

      {/* Details */}
      <div className="text-sm text-gray-700 space-y-1">
        <p className="flex items-center gap-2">
          <FiCode className="text-blue-500" />
          <span className="font-mono">{session.session_code}</span>
        </p>
        <p className="flex items-center gap-2">
          <FiClock className="text-gray-500" />
          <span className="font-mono">
            Created at:{" "}
            {new Date(session.created_at).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        </p>
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-3">
        {/* Join Button */}
        <button
          onClick={() => onJoin(session)}
          disabled={joining === session.session_code}
          className={`flex-1 flex items-center justify-center gap-2 rounded-md px-4 py-2 font-medium transition-all duration-200 ${
            joining === session.session_code
              ? "bg-green-400/70 text-gray-900 cursor-wait"
              : "bg-green-500 hover:bg-green-600 text-white hover:scale-105"
          }`}
        >
          <FiPlayCircle className="text-white" />
          {joining === session.session_code ? "Joining..." : "Join"}
        </button>

        {/* Open Video Button */}
        <a
          href={`/student/video/${session.session_code}`}
          className="flex-1 flex items-center justify-center text-white bg-blue-500 border border-transparent rounded-md px-4 py-2 font-medium transition-all duration-200 hover:bg-blue-600 hover:border-blue-500 hover:scale-105"
        >
          Open Video
        </a>
      </div>
    </div>
  );
}
