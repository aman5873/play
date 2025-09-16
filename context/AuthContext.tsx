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
  user: User | null | boolean | undefined;
  setUser: (user: User | null | boolean | undefined) => void;
  loginOpen: boolean;
  setLoginOpen: (open: boolean) => void;
  loginWithGoogle: () => void;
  headerSearchValue: string;
  setHeaderSearchValue: (value: string) => void;

  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (newPassword: string) => Promise<boolean>;
  verifyOtp: (email: string, token: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | false | undefined>(undefined);
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

  // Fetch user on page reload
  // In AuthProvider
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(false); // ✅ explicitly set to false
      setLoading(false);
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);

      fetchProfile()
        .then((res) => {
          if (res?.data?.user) {
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
          } else {
            setUser(false); // ✅ no valid user found
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        })
        .catch(() => {
          setUser(false); // ✅ error fetching profile → consider as logged out
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        });
    } else {
      fetchProfile()
        .then((res) => {
          if (res?.data?.user) {
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
          } else {
            setUser(false); // ✅ no user
            localStorage.removeItem("token");
          }
        })
        .catch(() => {
          setUser(false); // ✅ fetch failed → logged out
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    }

    const handleLogoutEvent = () => {
      setUser(false);
      localStorage.removeItem("user");
    };

    window.addEventListener("auth-logout", handleLogoutEvent);
    return () => window.removeEventListener("auth-logout", handleLogoutEvent);
  }, []);

  // Auto open login modal when user is explicitly false
  useEffect(() => {
    if (user === false) {
      setLoginOpen(true); // ✅ open login modal
    }
  }, [user]);

  const value = useMemo<AuthContextType>(
    () => ({
      isAuthenticated: !!user,
      user,
      setUser,
      loginOpen,
      setLoginOpen,
      headerSearchValue,
      setHeaderSearchValue,
      loginWithGoogle,
      forgotPassword,
      resetPassword,
      verifyOtp,
      logout,
    }),
    [
      user,
      loginOpen,
      headerSearchValue,
      loginWithGoogle,
      forgotPassword,
      resetPassword,
      verifyOtp,
      logout,
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
