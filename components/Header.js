"use client";
import { AppBar, Toolbar, Button } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";

export default function Header() {
  const { t } = useTranslation();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const navItems = [
    { key: "games", label: t("games"), href: "/games" },
    { key: "teams", label: t("teams"), href: "/teams" },
    { key: "tournaments", label: t("tournaments"), href: "/tournaments" },
    { key: "rankings", label: t("rankings"), href: "/rankings" },
    { key: "social", label: t("social"), href: "/social" },
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "var(--background)",
          borderBottom: "2px solid var(--border)",
          boxShadow: "none",
        }}
      >
        <Toolbar className="flex justify-between items-center">
          {/* Brand */}
          <Link href="/" passHref>
            <h1
              style={{
                color: "var(--title)",
                fontSize: "1.5rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {t("brand")}
            </h1>
          </Link>

          {/* Navigation */}
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link key={item.key} href={item.href} passHref>
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
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setLoginOpen(true)}
              sx={{
                color: "var(--accent)",
                "&:hover": { color: "var(--title)" },
              }}
            >
              {t("login")}
            </Button>
            <Button
              onClick={() => setRegisterOpen(true)}
              sx={{
                color: "var(--accent)",
                "&:hover": { color: "var(--title)" },
              }}
            >
              {t("register")}
            </Button>
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </Toolbar>
      </AppBar>

      {/* Popups */}
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
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
    </>
  );
}
