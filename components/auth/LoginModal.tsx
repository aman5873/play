"use client";

import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import GoogleIcon from "@mui/icons-material/Google";

import { handleApiMessage, loginUser, fetchProfile } from "@/lib/auth_ops";

import AppModal from "@components/AppModal";
import { useAuth } from "@/context/AuthContext";
import { useAlert } from "@/context/AlertContext";
import InputComp from "../Form/InputComp";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
}

interface FormData {
  email: string;
  password: string;
}

const initFormData: FormData = {
  email: "",
  password: "",
};

export default function LoginModal({
  open,
  onClose,
  onSwitchToRegister,
  onSwitchToForgotPassword,
}: LoginModalProps) {
  const { showAlert } = useAlert();
  const { t: tAuth } = useTranslation("auth");
  const { loginWithGoogle, setUser } = useAuth();

  const [formData, setFormData] = useState(initFormData);

  const handleClose = () => {
    setFormData(initFormData);
    onClose();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      if (res?.success) {
        // 👉 immediately fetch user profile
        const profileRes = await fetchProfile();
        if (profileRes?.data?.user) {
          setUser(profileRes.data.user); // update context
        }

        handleApiMessage(res?.message, showAlert, "success");
        handleClose();
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      console.error("Login failed", err);
      handleApiMessage(tAuth("loginFailed"), showAlert, "error");
    }
  };

  return (
    <AppModal
      open={open}
      onClose={handleClose}
      closeOnBackdropClick={false}
      title={tAuth("loginTitle")}
      subtitle={tAuth("loginSubtitle")}
      description={tAuth("loginDesc")}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputComp
          label={tAuth("email")}
          placeholder={tAuth("emailPlaceholder")}
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <InputComp
          label={tAuth("password")}
          placeholder={tAuth("passwordPlaceholder")}
          type="password"
          required
          showPasswordToggle
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button
          type="submit"
          className="cursor-pointer px-6 py-2 mt-3 rounded-[100px] bg-[var(--primary)] text-[var(--secondary)] font-rajdhani font-bold transition duration-200 hover:shadow-[0_0_4px_var(--primary)]"
        >
          {tAuth("login")}
        </button>
      </form>

      {/* Forgot password link */}
      <div
        className="cursor-pointer font-md text-right hover:text-[var(--textOne)] text-[var(--primary)]"
        onClick={() => {
          handleClose();
          onSwitchToForgotPassword();
        }}
      >
        {tAuth("forgotPassword")}
      </div>

      <div className="text-center">{tAuth("or")}</div>

      <button
        type="button"
        onClick={() => loginWithGoogle()}
        className="cursor-pointer border border-[var(--primary)] flex gap-3 justify-center items-center px-6 py-2 rounded-[100px] bg-[var(--secondary)] text-[var(--primary)] font-rajdhani font-bold transition duration-200 hover:shadow-[0_0_4px_var(--primary)]"
      >
        <GoogleIcon />
        <span>{tAuth("googleLogin")}</span>
      </button>

      <div className="mt-2 text-center">
        <span className="text-[var(--textTwo)] font-md">
          {tAuth("noAccount")}{" "}
          <span
            className="text-[var(--primary)] cursor-pointer hover:text-[var(--textOne)]"
            onClick={() => {
              handleClose();
              onSwitchToRegister();
            }}
          >
            {tAuth("register")}
          </span>
        </span>
      </div>
    </AppModal>
  );
}
