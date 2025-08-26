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

  // ------------------
  // Auth Actions
  // ------------------
  const login = (email) => {
    setIsLoggedIn(true);
    setUser({ email, name: email.split("@")[0] });
    console.log("Logged in:", email);
  };

  const register = (email, username) => {
    setIsLoggedIn(true);
    setUser({ email, name: username });
    console.log("Registered:", email, username);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    console.log("Logged out");
  };

  // ------------------
  // Password Actions
  // ------------------
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

  return {
    isLoggedIn,
    user,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
  };
}
