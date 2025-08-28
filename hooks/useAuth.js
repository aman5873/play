"use client";
import { useState } from "react";

// Dummy auth hook — replace with real backend integration later
export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const [user, setUser] = useState({
  //   name: "Aman",
  //   email: "aman@email.com",
  // });

  // ---------Auth Actions ---------
  const login = ({ email }) => {
    setIsLoggedIn(true);
    setUser({ email, name: email.split("@")[0] });
    console.log("Logged in:", email);
  };
  const loginWithGoogle = () => {
    setIsLoggedIn(true);
    console.log("LogIn with google");
  };

  const register = (email, username) => {
    setIsLoggedIn(true);
    setUser({ email, name: username });
    console.log("Registered:", email, username);
  };

  const logout = () => {
    console.log("--logout");
    setIsLoggedIn(false);
    setUser(null);
    console.log("Logged out");
  };

  // -------- Password Actions ----------
  const forgotPassword = (email) => {
    // dummy — normally sends reset email
    console.log("Password reset link sent to:", email);
    return true;
  };

  const resetPassword = (newPassword) => {
    // dummy — normally updates via token
    console.log("Password reset to:", newPassword);
    return true;
  };

  const changePassword = (currentPassword, newPassword) => {
    // dummy — normally verifies old password first
    console.log("Password changed:", currentPassword, "→", newPassword);
    return true;
  };
  const verifyOtp = (email, otp) => {
    // dummy — Otp validated
    console.log("Otp validated:", email, "→", otp);
    return true;
  };

  return {
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
  };
}
