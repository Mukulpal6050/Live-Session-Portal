// src/components/Loader.jsx
import React from "react";

export default function Loader({ size = 8 }) {
  const s = typeof size === "number" ? size : 8;
  return (
    <div className="flex items-center justify-center">
      <div
        style={{ width: `${s}px`, height: `${s}px` }}
        className="border-4 border-t-transparent rounded-full animate-spin border-white/20"
      />
    </div>
  );
}
