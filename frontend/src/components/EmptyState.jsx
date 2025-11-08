// src/components/EmptyState.jsx
import React from "react";

export default function EmptyState({ message }) {
  return (
    <div className="text-center text-gray-400 py-12">
      <p>{message || "No data found."}</p>
    </div>
  );
}
