// lib/apiConfig.js
import axios from "axios";

export const HOST = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5050";

// ---- Token Helpers ----
export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const setAuthToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const clearAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

// ---- Axios Instance ----
const api = axios.create({
  baseURL: HOST, // your backend API
});

// Request interceptor → attach token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthToken();
      // ❌ maybe trigger logout or login modal
      console.warn("Unauthorized, token removed");
    }
    return Promise.reject(error);
  }
);

export default api;
