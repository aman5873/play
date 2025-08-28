"use client";
import { useState } from "react";
import { TextField, Button, Divider, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import GoogleIcon from "@mui/icons-material/Google";

import ButtonComp from "@components/ButtonComp";
import { useTheme } from "@/context/ThemeContext";
import AppModal from "@components/AppModal";
import { useAuth } from "@/context/AuthContext"; // 👈 your auth hook

const initFormData = {
  email: "",
  password: "",
};
export default function LoginModal({
  open,
  onClose,
  onSwitchToRegister,
  onSwitchToForgotPassword,
}) {
  const { colors } = useTheme();
  const { t: tAuth } = useTranslation("auth");
  const { login, loginWithGoogle } = useAuth(); // 👈 call login here

  const [formData, setFormData] = useState(initFormData);

  function handleClose() {
    setFormData(initFormData);
    onClose();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData);
      handleClose(); // close modal if success
    } catch (err) {
      console.error("Login failed", err);
      // TODO: show error toast/snackbar
    }
  };

  return (
    <AppModal open={open} onClose={handleClose} title={tAuth("loginTitle")}>
      <form onSubmit={handleSubmit}>
        <TextField
          label={tAuth("email")}
          type="email"
          fullWidth
          required
          value={formData?.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          value={formData?.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
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
        <ButtonComp type="submit" label={tAuth("loginTitle")} />
      </form>

      {/* Forgot password link 👇 */}
      <Box sx={{ textAlign: "right" }}>
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
          mb: 1,
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
            color: colors.background,
            backgroundColor: colors.hover,
          },
        }}
        onClick={() => loginWithGoogle()}
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
