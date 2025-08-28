"use client";
import { useState } from "react";
import { TextField, Divider, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/context/ThemeContext";
import AppModal from "@components/AppModal";
import ButtonComp from "@components/ButtonComp";
import { useAuth } from "@/context/AuthContext";
import { useAlert } from "@/context/AlertContext";

export default function RegisterModal({ open, onClose, onSwitchToLogin }) {
  const { colors } = useTheme();
  const { t: tAuth } = useTranslation("auth");
  const { register } = useAuth();
  const { showAlert } = useAlert();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showAlert(tAuth("passwordMismatch"), "error");
      return;
    }

    try {
      await register(name, email, password);
      onClose(); // ✅ close modal if success
    } catch (err) {
      console.error("Register failed", err);
      showAlert(tAuth("registerFailed"), "error");
    }
  };

  return (
    <AppModal open={open} onClose={onClose} title={tAuth("register")}>
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
              onClose();
              onSwitchToLogin?.();
            }}
          >
            {tAuth("loginTitle")}
          </span>
        </span>
      </Box>
    </AppModal>
  );
}
