"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface ProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLDivElement>;
}

export default function ProfileDrawer({
  open,
  onClose,
  anchorRef,
}: ProfileDrawerProps) {
  const { user, logout } = useAuth();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node) &&
        !anchorRef.current?.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose, anchorRef]);

  return (
    <AnimatePresence>
      {open && user && (
        <motion.div
          ref={drawerRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-14 right-4 w-64 bg-[var(--bgTwo)] border border-[var(--borderTwo)]
                     rounded-xl shadow-xl p-4 z-50"
        >
          {/* Close */}
          {/* <button
            onClick={onClose}
            className="absolute top-2 right-2 text-[var(--textTwo)] hover:text-[var(--textOne)]"
          >
            <X size={18} />
          </button> */}

          {/* User Info */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 flex items-center justify-center rounded-full 
                            bg-[var(--primary)] text-[var(--secondary)] font-bold text-lg"
            >
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h3 className="text-[var(--textOne)] font-semibold">
                {user?.name}
              </h3>
              <p className="text-[var(--textTwo)] text-sm">{user?.email}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => alert("Change password")}
              className="px-4 py-2 rounded-[100px] bg-[var(--primary)] text-[var(--secondary)] 
                         font-bold font-rajdhani transition duration-200 hover:shadow-[0_0_4px_var(--primary)] "
            >
              Change Password
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-[100px] border border-[var(--primary)] 
                         text-[var(--primary)] font-bold font-rajdhani hover:bg-[var(--primary)] 
                         hover:text-[var(--secondary)] transition"
            >
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
