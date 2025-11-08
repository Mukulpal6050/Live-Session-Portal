// /src/components/LogoutModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LogoutModal({ show, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white text-gray-800 rounded-xl shadow-lg p-6 w-[320px]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-lg font-semibold mb-3 text-center">Confirm Logout</h2>
            <p className="text-sm text-gray-500 text-center mb-5">
              Are you sure you want to log out from your account?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
