"use client";
import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Divider,
  Box,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useTheme } from "@/context/ThemeContext";

export default function RegisterModal({ open, onClose, onSwitchToLogin }) {
  const { colors } = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: colors.background,
          color: colors.text,
          borderRadius: "1rem",
          boxShadow: `0 8px 24px ${colors.border}55`,
          minWidth: "400px",
          p: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          color: colors.title,
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1.5rem",
          mb: 2,
        }}
      >
        Register
      </DialogTitle>

      <Box className="flex flex-col" sx={{ gap: 2, px: 3, pb: 3 }}>
        {/* Inputs */}
        <TextField
          label="Username"
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
          label="Email"
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
          label="Password"
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
          Sign Up
        </Button>

        {/* OR divider */}
        <Divider
          sx={{
            my: 2,
            "&::before, &::after": { borderColor: colors.border },
            color: colors.subtitle,
          }}
        >
          OR
        </Divider>

        {/* Google Register */}
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
        >
          Sign up with Google
        </Button>

        {/* Already have account? */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <span style={{ color: colors.subtitle, fontSize: "0.9rem" }}>
            Already have an account?{" "}
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
              Login
            </span>
          </span>
        </Box>
      </Box>
    </Dialog>
  );
}
