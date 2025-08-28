"use client";
import { useRef } from "react";
import { Box, TextField } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";

export default function OtpInput({ length = 6, value, onChange }) {
  const inputsRef = useRef([]);
  const { colors } = useTheme();

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (/[^0-9]/.test(val)) return; // only numbers

    const otpArray = value.split("");
    otpArray[index] = val;
    const newValue = otpArray.join("");
    onChange(newValue);

    // auto focus next
    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text").slice(0, length);
    if (!/^\d+$/.test(pasteData)) return;

    const otpArray = pasteData.split("");
    const newValue = otpArray.join("").padEnd(length, "");
    onChange(newValue);

    // focus last filled input
    inputsRef.current[Math.min(pasteData.length, length - 1)]?.focus();
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: colors.border },
      "&:hover fieldset": { borderColor: colors.accent },
    },
    input: {
      color: colors.text,
      textAlign: "center",
      fontSize: "1.5rem",
      width: "3rem",
    },
  };

  return (
    <Box display="flex" gap={1} justifyContent="center" onPaste={handlePaste}>
      {Array.from({ length }).map((_, i) => (
        <TextField
          key={i}
          inputRef={(el) => (inputsRef.current[i] = el)}
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          variant="outlined"
          sx={inputStyle}
          inputProps={{ maxLength: 1 }}
        />
      ))}
    </Box>
  );
}
