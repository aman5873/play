"use client";
import { Dialog, DialogTitle, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@/context/ThemeContext";

export default function AppModal({
  open,
  onClose,
  title,
  children,
  minWidth = 400,
  maxWidth = 450,
  showCloseIcon = false,
  closeOnBackdropClick = true,
}) {
  const { colors } = useTheme();

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        // Prevent closing on backdrop click if not allowed
        if (reason === "backdropClick" && !closeOnBackdropClick) return;
        onClose?.();
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: colors.overlay, // dimmed bg
            backdropFilter: "blur(3px)",
          },
        },
      }}
      PaperProps={{
        sx: {
          backgroundColor: colors.surface,
          color: colors.text,
          borderRadius: "1rem",
          minWidth,
          maxWidth,
          p: 2,
          position: "relative", // to place close icon
        },
      }}
    >
      {title && (
        <DialogTitle
          sx={{
            color: colors.title,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "1.5rem",
            mb: 1,
          }}
        >
          {title}
        </DialogTitle>
      )}

      {showCloseIcon && (
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: colors.text,
          }}
        >
          <CloseIcon />
        </IconButton>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          px: 3,
          pb: 3,
        }}
      >
        {children}
      </Box>
    </Dialog>
  );
}
