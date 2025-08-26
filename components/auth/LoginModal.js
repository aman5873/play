"use client";
import { useState } from "react";
import { TextField, Button, Divider, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import GoogleIcon from "@mui/icons-material/Google";

import { useTheme } from "@/context/ThemeContext";
import AppModal from "@components/AppModal";
import { useAuth } from "@/hooks/useAuth"; // 👈 your auth hook

export default function LoginModal({
  open,
  onClose,
  onSwitchToRegister,
  onSwitchToForgotPassword,
}) {
  const { colors } = useTheme();
  const { t: tAuth } = useTranslation("auth");
  const { login } = useAuth(); // 👈 call login here

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      onClose(); // close modal if success
    } catch (err) {
      console.error("Login failed", err);
      // TODO: show error toast/snackbar
    }
  };

  return (
    <AppModal open={open} onClose={onClose} title={tAuth("loginTitle")}>
      <form onSubmit={handleSubmit}>
        <TextField
          label={tAuth("email")}
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <TextField
          label={tAuth("password")}
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            background: colors.accent,
            color: colors.background,
            fontWeight: "bold",
            mt: 1,
            "&:hover": { background: colors.hover, color: colors.text },
          }}
        >
          {tAuth("submit")}
        </Button>
      </form>

      {/* Forgot password link 👇 */}
      <Box sx={{ textAlign: "right", mt: 1 }}>
        <span
          style={{
            fontSize: "0.85rem",
            color: colors.accent,
            cursor: "pointer",
            fontWeight: "500",
          }}
          onClick={onSwitchToForgotPassword}
        >
          {tAuth("forgotPassword")}
        </span>
      </Box>

      <Divider
        sx={{
          my: 2,
          "&::before, &::after": { borderColor: colors.border },
          color: colors.subtitle,
        }}
      >
        {tAuth("or")}
      </Divider>

      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        sx={{
          borderColor: colors.border,
          color: colors.text,
          py: 1.2,
          "&:hover": {
            borderColor: colors.accent,
            backgroundColor: colors.hoverBg,
          },
        }}
        onClick={() => login("google")}
      >
        {tAuth("googleLogin")}
      </Button>

      <Box sx={{ textAlign: "center", mt: 2 }}>
        <span style={{ color: colors.subtitle, fontSize: "0.9rem" }}>
          {tAuth("noAccount")}{" "}
          <span
            style={{
              color: colors.accent,
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={onSwitchToRegister}
          >
            {tAuth("register")}
          </span>
        </span>
      </Box>
    </AppModal>
  );
}
