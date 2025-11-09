// src/api/api.js
import axios from "axios";
import { logoutUser, getToken } from "../utils/auth";
import { toast } from "react-hot-toast";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // adjust if needed
  timeout: 15000,
});

// Attach token to requests
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response interceptor to handle 401
API.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      // token invalid/expired
      logoutUser();
      toast.error("Session expired — please login again");
      // optional: redirect handled in AuthProvider or ProtectedRoute
    }
    return Promise.reject(err);
  }
);

export default API;
