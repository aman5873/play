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

type AlertSeverity = "success" | "error" | "warning" | "info" | "delete";

interface AlertState {
  open: boolean;
  message: string;
  severity: AlertSeverity;
}

interface AlertContextType {
  showAlert: (message: string, severity?: AlertSeverity) => void;
}

const AlertContext = createContext<AlertContextType>({
  showAlert: () => {},
});

interface AlertProviderProps {
  children: ReactNode;
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: "",
    severity: "info",
  });

  const showAlert = useCallback(
    (message: string, severity: AlertSeverity = "info") => {
      setAlert({ open: true, message, severity });
      setTimeout(() => setAlert((prev) => ({ ...prev, open: false })), 4000);
    },
    []
  );

  const closeAlert = () => setAlert((prev) => ({ ...prev, open: false }));

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

  const { bg, text } = colors[alert.severity];
  const Icon = icons[alert.severity];

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <AnimatePresence>
        {alert.open && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 
              px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 
              ${bg} ${text} 
              w-[92%] sm:w-auto max-w-md`}
          >
            {/* Severity Icon */}
            <span className="flex-shrink-0">{Icon}</span>

            {/* Message */}
            <span className="font-bold flex-1">{alert.message}</span>

            {/* Close Button */}
            <button onClick={closeAlert} className="text-inherit">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </AlertContext.Provider>
  );
}

export function useAlert(): AlertContextType {
  return useContext(AlertContext);
}
