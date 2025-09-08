// components/auth/RegisterModal
"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import AppModal from "@components/AppModal";
import { useAlert } from "@/context/AlertContext";
import { handleApiMessage, registerUser, verifyOtpApi } from "@/lib/auth_ops";
import { maskEmail } from "./ForgotPasswordModal";

import InputComp from "../Form/InputComp";
import OtpInputComp from "../OtpInput";

export default function RegisterModal({ open, onClose, onSwitchToLogin }) {
  const { t: tAuth } = useTranslation("auth");
  const { showAlert } = useAlert();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);
  const [otp, setOtp] = useState("");

  function clearCloseForm() {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setOtp("");
    onClose();
    setShowVerifyOtp(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showAlert(tAuth("passwordMismatch"), "error");
      return;
    }

    registerUser({
      name,
      email,
      password,
      password_confirmation: confirmPassword,
    })
      .then(({ success, message }) => {
        if (success) {
          handleApiMessage(message, showAlert, "success"); // will show success
          setShowVerifyOtp(true);
        } else {
          handleApiMessage(message, showAlert, "success"); // will show field errors
        }
      })
      .catch((err) => {
        console.error("Register failed", err);
        showAlert(tAuth("registerFailed"), "error");
      });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    verifyOtpApi(email, otp)
      .then(({ success, message }) => {
        if (success) {
          showAlert(message, "success");
          clearCloseForm();
          onSwitchToLogin();
          setShowVerifyOtp(false);
        }
      })
      .catch((err) => {
        console.error("OTP verification failed", err);
        showAlert(tAuth("otpFailed"), "error");
      });
  };

  return (
    <AppModal
      open={open}
      onClose={clearCloseForm}
      title={tAuth("register")}
      showCloseIcon={true}
      closeOnBackdropClick={false}
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

          {/* Already have account? */}
          <div className="mt-2 text-center">
            <span className="text-[var(--textTwo)] font-md">
              {tAuth("haveAccount")}{" "}
              <span
                className="text-[var(--primary)] cursor-pointer hover:text-[var(--textOne)]"
                onClick={() => {
                  clearCloseForm();
                  onSwitchToLogin?.();
                }}
              >
                {tAuth("loginTitle")}
              </span>
            </span>
          </div>
        </>
      ) : (
        <form onSubmit={handleVerifyOtp} className="mt-3">
          <OtpInputComp
            length={6}
            value={otp}
            onChange={setOtp}
            label={tAuth("otpSentDetail", { email: maskEmail(email) })}
          />

          <button
            type="submit"
            className="cursor-pointer w-full px-6 py-2 mt-4 rounded-[100px] bg-[var(--primary)] text-[var(--secondary)] font-bold font-rajdhani transition duration-200 hover:shadow-[0_0_4px_var(--primary)]"
          >
            {tAuth("verifyOtp")}
          </button>
        </form>
      )}
    </AppModal>
  );
}
