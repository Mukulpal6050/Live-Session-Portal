// src/utils/auth.js
// small wrapper around localStorage for auth handling

const TOKEN_KEY = "token";
const ROLE_KEY = "role";
const USER_KEY = "user";

export const saveUser = (token, role, user = null) => {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (role) localStorage.setItem(ROLE_KEY, role);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getRole = () => localStorage.getItem(ROLE_KEY);

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
};

export const isAuthenticated = () => !!getToken();

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(USER_KEY);
};
