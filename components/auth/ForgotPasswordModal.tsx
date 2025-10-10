"use client";

import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Mail } from "lucide-react";

import AppModal from "@components/AppModal";
import InputComp from "../Form/InputComp";
import OtpInputComp from "../OtpInput";
import ResendOtp from "../Form/ResendOtp";
import { useAlert } from "@/context/AlertContext";
import {
  handleApiMessage,
  forgotPassword,
  resetPassword,
} from "@/lib/auth_ops";

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSwitchToRegister?: () => void;
}

// Utility to mask email
export const maskEmail = (email: string) => {
  if (!email.includes("@")) return email;
  const [local, domain] = email.split("@");
  return `${local[0]}${"*".repeat(Math.max(local.length - 2, 1))}${local.slice(
    -1
  )}@${domain}`;
};

const initError = {
  password: "",
  confirm: "",
};

export default function ForgotPasswordModal({
  open,
  onClose,
  onSwitchToLogin,
  onSwitchToRegister,
}: ForgotPasswordModalProps) {
  const { t: tAuth } = useTranslation("auth");
  const { showAlert } = useAlert();

  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(initError);

  const handleClose = () => {
    setStep(1);
    setEmail("");
    setOtp("");
    setPassword("");
    setConfirmPassword("");
    setError(initError);
    onClose();
  };

  // Step 1: Request OTP
  const handleRequestOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await forgotPassword(email);
      if (res?.success) {
        handleApiMessage(res.message, showAlert, "success");
        setStep(2);
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      console.error("Forgot password failed", err);
      handleApiMessage("Forgot password failed", showAlert, "error");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(3);
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const checks = [
      { regex: /[A-Z]/, msg: tAuth("validation.uppercaseLetter") },
      { regex: /[a-z]/, msg: tAuth("validation.lowercaseLetter") },
      { regex: /[0-9]/, msg: tAuth("validation.number") },
      { regex: /[!@#$%^&*(),.?":{}|<>]/, msg: tAuth("validation.specialChar") },
      { regex: /.{8,}/, msg: tAuth("validation.minChars") },
    ];

    // Password empty
    if (!password.trim()) {
      setError({ ...error, password: tAuth("validation.passwordRequired") });
      return;
    }

    // Password rules
    const failed = checks.filter((check) => !check.regex.test(password));
    if (failed.length) {
      setError({ ...error, password: failed.map((f) => f.msg).join(", ") });
      return;
    }

    // Confirm password match
    if (password !== confirmPassword) {
      setError({
        ...error,
        confirm: tAuth("validation.passwordMismatch"),
      });
      return;
    }

    try {
      const res = await resetPassword(email, otp, password, confirmPassword);
      if (res?.success) {
        handleApiMessage(res.message, showAlert, "success");
        handleClose();
        onSwitchToLogin();
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      console.error("Reset password failed", err);
      handleApiMessage(tAuth("resetPasswordFailed"), showAlert, "error");
    }
  };

  return (
    <AppModal
      showCloseIcon={false}
      closeOnBackdropClick={false}
      open={open}
      onClose={handleClose}
      title={
        step === 1
          ? tAuth("forgotPassword")
          : step === 2
          ? tAuth("verifyEmail")
          : tAuth("resetPassword")
      }
      headerIcon={step === 2 ? <Mail /> : undefined}
      description={
        step === 2 ? tAuth("otpSentDetail", { email: maskEmail(email) }) : ""
      }
      titleClass="font-rajdhani"
    >
      {step === 1 && (
        <>
          <form
            onSubmit={handleRequestOtp}
            className="flex flex-col gap-4 mt-4"
          >
            <InputComp
              variant="secondary"
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
          <div className="mt-2 text-center">
            <div className="text-center">{tAuth("or")}</div>
            <div className="text-[var(--textTwo)] font-md flex gap-2 justify-center mt-2">
              <span
                className="text-[var(--primary)] cursor-pointer hover:text-[var(--textOne)]"
                onClick={() => {
                  handleClose();
                  onSwitchToLogin();
                }}
              >
                {tAuth("login")}
              </span>
              <span>|</span>
              <span
                className="text-[var(--primary)] cursor-pointer hover:text-[var(--textOne)]"
                onClick={() => {
                  handleClose();
                  onSwitchToRegister();
                }}
              >
                {tAuth("register")}
              </span>
            </div>
          </div>
        </>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="mt-3">
          <OtpInputComp length={6} value={otp} onChange={setOtp} />

          <button
            disabled={otp?.length !== 6}
            type="submit"
            className={`cursor-pointer w-full px-6 py-2 mt-4 rounded-[100px]  font-bold font-rajdhani transition duration-200 ${
              otp?.length !== 6
                ? "bg-[var(--bgThree)] text-[var(--textTwo)]"
                : "bg-[var(--primary)] text-[var(--secondary)]"
            }`}
          >
            {tAuth("verifyOtp")}
          </button>

          <ResendOtp duration={50} onResend={() => forgotPassword(email)} />
        </form>
      )}

      {step === 3 && (
        <form
          onSubmit={handleResetPassword}
          className="flex flex-col gap-4 mt-3"
        >
          <InputComp
            variant="secondary"
            label={tAuth("newPassword")}
            placeholder={tAuth("passwordPlaceholder")}
            type="password"
            isRequired={true}
            showPasswordToggle
            value={password}
            isError={Boolean(error.password)}
            errorMessage={error.password}
            onChange={(e) => {
              if (error.password) setError({ ...error, password: "" });
              setPassword(e.target.value);
            }}
          />

          <InputComp
            variant="secondary"
            label={tAuth("confirmPassword")}
            placeholder={tAuth("confirmPasswordPlaceholder")}
            type="password"
            isRequired={true}
            showPasswordToggle
            value={confirmPassword}
            isError={Boolean(error.confirm)}
            errorMessage={error.confirm}
            onChange={(e) => {
              if (error.confirm) setError({ ...error, confirm: "" });
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
