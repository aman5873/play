"use client";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import ButtonComp from "@components/ButtonComp";
import AppModal from "@components/AppModal";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

export default function ChangePasswordModal({ open, onClose }) {
  const { colors } = useTheme();
  const { t: tAuth } = useTranslation("auth");
  const { changePassword } = useAuth();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert(tAuth("passwordsDontMatch"));
      return;
    }

    try {
      await changePassword(oldPassword, newPassword);
      onClose();
    } catch (err) {
      console.error("Change password failed", err);
    }
  };

  return (
    <AppModal open={open} onClose={onClose} title={tAuth("changePassword")}>
      <form onSubmit={handleSubmit}>
        <TextField
          type="password"
          label={tAuth("oldPassword")}
          required
          fullWidth
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
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
        {/* <Button
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
        </Button> */}

        <ButtonComp type="submit" label={tAuth("updatePassword")} />
      </form>
    </AppModal>
  );
}
