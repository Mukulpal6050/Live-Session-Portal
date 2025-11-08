import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-hot-toast";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    toast.error("Please login first");
    return <Navigate to="/login" replace />;
  }

  return children;
}
