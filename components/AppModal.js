"use client";
import { Dialog, DialogTitle, Box } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";

export default function AppModal({
  open,
  onClose,
  title,
  children,
  minWidth = 400,
  maxWidth = 450,
}) {
  const { colors } = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          // boxShadow: `0 2px 10px ${colors.border}55`,
          minWidth,
          maxWidth,
          p: 2,
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

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          px: 3,
          pb: 3,
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
