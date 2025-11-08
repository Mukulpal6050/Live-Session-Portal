// /src/components/NavLinks.jsx
import React from "react";
import { NavLink } from "react-router-dom";

export default function NavLinks({ role, onLinkClick }) {
  if (!role) return null;

  const links = [];
  if (role === "admin") {
    links.push(
      { label: "Dashboard", path: "/admin/dashboard" },
    );
  } else if (role === "student") {
    links.push(
      { label: "Dashboard", path: "/student/dashboard" },
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-white">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `hover:text-gray-300 transition font-medium ${isActive ? "underline" : ""}`
          }
          onClick={() => onLinkClick && onLinkClick()}
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}
