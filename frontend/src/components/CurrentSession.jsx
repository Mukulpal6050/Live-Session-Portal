// Reusable CurrentSession Video Component
import React from "react";
import { motion } from "framer-motion";
import VideoPlayer from "./VideoPlayer";

export default function CurrentSession({ session }) {
  if (!session) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">🎥 Live Session</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Share this session link with students:{" "}
        <a href={session.userurl} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 underline">
          {session.userurl}
        </a>
      </p>

      <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
        <VideoPlayer url={session.video_url} />
      </div>
    </motion.div>
  );
}
