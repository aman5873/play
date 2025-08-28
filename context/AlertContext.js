"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";

const AlertContext = createContext({ showAlert: () => {} });

export function AlertProvider({ children }) {
  const { colors, theme } = useTheme();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info", // "success" | "error" | "warning" | "delete"
  });

  const showAlert = useCallback((message, severity = "info") => {
    setAlert({ open: true, message, severity });
  }, []);

  const closeAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, open: false, message: "" }));
  }, []);

  // ✅ Theme-aware severity colors
  const getColor = (severity) => {
    if (theme === "dark") {
      switch (severity) {
        case "success":
          return { bg: "#2e7d32", text: "#fff" };
        case "error":
          return { bg: "#c62828", text: "#fff" };
        case "warning":
          return { bg: "#ed6c02", text: "#000" };
        case "delete":
          return { bg: "#b71c1c", text: "#fff" };
        default:
          return { bg: "#0288d1", text: "#fff" };
      }
    } else {
      switch (severity) {
        case "success":
          return { bg: "#4caf50", text: "#fff" };
        case "error":
          return { bg: "#f44336", text: "#fff" };
        case "warning":
          return { bg: "#ff9800", text: "#000" };
        case "delete":
          return { bg: "#e53935", text: "#fff" };
        default:
          return { bg: "#2196f3", text: "#fff" };
      }
    }
  };

  const { bg, text } = getColor(alert.severity);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <Snackbar
        open={alert.open}
        autoHideDuration={5000}
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
            // boxShadow: `0 4px 12px ${colors.border}`,
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
