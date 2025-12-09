"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import api, {
  fetchProfile,
  guestLoginApi,
  handleApiMessage,
  loginWithGoogleApi,
  logoutUser,
} from "@/lib/auth_ops";
import Loading from "@/components/common/Loading";
import { usePathname } from "next/navigation";
import { useAlert } from "./AlertContext";
import { useTranslation } from "react-i18next";

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
  guestLogin: () => void;
  headerSearchValue: string;
  loading: boolean;
  setLoading: (open: boolean) => void;
  userLoading: boolean;
  setUserLoading: (open: boolean) => void;
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

// 🧾 Define all public routes (add more later if needed)
const publicRoutes = [
  /^\/social\/post\/[^/]+$/, // post detail page
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { showAlert } = useAlert();
  const { t: tCommon } = useTranslation("common");

  const [userLoading, setUserLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);
  const pathname = usePathname();
  const [headerSearchValue, setHeaderSearchValue] = useState<string>("");

  // 🔊 Attach logout listener immediately on mount
  useEffect(() => {
    const handleLogoutEvent = () => {
      setUser(null);
      setLoginOpen(true);
      localStorage.removeItem("user");
    };

    window.addEventListener("auth-logout", handleLogoutEvent);

    return () => {
      window.removeEventListener("auth-logout", handleLogoutEvent);
    };
  }, []);

  // 🧠 Memoize setter
  const resetHeaderSearch = useCallback(() => {
    setHeaderSearchValue("");
  }, []);

  // 🔄 Reset on route change
  useEffect(() => {
    resetHeaderSearch();
  }, [pathname, resetHeaderSearch]);

  //  Google Login Redirect Flow
  const loginWithGoogle = useCallback(async () => {
    try {
      const res = await loginWithGoogleApi();
      if (res?.data?.url) {
        // Redirect user to Google OAuth via backend
        window.location.href = res?.data?.url;
      }
    } catch (error) {
      console.error("Google login redirect failed:", error);
    }
  }, []);

  // Guest Login
  const guestLogin = useCallback(async () => {
    try {
      const res = await guestLoginApi();
      if (res?.success) {
        if (res?.data?.token && res?.data?.user) {
          localStorage.setItem("tokenExpiry", res?.data?.expires_in);
          localStorage.setItem("token", res?.data?.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("guestId", res.data.user?.id);
          sessionStorage.setItem("user", JSON.stringify(res.data.user));
          setUser(res?.data?.user);
          setLoginOpen(false);
        }

        handleApiMessage(res?.message, showAlert, "success");
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (error) {
      console.error("Guest login redirect failed:", error);
    }
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
      } else if (!res?.success) {
        showAlert(res?.message ?? "Unauthorized : Please Login", "error", 8000);
        setUser(null);
        // setLoginOpen(true);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch {
      setUser(null);
      // setLoginOpen(true);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
      setUserLoading(false);
    }
  }, []);

  // ✅ Handle Google OAuth redirect callback (if URL has ?token)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const error = urlParams.get("error");
    let errorMessage = "";
    if (error === "use_email_login") {
      errorMessage = tCommon("messages.useEmailLogin");
    } else if (error === "guest_not_allowed") {
      errorMessage = tCommon("messages.guestNotAllowed");
    }
    if (errorMessage) {
      showAlert(errorMessage, "error", 8000);
      setLoginOpen(true);
    }

    if (token) {
      localStorage.setItem("token", token);
      // Clean the URL (remove ?token param)
      window.history.replaceState({}, document.title, window.location.pathname);
      handleProfile(); // fetch user info immediately
    }
  }, [handleProfile]);

  // Fetch user on page reload
  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ Check if current pathname matches any public route
    const isPublicRoute = publicRoutes.some((regex) =>
      regex.test(pathname || "")
    );

    if (isPublicRoute) {
      setLoading(false);
      setUserLoading(false);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      return; // 🚫 Skip auth check completely
    }

    if (!token) {
      setUser(null);
      // setLoginOpen(true);

      setLoading(false);
      setUserLoading(false);
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
      setUserLoading(false);
      // handleProfile();
    } else {
      handleProfile();
    }

    const handleLogoutEvent = () => {
      setUser(null);
      setLoginOpen(true);
      localStorage.removeItem("user");
    };

    window.addEventListener("auth-logout", handleLogoutEvent);
    return () => window.removeEventListener("auth-logout", handleLogoutEvent);
  }, [handleProfile]);

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
      userLoading,
      setUserLoading,
      loginWithGoogle,
      guestLogin,
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
      userLoading,
      loginWithGoogle,
      guestLogin,
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
