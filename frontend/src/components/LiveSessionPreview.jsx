// /src/components/LiveSessionPreview.jsx
import React from "react";
import VideoPlayer from "./VideoPlayer";

export default function LiveSessionPreview({ session }) {
  if (!session) return null;

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-8 w-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">🎥 Live Session Started</h2>
      <p className="text-sm text-gray-600 mb-3">
        Share this session link with students:{" "}
        <a href={session.userurl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
          {session.userurl}
        </a>
      </p>

      <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-100">
        <VideoPlayer url={session.video_url} />
      </div>
    </div>
  );
}
