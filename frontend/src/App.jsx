// src/App.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Student
import StudentDashboard from "./pages/student/Dashboard";
import VideoPage from "./pages/student/VideoPage";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";

// Layout without Sidebar
function Layout({ children }) {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const hideRoutes = ["/login", "/register"];
    setShowNavbar(!hideRoutes.includes(location.pathname));
  }, [location.pathname]);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-white">
      {showNavbar && <Navbar />}
      <main className="flex-1 overflow-y-auto bg-gray-800">{children}</main>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/video/:id"
          element={
            <ProtectedRoute allowedRole="student">
              <VideoPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
        
        

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <h1 className="text-center mt-10 text-gray-400">
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
    </Layout>
  );
}
