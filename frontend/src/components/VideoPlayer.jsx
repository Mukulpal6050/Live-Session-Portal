import React from "react";
import ReactPlayer from "react-player";

export default function VideoPlayer({ url }) {
  if (!url) {
    return <p className="text-center text-gray-500">No video available</p>;
  }

  // auto-detect YouTube or direct video
  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  const isHLS = url.endsWith(".m3u8");
  const isMP4 = url.endsWith(".mp4");

  return (
    <div className="w-full h-full">
      {/* ✅ Using ReactPlayer (handles YouTube, Vimeo, mp4, m3u8 all automatically) */}
      <ReactPlayer
        url={url}
        controls
        width="100%"
        height="100%"
        playing={false}
        config={{
          youtube: {
            playerVars: { modestbranding: 1, rel: 0 },
          },
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
      />
    </div>
  );
}
