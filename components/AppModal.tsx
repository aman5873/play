"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AppModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  description?: string;
  titleClass?: string;
  contClass?: string;
  children?: ReactNode;
  headerIcon?: ReactNode; // <-- already JSX
  minWidth?: number;
  maxWidth?: number;
  showCloseIcon?: boolean;
  closeOnBackdropClick?: boolean;
}

export default function AppModal({
  open,
  onClose,
  title,
  subtitle,
  description,
  children,
  headerIcon, // JSX element now
  contClass = "w-auto sm:w-[95%] max-w-md",
  showCloseIcon = true,
  closeOnBackdropClick = true,
  titleClass = "font-nyxerin",
}: AppModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => closeOnBackdropClick && onClose()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`relative rounded-[16px] p-6 gradient-one border-[1px] border-[var(--borderThree)] shadow-xl flex flex-col
               ${contClass}`}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {showCloseIcon && (
              <button
                className="absolute top-3 right-3 text-[var(--textOne)] hover:text-[var(--primary)] cursor-pointer"
                onClick={onClose}
              >
                <X size={24} />
              </button>
            )}

            {(title || headerIcon) && (
              <div className="flex items-center flex-col justify-center gap-2">
                {headerIcon && (
                  <div className="bg-[var(--bgTwo)] p-3 rounded-[100px] text-[var(--primary)]">
                    {headerIcon}
                  </div>
                )}
                {title && (
                  <h2
                    className={`text-[var(--textOne)] font-bold text-lg sm:text-xl md:text-2xl lg:text-[24px] text-center ${titleClass}`}
                  >
                    {title}
                  </h2>
                )}
              </div>
            )}

            {subtitle && (
              <h3
                className={`text-[var(--primary)] font-bold text-lg sm:text-xl md:text-2xl lg:text-[24px] text-center mb-2 ${titleClass}`}
              >
                {subtitle}
              </h3>
            )}

            {description && (
              <p className="text-[var(--textTwo)] text-sm text-center mb-4">
                {description}
              </p>
            )}

            {children && <div className="flex flex-col gap-4">{children}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
