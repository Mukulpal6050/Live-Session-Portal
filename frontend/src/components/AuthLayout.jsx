import React from "react";

export default function AuthLayout({ title, children, footer }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[420px] border border-gray-200">
        {title && (
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
            {title}
          </h2>
        )}

        {children}

        {footer && (
          <div className="text-center mt-4 text-sm text-gray-600">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
