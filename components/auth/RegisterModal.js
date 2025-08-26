"use client";
import { TextField, Button, Divider, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import GoogleIcon from "@mui/icons-material/Google";
import { useTheme } from "@/context/ThemeContext";
import AppModal from "@components/AppModal";

export default function RegisterModal({ open, onClose, onSwitchToLogin }) {
  const { colors } = useTheme();
  const { t: tAuth } = useTranslation("auth");

  return (
    <AppModal open={open} onClose={onClose} title={tAuth("register")}>
      {/* Inputs */}
      <TextField
        label={tAuth("username")}
        fullWidth
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: colors.border },
            "&:hover fieldset": { borderColor: colors.accent },
          },
          input: { color: colors.text },
          label: { color: colors.subtitle },
        }}
      />
      <TextField
        label={tAuth("email")}
        fullWidth
        variant="outlined"
        sx={{
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
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: colors.border },
            "&:hover fieldset": { borderColor: colors.accent },
          },
          input: { color: colors.text },
          label: { color: colors.subtitle },
        }}
      />

      {/* Submit */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          background: colors.accent,
          color: colors.background,
          fontWeight: "bold",
          mt: 1,
          "&:hover": {
            background: colors.hover,
            color: colors.text,
          },
        }}
      >
        {tAuth("signUp")}
      </Button>

      {/* OR divider */}
      <Divider
        sx={{
          my: 2,
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
            {tAuth("login")}
          </span>
        </span>
      </Box>
    </AppModal>
  );
}
