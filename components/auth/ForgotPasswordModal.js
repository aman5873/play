"use client";
import { useState } from "react";
import { TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import ButtonComp from "@components/ButtonComp";
import AppModal from "@components/AppModal";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext"; // your auth hook
import { useAlert } from "@/context/AlertContext";
import OtpInput from "../OtpInput";

const maskEmail = (email) => {
  if (!email.includes("@")) return email;
  const [local, domain] = email.split("@");
  return (
    local[0] +
    "*".repeat(Math.max(local.length - 2, 1)) +
    local.slice(-1) +
    "@" +
    domain
  );
};

const initError = {
  password: false,
};

export default function ForgotPasswordModal({ open, onClose }) {
  const { showAlert } = useAlert();
  const { colors } = useTheme();
  const { t: tAuth } = useTranslation("auth");
  const { forgotPassword, verifyOtp, resetPassword } = useAuth();

  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(initError);

  function handleClose() {
    setStep(1);
    setEmail("");
    onClose();
    setOtp("");
    setPassword("");
    setConfirmPassword("");
  }

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setStep(2);
    } catch (err) {
      showAlert("Forgot password failed", "error");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp(email, otp);
      setStep(3);
    } catch (err) {
      showAlert("OTP verification failed", "error");
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError({ ...error, password: true });
      showAlert("Passwords do not match", "warning");
      return;
    }
    try {
      await resetPassword(email, otp, password);
      handleClose(); // ✅ close after success
    } catch (err) {
      showAlert("Reset password failed", "error");
    }
  };

  const inputStyle = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: colors.border },
      "&:hover fieldset": { borderColor: colors.accent },
    },
    input: { color: colors.text },
    label: { color: colors.subtitle },
  };

  return (
    <AppModal open={open} onClose={handleClose} title={tAuth("forgotPassword")}>
      {step === 1 && (
        <form onSubmit={handleRequestOtp}>
          <TextField
            label={tAuth("email")}
            autoFocus
            type="email"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            sx={inputStyle}
          />
          <ButtonComp type="submit" label={tAuth("sendOtp")} />
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <Typography variant="body2" sx={{ color: colors.subtitle, mb: 2 }}>
            {tAuth("otpSentDetail", { email: maskEmail(email) })}
          </Typography>
          <OtpInput length={4} value={otp} onChange={setOtp} />
          <ButtonComp type="submit" label={tAuth("verifyOtp")} />
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <TextField
            label={tAuth("newPassword")}
            type="password"
            autoFocus
            required
            fullWidth
            value={password}
            onChange={(e) => {
              error?.password && setError({ ...error, password: false });
              setPassword(e.target.value);
            }}
            variant="outlined"
            sx={inputStyle}
            error={error?.password}
          />
          <TextField
            label={tAuth("confirmPassword")}
            type="password"
            required
            fullWidth
            value={confirmPassword}
            onChange={(e) => {
              error?.password && setError({ ...error, password: false });
              setConfirmPassword(e.target.value);
            }}
            variant="outlined"
            sx={inputStyle}
            error={error?.password}
          />
          <ButtonComp type="submit" label={tAuth("resetPassword")} />
        </form>
      )}
    </AppModal>
  );
}
