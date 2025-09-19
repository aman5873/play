"use client";

import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Mail } from "lucide-react";

import AppModal from "@components/AppModal";
import { useAlert } from "@/context/AlertContext";
import { handleApiMessage, registerUser, verifyOtpApi } from "@/lib/auth_ops";
import { maskEmail } from "./ForgotPasswordModal";

import InputComp from "../Form/InputComp";
import OtpInputComp from "../OtpInput";
import ResendOtp from "../Form/ResendOtp";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({
  open,
  onClose,
  onSwitchToLogin,
}: RegisterModalProps) {
  const { t: tAuth } = useTranslation("auth");
  const { showAlert } = useAlert();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const clearCloseForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setOtp("");
    onClose();
    setShowVerifyOtp(false);
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | null,
    customMessage?: string
  ) => {
    e?.preventDefault();

    if (password !== confirmPassword) {
      showAlert(tAuth("passwordMismatch"), "error");
      return;
    }

    try {
      const { success, message } = await registerUser({
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      if (success) {
        handleApiMessage(customMessage ?? message, showAlert, "success"); // show success
        setShowVerifyOtp(true);
      } else {
        handleApiMessage(message, showAlert, "error"); // show error
      }
    } catch (err) {
      console.error("Register failed", err);
      handleApiMessage(tAuth("registerFailed"), showAlert, "error");
    }
  };

  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { success, message } = await verifyOtpApi(email, otp);

      if (success) {
        showAlert(message, "success");
        clearCloseForm();
        onSwitchToLogin();
      }
    } catch (err) {
      console.error("OTP verification failed", err);
      showAlert(tAuth("otpFailed"), "error");
    }
  };

  return (
    <AppModal
      open={open}
      onClose={clearCloseForm}
      title={tAuth("register")}
      showCloseIcon
      closeOnBackdropClick={false}
      headerIcon={showVerifyOtp ? <Mail /> : null}
      description={
        showVerifyOtp ? tAuth("otpSentDetail", { email: maskEmail(email) }) : ""
      }
      titleClass="font-rajdhani"
    >
      {!showVerifyOtp ? (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
            <InputComp
              label={tAuth("username")}
              placeholder={tAuth("namePlaceholder")}
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <InputComp
              label={tAuth("email")}
              placeholder={tAuth("emailPlaceholder")}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputComp
              label={tAuth("password")}
              placeholder={tAuth("passwordPlaceholder")}
              type="password"
              required
              showPasswordToggle
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <InputComp
              label={tAuth("confirmPassword")}
              placeholder={tAuth("passwordPlaceholder")}
              type="password"
              required
              showPasswordToggle
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              className="cursor-pointer px-6 py-2 mt-3 rounded-[100px] bg-[var(--primary)] text-[var(--secondary)] font-rajdhani font-bold transition duration-200 hover:shadow-[0_0_4px_var(--primary)]"
            >
              {tAuth("register")}
            </button>
          </form>

          <div className="text-center">{tAuth("or")}</div>

          <div className="mt-2 text-center">
            <span className="text-[var(--textTwo)] font-md">
              {tAuth("haveAccount")}{" "}
              <span
                className="text-[var(--primary)] cursor-pointer hover:text-[var(--textOne)]"
                onClick={() => {
                  clearCloseForm();
                  onSwitchToLogin();
                }}
              >
                {tAuth("login")}
              </span>
            </span>
          </div>
        </>
      ) : (
        <form onSubmit={handleVerifyOtp} className="mt-3">
          <OtpInputComp length={6} value={otp} onChange={setOtp} />
          <button
            type="submit"
            className="cursor-pointer w-full px-6 py-2 mt-4 rounded-[100px] bg-[var(--primary)] text-[var(--secondary)] font-bold font-rajdhani transition duration-200 hover:shadow-[0_0_4px_var(--primary)]"
          >
            {tAuth("verifyOtp")}
          </button>
          <ResendOtp
            duration={50}
            onResend={() => {
              // Manually call handleSubmit without event
              handleSubmit(null, `${tAuth("resendOtpMessage")}`);
            }}
          />
        </form>
      )}
    </AppModal>
  );
}
