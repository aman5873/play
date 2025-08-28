"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const [user, setUser] = useState({
  //   name: "Aman",
  //   email: "aman@email.com",
  // });

  // --------- Auth Actions (memoized) ---------
  const login = useCallback(({ email }) => {
    setIsLoggedIn(true);
    setUser({ email, name: email.split("@")[0] });
    console.log("Logged in:", email);
  }, []);

  const loginWithGoogle = useCallback(() => {
    setIsLoggedIn(true);
    console.log("LogIn with google");
  }, []);

  const register = useCallback((email, username) => {
    setIsLoggedIn(true);
    setUser({ email, name: username });
    console.log("Registered:", email, username);
  }, []);

  const logout = useCallback(() => {
    console.log("--logout");
    setIsLoggedIn(false);
    setUser(null);
    console.log("Logged out");
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

  const changePassword = useCallback((currentPassword, newPassword) => {
    console.log("Password changed:", currentPassword, "→", newPassword);
    return true;
  }, []);

  const verifyOtp = useCallback((email, otp) => {
    console.log("Otp validated:", email, "→", otp);
    return true;
  }, []);

  // ✅ Memoize the context value so components don’t re-render unnecessarily
  const value = useMemo(
    () => ({
      isLoggedIn,
      user,
      login,
      loginWithGoogle,
      register,
      logout,
      forgotPassword,
      resetPassword,
      changePassword,
      verifyOtp,
    }),
    [
      isLoggedIn,
      user,
      login,
      loginWithGoogle,
      register,
      logout,
      forgotPassword,
      resetPassword,
      changePassword,
      verifyOtp,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
