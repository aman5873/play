"use client";
import { motion } from "framer-motion";
import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      animate={{ rotate: theme === "dark" ? 0 : 180 }}
      transition={{ duration: 0.5 }}
    >
      <IconButton
        onClick={toggleTheme}
        sx={{
          color: "var(--accent)",
          border: "2px solid var(--border)",
          backgroundColor: "var(--bg)",
          "&:hover": { backgroundColor: "var(--subtitle)" },
        }}
      >
        {theme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </motion.div>
  );
}
