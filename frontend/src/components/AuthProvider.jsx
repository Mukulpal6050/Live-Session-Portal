// /src/components/AuthProvider.jsx
import React, { createContext, useEffect, useState } from "react";
import { getToken, getUser, getRole, logoutUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: null,
  role: null,
  token: null,
  setAuth: () => {},
  logout: () => {},
});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(getUser());
  const [role, setRole] = useState(getRole());
  const [token, setToken] = useState(getToken());
  const nav = useNavigate();

  useEffect(() => {
    const handleStorage = () => {
      setUser(getUser());
      setRole(getRole());
      setToken(getToken());
    };

    window.addEventListener("storage", handleStorage);
    handleStorage();

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setAuth = ({ token: t, role: r, user: u }) => {
    setToken(t || null);
    setRole(r || null);
    setUser(u || null);
  };

  const logout = () => {
    logoutUser();
    setAuth({ token: null, role: null, user: null });
    nav("/login");
  };

  return (
    <AuthContext.Provider value={{ user, role, token, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
