"use client";

import { useState, MouseEventHandler, useRef } from "react";
import dynamic from "next/dynamic";
import { SquareMenu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LanguageToggle from "../LanguageToggle";
import { useTranslation } from "react-i18next";

import SearchInput from "./Searchinput";
import Avatar from "../auth/Avatar";

const WalletChipComp = dynamic(
  () => import("@/components/screens/wallet/WalletChipComp"),
  { ssr: false }
);

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

interface HeaderProps {
  onMenuClick?: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const {
    isAuthenticated,
    user,
    loginOpen,
    setLoginOpen,
    headerSearchValue,
    setHeaderSearchValue,
  } = useAuth();
  const { t: tCommon } = useTranslation("common");
  const { t: tAuth } = useTranslation("auth");
  const avatarRef = useRef<HTMLDivElement>(null);

  const [registerOpen, setRegisterOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const guestActions = [
    {
      key: "login",
      label: tAuth("login"),
      onClick: () => setLoginOpen(true),
    },
  ];

  return (
    <>
      <header className="h-16 flex items-center justify-end gap-4 px-4 bg-[var(--secondary)] shadow-sm">
        {/* Mobile menu icon */}

        <div className="mr-auto flex gap-2 items-center">
          <div className="lg:hidden mr-auto">
            <div
              onClick={onMenuClick}
              className="text-[var(--primary)] cursor-pointer"
            >
              <SquareMenu size={35} />
            </div>
          </div>
          <div className="hidden md:block">
            <SearchInput
              value={headerSearchValue}
              onChange={setHeaderSearchValue} // Will trigger after debounce
              placeholder={tCommon("search_placeholder")}
            />
          </div>
        </div>

        <WalletChipComp />
        {/* Language toggle */}
        <LanguageToggle />

        {/* Auth / Guest */}
        {isAuthenticated ? (
          <div
            ref={avatarRef}
            className="cursor-pointer "
            onClick={() => setProfileOpen(!profileOpen)}
          >
            {user ? (
              <Avatar user={user} size={40} isHeader={true} />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center bg-[var(--primary)] text-[var(--secondary)] font-bold"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.name?.[0] || user?.email?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
        ) : (
          guestActions.map((item) => (
            <button
              key={item.key}
              onClick={item.onClick}
              className="cursor-pointer px-6 py-1 rounded-[100px] bg-[var(--primary)] text-[var(--secondary)]  transition-colors font-rajdhani font-bold transition-all duration-200 ease-in-out hover:scale-105"
            >
              {item.label}
            </button>
          ))
        )}
      </header>

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
        onSwitchToLogin={() => {
          setForgotOpen(false);
          setLoginOpen(true);
        }}
        onSwitchToRegister={() => {
          setForgotOpen(false);
          setRegisterOpen(true);
        }}
      />
      <ProfileDrawer
        anchorRef={avatarRef}
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </>
  );
}
