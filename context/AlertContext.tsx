"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  JSX,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

// ----------------------
// Types
// ----------------------
type AlertSeverity = "success" | "error" | "warning" | "info" | "delete";

interface AlertState {
  open: boolean;
  message: string;
  severity: AlertSeverity;
}

interface ConfirmState {
  open: boolean;
  message: string;
  type: AlertSeverity;
  actions: { label: string; onClick?: () => void }[];
}

interface AlertContextType {
  showAlert: (
    message: string,
    severity?: AlertSeverity,
    timeout?: number
  ) => void;

  confirmAlert: (opts: {
    message: string;
    type?: AlertSeverity;
    actions?: { label: string; onClick?: () => void }[];
    autoClose?: number | false;
  }) => void;
}

interface ConfirmAlertOptions {
  message: string;
  type?: AlertSeverity;
  actions?: { label: string; onClick?: () => void }[];
  autoClose?: number | false;
}

const AlertContext = createContext<AlertContextType>({
  showAlert: () => {},
  confirmAlert: () => {},
});

// ----------------------
// Provider
// ----------------------
export function AlertProvider({ children }: { children: ReactNode }) {
  // OLD ALERT: do NOT modify
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: "",
    severity: "info",
  });

  // NEW: Confirm alert (separate state)
  const [confirm, setConfirm] = useState<ConfirmState>({
    open: false,
    message: "",
    type: "warning",
    actions: [],
  });

  // --------------------------
  // showAlert — DO NOT CHANGE
  // --------------------------
  const showAlert = useCallback(
    (
      message: string,
      severity: AlertSeverity = "info",
      timeout: number = 4000
    ) => {
      setAlert({ open: true, message, severity });

      if (Number.isInteger(timeout) && timeout > 0) {
        setTimeout(() => {
          setAlert((prev) => ({ ...prev, open: false }));
        }, timeout);
      }
    },
    []
  );

  // --------------------------
  // confirmAlert (full new logic)
  // --------------------------
  const confirmAlert = useCallback(
    ({
      message,
      type = "warning",
      actions = [],
      autoClose = 5000,
    }: ConfirmAlertOptions) => {
      setConfirm({
        open: true,
        message,
        type: type as AlertSeverity, // ← fixes TS warning
        actions,
      });

      if (autoClose && autoClose > 0) {
        setTimeout(() => {
          setConfirm((prev) => ({ ...prev, open: false }));
        }, autoClose);
      }
    },
    []
  );

  const closeConfirm = () => setConfirm((prev) => ({ ...prev, open: false }));

  // styling for confirm only
  const colors: Record<AlertSeverity, { bg: string; text: string }> = {
    success: { bg: "bg-[#1d332b]", text: "text-[#fbffe6]" },
    error: { bg: "bg-[#e23939]", text: "text-[#fbffe6]" },
    warning: { bg: "bg-[#ff5a27]", text: "text-[#0d1914]" },
    info: { bg: "bg-[#2a3025]", text: "text-[#fbffe6]" },
    delete: { bg: "bg-[#5c0000]", text: "text-[#fbffe6]" },
  };

  const icons: Record<AlertSeverity, JSX.Element> = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    delete: <XCircle className="w-5 h-5" />,
  };

  return (
    <AlertContext.Provider value={{ showAlert, confirmAlert }}>
      {children}

      {/* ------------------------------ */}
      {/* OLD ALERT – UNTOUCHED UI       */}
      {/* ------------------------------ */}
      <AnimatePresence>
        {alert.open && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-[200] px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 
              ${colors[alert.severity].bg} ${colors[alert.severity].text}
              w-[92%] sm:w-auto max-w-md`}
          >
            <span>{icons[alert.severity]}</span>
            <span className="font-bold flex-1 whitespace-pre-line">
              {alert.message}
            </span>
            <X
              className="w-4 h-4 cursor-pointer"
              onClick={() => setAlert((prev) => ({ ...prev, open: false }))}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------ */}
      {/* NEW CONFIRM ALERT (modal)      */}
      {/* ------------------------------ */}
      <AnimatePresence>
        {confirm.open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[220]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeConfirm}
            />

            {/* Confirm Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`fixed top-24 left-1/2 -translate-x-1/2 z-[230]
                px-5 py-4 rounded-xl shadow-xl flex flex-col w-[92%] sm:w-auto max-w-md
                ${colors[confirm.type].bg} ${colors[confirm.type].text}`}
            >
              <div className="flex items-center gap-3">
                {icons[confirm.type]}
                <span className="font-semibold whitespace-pre-line flex-1">
                  {confirm.message}
                </span>
                <X className="w-4 h-4 cursor-pointer" onClick={closeConfirm} />
              </div>

              {/* actions */}
              <div className="flex justify-end gap-3 mt-4">
                {confirm.actions.map((a, i) => (
                  <button
                    key={i}
                    className="px-3 py-1 rounded bg-black/20 hover:bg-black/30 text-sm font-semibold"
                    onClick={() => {
                      closeConfirm();
                      a.onClick?.();
                    }}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
