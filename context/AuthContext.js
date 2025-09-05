"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

import api, { fetchProfile, logoutUser } from "@/lib/auth_ops";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const loginWithGoogle = useCallback(() => {
    setIsAuthenticated(true);
    console.log("LogIn with google");
  }, []);

  // -------- Password Actions (can stay lightweight) ----------
  const forgotPassword = useCallback((email) => {
    console.log("Password reset link sent to:", email);
    return true;
  }, []);

  const resetPassword = useCallback((newPassword) => {
    console.log("Password reset to:", newPassword);
    return true;
  }, []);

  const verifyOtp = useCallback(async (email, token) => {
    try {
      const response = await api.post("/api/v1/app/verify-email", {
        email,
        token,
      });
      return response?.data;
    } catch (error) {
      console.error(
        "OTP verification failed:",
        error.response?.data || error.message
      );
      throw error;
    }
  }, []);

  const logout = async () => {
    await logoutUser();
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        fetchProfile().then((res) => {
          if (res?.user) {
            setUser(res.user);
          } else {
            // invalid token, cleanup
            localStorage.removeItem("token");
          }
        });
      }
    }

    const handleLogoutEvent = () => setUser(null);
    window.addEventListener("auth-logout", handleLogoutEvent);

    return () => window.removeEventListener("auth-logout", handleLogoutEvent);
  }, []);

  // ✅ Memoize the context value so components don’t re-render unnecessarily
  const value = useMemo(
    () => ({
      isAuthenticated: user ? true : false,
      user,
      setUser,
      loginWithGoogle,
      forgotPassword,
      resetPassword,
      verifyOtp,
      logout,
    }),
    [
      isAuthenticated,
      user,
      setUser,
      loginWithGoogle,
      forgotPassword,
      resetPassword,
      verifyOtp,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
