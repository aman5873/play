"use client";

import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import GoogleIcon from "@mui/icons-material/Google";

import {
  handleApiMessage,
  loginUser,
  fetchProfile,
  verifyOtpApi,
} from "@/lib/auth_ops";

import AppModal from "@components/AppModal";
import { useAuth } from "@/context/AuthContext";
import { useAlert } from "@/context/AlertContext";
import InputComp from "../Form/InputComp";
import { maskEmail } from "./ForgotPasswordModal";
import { Mail } from "lucide-react";
import OtpInputComp from "../OtpInput";
import ResendOtp from "../Form/ResendOtp";

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
  const { loginWithGoogle, setUser, setLoading } = useAuth();

  const [formData, setFormData] = useState(initFormData);
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const handleClose = () => {
    setFormData(initFormData);
    onClose();
    setShowVerifyOtp(false);
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    customMessage?: string
  ) => {
    e?.preventDefault();

    try {
      setLoading(true);
      const res = await loginUser(formData);
      setLoading(false);
      if (res?.status === 403) {
        // 🔥 Special handling for forbidden users
        handleApiMessage(
          res?.message ?? "Access denied. Please contact support.",
          showAlert,
          "error"
        );
        setShowVerifyOtp(true);
        return;
      }

      if (res?.success) {
        // 👉 immediately fetch user profile
        const profileRes = await fetchProfile();
        if (profileRes?.data?.user) {
          setUser(profileRes.data.user); // update context
        }

        handleApiMessage(customMessage ?? res?.message, showAlert, "success");
        handleClose();
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      console.error("Login failed", err);
      handleApiMessage(tAuth("loginFailed"), showAlert, "error");
    }
  };

  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    try {
      const { success, message } = await verifyOtpApi(formData?.email, otp);

      if (success) {
        handleApiMessage(message, showAlert, "success");
        setShowVerifyOtp(false);
      } else {
        handleApiMessage(message, showAlert, "error"); // show error
      }
    } catch (err) {
      console.error("OTP verification failed", err);
      showAlert(tAuth("otpFailed"), "error");
    }
  };

  return (
    <AppModal
      showCloseIcon={false}
      closeOnBackdropClick={false}
      open={open}
      onClose={handleClose}
      title={showVerifyOtp ? tAuth("verifyMail") : tAuth("loginTitle")}
      subtitle={showVerifyOtp ? "" : tAuth("loginSubtitle")}
      headerIcon={showVerifyOtp ? <Mail /> : null}
      description={
        showVerifyOtp
          ? tAuth("otpSentDetail", { email: maskEmail(formData?.email) })
          : tAuth("loginDesc")
      }
      titleClass={showVerifyOtp ? "font-rajdhani" : ""}
    >
      {!showVerifyOtp ? (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputComp
              variant="secondary"
              label={tAuth("email")}
              placeholder={tAuth("emailPlaceholder")}
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <InputComp
              variant="secondary"
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
        </>
      ) : (
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
