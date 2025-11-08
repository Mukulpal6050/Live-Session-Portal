import React from "react";

export default function AuthInput({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={
        "w-full bg-white border border-gray-300 rounded-md px-3 py-2 mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 " +
        className
      }
    />
  );
}
