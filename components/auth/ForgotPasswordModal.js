"use client";
import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import AppModal from "@components/AppModal";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/hooks/useAuth"; // 👈 your auth hook

export default function ForgotPasswordModal({ open, onClose }) {
  const { colors } = useTheme();
  const { t: tAuth } = useTranslation("auth");
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword(email); // 👈 call auth hook
      setSubmitted(true);
    } catch (err) {
      console.error("Forgot password failed", err);
      // TODO: show error toast/snackbar
    }
  };

  return (
    <AppModal open={open} onClose={onClose} title={tAuth("forgotPassword")}>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <TextField
            label={tAuth("email")}
            type="email"
            required
            fullWidth
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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              background: colors.accent,
              color: colors.background,
              fontWeight: "bold",
              "&:hover": { background: colors.hover, color: colors.text },
            }}
          >
            {tAuth("sendResetLink")}
          </Button>
        </form>
      ) : (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h6" sx={{ color: colors.accent, mb: 1 }}>
            ✅ {tAuth("resetLinkSentTitle")}
          </Typography>
          <Typography variant="body1" sx={{ color: colors.text, mb: 1 }}>
            {tAuth("resetLinkSentDetail", { email: maskEmail(email) })}
          </Typography>
          <Typography variant="body2" sx={{ color: colors.subtitle }}>
            {tAuth("resetLinkHint")}
          </Typography>
        </Box>
      )}
    </AppModal>
  );
}
