"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail } from "lucide-react";

import AppModal from "@components/AppModal";
import { useTheme } from "@/context/ThemeContext";

import { useAlert } from "@/context/AlertContext";

import {
  handleApiMessage,
  forgotPassword,
  resetPassword,
} from "@/lib/auth_ops";
import OtpInputComp from "../OtpInput";
import InputComp from "../Form/InputComp";
import ResendOtp from "../Form/ResendOtp";

export const maskEmail = (email) => {
  if (!email.includes("@")) return email;
  const [local, domain] = email.split("@");
  return (
    local[0] +
    "*".repeat(Math.max(local.length - 2, 1)) +
    local.slice(-1) +
    "@" +
    domain
  );
};

const initError = {
  password: false,
};

export default function ForgotPasswordModal({
  open,
  onClose,
  onSwitchToLogin,
}) {
  const { showAlert } = useAlert();
  const { colors } = useTheme();
  const { t: tAuth } = useTranslation("auth");

  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(initError);

  console.log("step", step);

  function handleClose() {
    setStep(1);
    setEmail("");
    onClose();
    setOtp("");
    setPassword("");
    setConfirmPassword("");
  }

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    forgotPassword(email)
      .then((res) => {
        if (res?.success) {
          handleApiMessage(res?.message, showAlert, "success");
          setStep(2);
        } else {
          handleApiMessage(res?.message, showAlert);
        }
      })
      .catch((err) => {
        console.error("Forgot password failed", err);
      });
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setStep(3);
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError({ ...error, password: true });
      showAlert("Passwords do not match", "warning");
      return;
    }

    resetPassword(email, otp, password, confirmPassword)
      .then((res) => {
        if (res?.success) {
          handleApiMessage(res?.message, showAlert, "success");
          handleClose();
          onSwitchToLogin();
        } else {
          handleApiMessage(res?.message, showAlert);
        }
      })
      .catch((err) => {
        showAlert("Reset password failed", "error");
      });
  };

  return (
    <AppModal
      open={open}
      onClose={handleClose}
      title={
        step === 1
          ? tAuth("forgotPassword")
          : step === 2
          ? "Verify Email"
          : "Reset Password"
      }
      headerIcon={step === 2 ? <Mail /> : null}
      description={
        step === 2 ? tAuth("otpSentDetail", { email: maskEmail(email) }) : ""
      }
      titleClass="font-rajdhani"
    >
      {step === 1 && (
        <form onSubmit={handleRequestOtp} className="flex flex-col gap-4 mt-4">
          <InputComp
            label={tAuth("email")}
            placeholder={tAuth("emailPlaceholder")}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="cursor-pointer w-full px-6 py-2 mt-3 rounded-[100px] bg-[var(--primary)] text-[var(--secondary)] font-rajdhani font-bold transition duration-200 hover:shadow-[0_0_4px_var(--primary)]"
          >
            {tAuth("sendOtp")}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="mt-3">
          <OtpInputComp length={6} value={otp} onChange={setOtp} />

          <button
            type="submit"
            className="cursor-pointer w-full px-6 py-2 mt-4 rounded-[100px] bg-[var(--primary)] text-[var(--secondary)] font-bold font-rajdhani transition duration-200 hover:shadow-[0_0_4px_var(--primary)]"
          >
            {tAuth("verifyOtp")}
          </button>
          <ResendOtp duration={50} onResend={handleRequestOtp} />
        </form>
      )}

      {step === 3 && (
        <form
          onSubmit={handleResetPassword}
          className="flex flex-col gap-4 mt-3"
        >
          <InputComp
            label={tAuth("newPassword")}
            placeholder={tAuth("passwordPlaceholder")}
            type="password"
            required
            showPasswordToggle
            value={password}
            onChange={(e) => {
              error?.password && setError({ ...error, password: false });
              setPassword(e.target.value);
            }}
          />

          <InputComp
            label={tAuth("confirmPassword")}
            placeholder={tAuth("passwordPlaceholder")}
            type="password"
            required
            showPasswordToggle
            value={confirmPassword}
            onChange={(e) => {
              error?.password && setError({ ...error, password: false });
              setConfirmPassword(e.target.value);
            }}
          />

          <button
            type="submit"
            className="cursor-pointer w-full px-6 py-2 mt-3 rounded-[100px] bg-[var(--primary)] text-[var(--secondary)] font-rajdhani font-bold transition duration-200 hover:shadow-[0_0_4px_var(--primary)]"
          >
            {tAuth("resetPassword")}
          </button>
        </form>
      )}
    </AppModal>
  );
}
