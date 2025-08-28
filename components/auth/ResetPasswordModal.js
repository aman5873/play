"use client";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

import ButtonComp from "@components/ButtonComp";
import AppModal from "@components/AppModal";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

export default function ResetPasswordModal({ open, onClose }) {
  const { colors } = useTheme();
  const { t: tAuth } = useTranslation("auth");
  const { resetPassword } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      // TODO: show toast/snackbar instead
      alert(tAuth("passwordsDontMatch"));
      return;
    }

    try {
      await resetPassword(newPassword);
      onClose();
    } catch (err) {
      console.error("Reset password failed", err);
    }
  };

  return (
    <AppModal open={open} onClose={onClose} title={tAuth("resetPassword")}>
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
            mb: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: colors.border },
              "&:hover fieldset": { borderColor: colors.accent },
            },
            input: { color: colors.text },
            label: { color: colors.subtitle },
          }}
        />

        <ButtonComp type="submit" label={tAuth("updatePassword")} />
      </form>
    </AppModal>
  );
}
