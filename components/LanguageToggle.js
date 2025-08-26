"use client";
import { motion } from "framer-motion";
import { IconButton } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function LanguageToggle() {
  const { lang, switchLang } = useLanguage();
  const { colors } = useTheme(); // ✅ read from context
  const nextLang = lang === "en" ? "es" : "en";

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <IconButton
        onClick={() => switchLang(nextLang)}
        sx={{
          color: colors.accent,
          border: `2px solid ${colors.border}`,
          backgroundColor: colors.background,
          "&:hover": {
            color: colors.hover,
            backgroundColor: colors.hoverBg,
          },
        }}
      >
        <TranslateIcon />
        <span
          style={{
            marginLeft: "4px",
            fontSize: "0.9rem",
            color: colors.text,
          }}
        >
          {lang.toUpperCase()}
        </span>
      </IconButton>
    </motion.div>
  );
}
