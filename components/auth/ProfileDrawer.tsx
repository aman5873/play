"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  Lock,
  LogOut,
  // Wallet
} from "lucide-react"; // icons

import { useTranslation } from "react-i18next";
import ChangePasswordModal from "@components/auth/ChangePasswordModal";
// import EditProfileModal from "./EditProfileModal";
import Avatar from "./Avatar";
import Link from "next/link";

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
  const { t: tAuth } = useTranslation("auth");
  // const { t: tScreen } = useTranslation("screen");
  const { user, logout } = useAuth();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

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

  const menuItems = Boolean(user?.is_guest)
    ? [
        {
          key: "logout",
          label: tAuth("loginAsUser"),
          icon: LogOut,
          onClick: logout,
        },
      ]
    : user?.auth_type === "google"
    ? [
        {
          key: "Profile",
          label: tAuth("profile"),
          icon: User,
          href: "/profile",
        },
        {
          key: "logout",
          label: tAuth("logout"),
          icon: LogOut,
          onClick: logout,
        },
      ]
    : [
        {
          key: "Profile",
          label: tAuth("profile"),
          icon: User,
          href: "/profile",
        },
        {
          key: "changePassword",
          label: tAuth("changePassword"),
          icon: Lock,
          onClick: () => {
            setShowChangePassword(true);
            onClose();
          },
        },
        {
          key: "logout",
          label: tAuth("logout"),
          icon: LogOut,
          onClick: logout,
        },
      ];

  return (
    <>
      <ChangePasswordModal
        open={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />

      <AnimatePresence>
        {open && user && (
          <motion.div
            ref={drawerRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 right-4 w-64 bg-[var(--bgTwo)] border border-[var(--borderTwo)]
                     rounded-xl shadow-xl p-4 z-50"
          >
            {/* User Info */}
            <div className="flex items-center gap-3 mb-4">
              <div>
                <Avatar user={user} size={40} />
              </div>
              <div>
                <h3 className="text-[var(--textOne)] font-semibold line-clamp-1">
                  {user?.name}
                </h3>
                <p className="text-[var(--textTwo)] text-sm line-clamp-1">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Menu Actions */}
            <nav className="flex flex-col gap-2 font-rajdhani font-semibold">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="w-full">
                    {item?.href ? (
                      <Link
                        href={item?.href}
                        onClick={() => {
                          onClose();
                        }}
                        className="flex items-center gap-3 py-2 px-3 rounded-md transition-colors
                      text-[var(--textOne)] hover:text-[var(--primary)] hover:bg-[var(--bgThree)] cursor-pointer"
                      >
                        <span className="w-[25px] h-[25px] flex items-center justify-center rounded-md">
                          <Icon size={18} />
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <button
                        onClick={item?.onClick}
                        className="flex w-full items-center gap-3 py-2 px-3 rounded-md transition-colors
                      text-[var(--textOne)] hover:text-[var(--primary)] hover:bg-[var(--bgThree)] cursor-pointer"
                      >
                        <span className="w-[25px] h-[25px] flex items-center justify-center rounded-md">
                          <Icon size={18} />
                        </span>
                        <span>{item.label}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
