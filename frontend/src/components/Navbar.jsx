import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import LogoutModal from "./LogoutModal";
import NavLinks from "./NavLinks";

// icons
import { FiUser, FiLogOut, FiMenu, FiX, FiCast } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleConfirmLogout = () => {
    try {
      setLoggingOut(true);
      logout();
      toast.success("Logged out successfully");
      nav("/login");
    } catch {
      toast.error("Logout failed");
    } finally {
      setLoggingOut(false);
      setShowLogout(false);
    }
  };

  return (
    <>
      <nav className="bg-blue-600 w-full text-white px-6 py-3 flex items-center justify-between shadow-md">
        {/* Left: Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => nav("/")}
            className="flex items-center gap-2 focus:outline-none"
            aria-label="Go to home"
          >
            {/* Brand icon */}
            <span
              className="flex items-center justify-center w-9 h-9 rounded-md bg-white/10"
              aria-hidden="true"
            >
              <FiCast className="w-5 h-5 text-white" />
            </span>

            <h1
              role="button"
              tabIndex={0}
              className="font-bold text-lg tracking-wide cursor-pointer"
              onKeyDown={(e) => e.key === "Enter" && nav("/")}
            >
              Live Portal
            </h1>
          </button>

          {/* Desktop NavLinks */}
          {user && (
            <div className="hidden md:flex">
              <NavLinks role={user?.role} onLinkClick={() => setMobileMenuOpen(false)} />
            </div>
          )}
        </div>

        {/* Right: User Info */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-3 pr-3 border-r border-white/20">
                <div className="flex flex-col text-right">

                  <div className="flex items-center gap-2">
                    {/* ID / user icon */}
                    <FiUser className="w-4 h-4 text-white/90" aria-hidden="true" />

                    <div className="font-medium text-sm">
                      {user.name || user.email}
                      {/* show id lightly if present */}
                      
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowLogout(true)}
                disabled={loggingOut}
                className="text-sm bg-white text-blue-600 font-medium px-3 py-1.5 rounded hover:bg-gray-100 transition disabled:opacity-60 flex items-center gap-2"
                aria-label="Logout"
              >
                <FiLogOut className="w-4 h-4" aria-hidden="true" />
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <button
              onClick={() => nav("/login")}
              className="bg-white text-blue-600 px-4 py-1 rounded font-medium hover:bg-gray-100 transition"
            >
              Login
            </button>
          )}

          {/* Mobile Hamburger */}
          {user && (
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded hover:bg-blue-500/20 transition"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="bg-blue-600 text-white md:hidden px-6 py-4 flex flex-col gap-2">
          <NavLinks role={user?.role} onLinkClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Logout Modal */}
      <LogoutModal
        show={showLogout}
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowLogout(false)}
      />
    </>
  );
}
