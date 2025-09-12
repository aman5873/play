"use client";
import { motion } from "framer-motion";
import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      animate={{ rotate: theme === "dark" ? 0 : 180 }}
      transition={{ duration: 0.5 }}
    >
      <IconButton
        onClick={toggleTheme}
        disableRipple
        disableFocusRipple
        sx={{
          color: colors?.accent,
          border: `2px solid ${colors?.border}`,
          backgroundColor: colors?.bg,
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: colors?.hoverBg,
          },
        }}
      >
        {theme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </motion.div>
  );
}
