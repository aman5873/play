"use client";
import { Drawer } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";

export default function AppDrawer({
  open,
  onClose,
  children,
  width = 300,
  height = "100%",
  anchor = "right",
  //   height = "fit-content",
}) {
  const { colors } = useTheme();
  const anchorStyle =
    anchor === "right"
      ? {
          right: 2,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderLeft: `1.5px solid ${colors.border}`,
        }
      : {
          left: 2,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          borderRight: `1.5px solid ${colors.border}`,
        };

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      hideBackdrop={false}
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
          backdropFilter: "blur(2px)",
          color: colors.text,

          //   boxShadow: `0 8px 24px ${colors.accent}33`,

          // 👇 floating top-right style
          position: "absolute",
          top: 2,
          ...anchorStyle,
          height,
          maxHeight: "100vh",
          width,
          margin: "0 auto",
        },
      }}
    >
      {children}
    </Drawer>
  );
}
