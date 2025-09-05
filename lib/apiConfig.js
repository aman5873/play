import axios from "axios";

export const HOST = process.env.NEXT_PUBLIC_API_URL ?? "http://3.252.220.211";

const api = axios.create({
  baseURL: HOST,
  withCredentials: true, // ✅ include cookies in requests
});

// Optional interceptors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn("Unauthorized — user might need to log in");
      // handle logout state in context if needed
    }
    return Promise.reject(error);
  }
);

export default api;

export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const setUserSession = (user) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("user", JSON.stringify(user));
  }
};

export const clearUserSession = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("user");
  }
};
