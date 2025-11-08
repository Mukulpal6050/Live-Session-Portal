// /src/components/SessionForm.jsx
import React from "react";
import { FiPlayCircle } from "react-icons/fi";

export default function SessionForm({ title, setTitle, videoUrl, setVideoUrl, startSession, isCreating }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row items-start sm:items-end gap-4 w-full max-w-4xl mx-auto">
      
      {/* Session Title */}
      <div className="flex-1 w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Session Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter session title"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Video URL */}
      <div className="flex-1 w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Video URL
        </label>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Start Session Button */}
      <div className="flex-none">
        <button
          onClick={startSession}
          disabled={isCreating}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-white transition 
            ${isCreating ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          <FiPlayCircle size={20} />
          {isCreating ? "Starting..." : "Start Session"}
        </button>
      </div>
    </div>
  );
}
