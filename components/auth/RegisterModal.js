// components/auth/RegisterModal
"use client";
import { useState } from "react";
import { TextField, Divider, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/context/ThemeContext";
import AppModal from "@components/AppModal";
import ButtonComp from "@components/ButtonComp";
import { useAlert } from "@/context/AlertContext";
import { handleApiMessage, registerUser, verifyOtpApi } from "@/lib/auth_ops";
import { maskEmail } from "./ForgotPasswordModal";
import OtpInput from "../OtpInput";

export default function RegisterModal({ open, onClose, onSwitchToLogin }) {
  const { colors } = useTheme();
  const { t: tAuth } = useTranslation("auth");
  // const {  verifyOtp } = useAuth();
  const { showAlert } = useAlert();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);
  const [otp, setOtp] = useState("");

  function clearCloseForm() {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setOtp("");
    onClose();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showAlert(tAuth("passwordMismatch"), "error");
      return;
    }

    registerUser({
      name,
      email,
      password,
      password_confirmation: confirmPassword,
    })
      .then(({ success, message }) => {
        if (success) {
          handleApiMessage(message, showAlert); // will show success
          setShowVerifyOtp(true);
        } else {
          handleApiMessage(message, showAlert); // will show field errors
        }
      })
      .catch((err) => {
        console.error("Register failed", err);
        showAlert(tAuth("registerFailed"), "error");
      });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    verifyOtpApi(email, otp)
      .then(({ success, message }) => {
        if (success) {
          showAlert(message, "success");
          clearCloseForm();
          onSwitchToLogin();
          setShowVerifyOtp(false);
        }
      })
      .catch((err) => {
        console.error("OTP verification failed", err);
        showAlert(tAuth("otpFailed"), "error");
      });
  };

  return (
    <AppModal
      open={open}
      onClose={clearCloseForm}
      title={tAuth("register")}
      showCloseIcon={true}
      closeOnBackdropClick={false}
    >
      {!showVerifyOtp ? (
        <>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <TextField
              label={tAuth("username")}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: colors.border },
                  "&:hover fieldset": { borderColor: colors.accent },
                },
                input: { color: colors.text },
                label: { color: colors.subtitle },
              }}
            />

            {/* Email */}
            <TextField
              label={tAuth("email")}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: colors.border },
                  "&:hover fieldset": { borderColor: colors.accent },
                },
                input: { color: colors.text },
                label: { color: colors.subtitle },
              }}
            />

            {/* Password */}
            <TextField
              label={tAuth("password")}
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: colors.border },
                  "&:hover fieldset": { borderColor: colors.accent },
                },
                input: { color: colors.text },
                label: { color: colors.subtitle },
              }}
            />

            {/* Confirm Password */}
            <TextField
              label={tAuth("confirmPassword")}
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: colors.border },
                  "&:hover fieldset": { borderColor: colors.accent },
                },
                input: { color: colors.text },
                label: { color: colors.subtitle },
              }}
            />

            {/* Submit */}
            <ButtonComp type="submit" label={tAuth("signUp")} />
          </form>

          {/* OR divider */}
          <Divider
            sx={{
              mt: 1,
              "&::before, &::after": { borderColor: colors.border },
              color: colors.subtitle,
            }}
          >
            {tAuth("or")}
          </Divider>

          {/* Already have account? */}
          <Box sx={{ textAlign: "center" }}>
            <span style={{ color: colors.subtitle, fontSize: "0.9rem" }}>
              {tAuth("haveAccount")}{" "}
              <span
                style={{
                  color: colors.accent,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => {
                  clearCloseForm();
                  onSwitchToLogin?.();
                }}
              >
                {tAuth("loginTitle")}
              </span>
            </span>
          </Box>
        </>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <Typography variant="body2" sx={{ color: colors.subtitle, mb: 2 }}>
            {tAuth("otpSentDetail", { email: maskEmail(email) })}
          </Typography>
          <OtpInput length={6} value={otp} onChange={setOtp} />
          <ButtonComp type="submit" label={tAuth("verifyOtp")} />
        </form>
      )}
    </AppModal>
  );
}
