"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const { colors } = useTheme();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info", // "success" | "error" | "warning" | "delete"
  });

  const showAlert = useCallback((message, severity = "info") => {
    setAlert({ open: true, message, severity });
  }, []);

  const closeAlert = () => setAlert((prev) => ({ ...prev, open: false }));

  // Map severity → theme colors
  const getColor = (severity) => {
    switch (severity) {
      case "success":
        return { bg: colors.success, text: colors.background };
      case "error":
        return { bg: colors.error, text: colors.background };
      case "warning":
        return { bg: colors.warning, text: colors.text };
      case "delete":
        return { bg: colors.danger, text: colors.background };
      default:
        return { bg: colors.accent, text: colors.background };
    }
  };

  const { bg, text } = getColor(alert.severity);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={alert.severity === "delete" ? "error" : alert.severity}
          onClose={closeAlert}
          sx={{
            backgroundColor: bg,
            color: text,
            fontWeight: "bold",
            borderRadius: 2,
            boxShadow: `0 4px 12px ${colors.border}`,
          }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
