"use client";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { useTheme, useMediaQuery } from "@mui/material";

import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useAuth } from "@/context/AuthContext";

// ✅ Dynamic imports
const LoginModal = dynamic(() => import("@/components/auth/LoginModal"), {
  ssr: false,
});
const RegisterModal = dynamic(() => import("@/components/auth/RegisterModal"), {
  ssr: false,
});
const ForgotPasswordModal = dynamic(
  () => import("@/components/auth/ForgotPasswordModal"),
  { ssr: false }
);
const ProfileDrawer = dynamic(() => import("@/components/auth/ProfileDrawer"), {
  ssr: false,
});
const NavigationDrawer = dynamic(
  () => import("@/components/auth/NavigationDrawer"),
  { ssr: false }
);

export default function Header() {
  const { t: tCommon } = useTranslation("common");
  const { t: tAuth } = useTranslation("auth");

  // 🔹 State
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const { isLoggedIn, user } = useAuth();

  // 🔹 Navigation items
  const navItems = [
    { key: "games", label: tCommon("games"), href: "/games" },
    { key: "teams", label: tCommon("teams"), href: "/teams" },
    { key: "tournaments", label: tCommon("tournaments"), href: "/tournaments" },
    { key: "rankings", label: tCommon("rankings"), href: "/rankings" },
    { key: "social", label: tCommon("social"), href: "/social" },
  ];

  // 🔹 Guest actions
  const guestActions = [
    {
      key: "login",
      label: tAuth("loginTitle"),
      onClick: () => setLoginOpen(true),
    },
  ];

  // 🔹 Toggles
  const toggles = (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <ThemeToggle />
      <LanguageToggle />
    </Box>
  );

  return (
    <>
      <AppBar
        className="px-10"
        position="fixed"
        sx={{
          backgroundColor: "var(--background)",
          boxShadow: "none",
        }}
      >
        <Toolbar
          style={{
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {!isDesktop && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {/* Menu Icon */}
                <IconButton
                  onClick={() => setDrawerOpen(true)}
                  sx={{ color: "var(--text)" }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}

            {/* Brand */}
            <Link href="/">
              <h1
                style={{
                  color: "var(--title)",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {tCommon("brand")}
              </h1>
            </Link>
          </Box>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Desktop vs Mobile */}
            {isDesktop && (
              <Box style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {/* Nav Links */}
                {navItems.map((item) => (
                  <Link key={item.key} href={item.href}>
                    <Button
                      sx={{
                        color: "var(--text)",
                        "&:hover": { color: "var(--accent)" },
                      }}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
                {toggles}
              </Box>
            )}

            {/* Auth / Profile */}
            {isLoggedIn ? (
              <IconButton onClick={() => setProfileOpen(true)}>
                <Avatar
                  sx={{
                    backgroundColor: "var(--accent)",
                    color: "var(--background)",
                  }}
                  src={user?.avatarUrl || ""}
                >
                  {user?.name?.[0]?.toUpperCase()}
                </Avatar>
              </IconButton>
            ) : (
              guestActions.map((item) => (
                <Button
                  key={item.key}
                  onClick={item.onClick}
                  sx={{
                    color: "var(--text)",
                    "&:hover": { color: "var(--accent)" },
                  }}
                >
                  {item.label}
                </Button>
              ))
            )}
          </div>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <NavigationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navItems={navItems}
        guestActions={guestActions}
      />

      {/* Modals */}
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
        onSwitchToForgotPassword={() => {
          setLoginOpen(false);
          setForgotOpen(true);
        }}
      />
      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onSwitchToLogin={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />
      <ForgotPasswordModal
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
        onSwitchToReset={() => setForgotOpen(false)}
      />

      {/* Profile Drawer */}
      <ProfileDrawer open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
