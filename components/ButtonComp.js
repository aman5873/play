"use client";
import React from "react";
import { Button } from "@mui/material";

import { useTheme } from "@/context/ThemeContext";

export default function ButtonComp({
  label,
  onClick = null,
  type = "button",
  variant = "contained",
  style = {},
  startIcon,
}) {
  const { colors } = useTheme();
  if (label)
    return (
      <Button
        type={type}
        onClick={(e) => onClick && onClick(e)}
        variant={variant}
        fullWidth
        startIcon={startIcon}
        sx={{
          background: colors.accent,
          color: colors.background,
          fontWeight: "bold",
          mt: 1,
          borderRadius: 2,
          "&:hover": {
            background: colors.hover,
          },
          ...style,
        }}
      >
        {label}
      </Button>
    );
}
