"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import GoogleIcon from "@mui/icons-material/Google";

import { handleApiMessage, loginUser } from "@/lib/auth_ops";

import AppModal from "@components/AppModal";
import { useAuth } from "@/context/AuthContext"; // 👈 your auth hook
import { useAlert } from "@/context/AlertContext";
import InputComp from "../Form/InputComp";

const initFormData = {
  email: "",
  password: "",
};
export default function LoginModal({
  open,
  onClose,
  onSwitchToRegister,
  onSwitchToForgotPassword,
}) {
  const { showAlert } = useAlert();

  const { t: tAuth } = useTranslation("auth");
  const { loginWithGoogle, setUser } = useAuth(); // 👈 call login here
  const [formData, setFormData] = useState(initFormData);

  function handleClose() {
    setFormData(initFormData);
    onClose();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    loginUser(formData)
      .then((res) => {
        if (res?.success) {
          setUser(res?.data?.user);
          handleApiMessage(res?.message, showAlert, "success");
          handleClose();
        } else {
          handleApiMessage(res?.message, showAlert);
        }
      })
      .catch((err) => {
        console.error("Login failed", err);
        showAlert(tAuth("loginFailed"), "error");
      });
  };

  return (
    <AppModal
      open={open}
      onClose={handleClose}
      // title={tAuth("loginTitle")}
      title="Welcome"
      subtitle="To Arena"
      description="Access your gaming profile and join the competition"
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
          {tAuth("loginTitle")}
        </button>
      </form>

      {/* Forgot password link 👇 */}
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
        className="cursor-pointer border border-[var(--primary)]  flex gap-3 justify-center align-center px-6 py-2 rounded-[100px] bg-[var(--secondary)]  text-[var(--primary)] font-rajdhani font-bold transition duration-200 hover:shadow-[0_0_4px_var(--primary)]"
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
