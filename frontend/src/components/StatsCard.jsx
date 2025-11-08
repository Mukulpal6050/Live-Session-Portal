// /src/components/StatsCard.jsx
import React from "react";

export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold text-blue-600">{value}</div>
    </div>
  );
}
