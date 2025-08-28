"use client";
import { useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

export default function ResetPasswordPage() {
  const { colors } = useTheme();
  const { t: tAuth } = useTranslation("auth");
  const { resetPassword } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert(tAuth("passwordsDontMatch")); // TODO: replace with toast/snackbar
      return;
    }

    try {
      await resetPassword(newPassword);
      alert(tAuth("passwordUpdatedSuccess")); // ✅ success message
      // optionally redirect: router.push("/login");
    } catch (err) {
      console.error("Reset password failed", err);
      alert(tAuth("resetPasswordFailed")); // ✅ failure message
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: colors.surface,
          maxWidth: 500,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ color: colors.text, fontWeight: "bold" }}
        >
          {tAuth("resetPassword")}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            type="password"
            label={tAuth("newPassword")}
            required
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            type="password"
            label={tAuth("confirmPassword")}
            required
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            {tAuth("updatePassword")}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
