"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import api, { fetchProfile, logoutUser } from "@/lib/auth_ops";
import Loading from "@/components/common/Loading";
import { usePathname } from "next/navigation";

interface User {
  id?: string;
  name?: string;
  email?: string;
  avatar_url?: string;
  level?: number;
  [key: string]: any;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  loginOpen: boolean;
  setLoginOpen: (open: boolean) => void;
  loginWithGoogle: () => void;
  headerSearchValue: string;
  loading: boolean;
  setLoading: (open: boolean) => void;
  setHeaderSearchValue: (value: string) => void;

  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (newPassword: string) => Promise<boolean>;
  verifyOtp: (email: string, token: string) => Promise<any>;
  logout: () => Promise<void>;
  handleProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);
  const [headerSearchValue, setHeaderSearchValue] = useState<string>("");

  // Google login simulation
  const loginWithGoogle = useCallback(() => {
    setUser({ name: "Google User", email: "googleuser@example.com" });
    sessionStorage.setItem(
      "user",
      JSON.stringify({ name: "Google User", email: "googleuser@example.com" })
    );
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    console.log("Password reset link sent to:", email);
    return true;
  }, []);

  const resetPassword = useCallback(async (newPassword: string) => {
    console.log("Password reset to:", newPassword);
    return true;
  }, []);

  const verifyOtp = useCallback(async (email: string, token: string) => {
    try {
      const response = await api.post("/api/v1/app/verify-email", {
        email,
        token,
      });
      return response?.data;
    } catch (error: any) {
      console.error(
        "OTP verification failed:",
        error.response?.data || error.message
      );
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }, []);

  const handleProfile = useCallback(async () => {
    try {
      const res = await fetchProfile();

      if (res?.data?.user) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } else {
        setUser(null);
        setLoginOpen(true);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch {
      setUser(null);
      setLoginOpen(true);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user on page reload
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoginOpen(true);
      setLoading(false);
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
      handleProfile(); // 👈 always re-validate profile
    } else {
      handleProfile(); // 👈 no stored user, still fetch
    }

    const handleLogoutEvent = () => {
      setUser(null);
      setLoginOpen(true);
      localStorage.removeItem("user");
    };

    window.addEventListener("auth-logout", handleLogoutEvent);
    return () => window.removeEventListener("auth-logout", handleLogoutEvent);
  }, [pathname]);

  const value = useMemo<AuthContextType>(
    () => ({
      isAuthenticated: !!user,
      user,
      setUser,
      loginOpen,
      setLoginOpen,
      headerSearchValue,
      setHeaderSearchValue,
      loading,
      setLoading,
      loginWithGoogle,
      forgotPassword,
      resetPassword,
      verifyOtp,
      logout,
      handleProfile,
    }),
    [
      user,
      loginOpen,
      headerSearchValue,
      loading,
      loginWithGoogle,
      forgotPassword,
      resetPassword,
      verifyOtp,
      logout,
      handleProfile,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <Loading loading={loading} />
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
