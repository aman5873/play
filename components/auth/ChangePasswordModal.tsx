"use client";

import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";

import AppModal from "@components/AppModal";
import InputComp from "../Form/InputComp";
import { handleApiMessage, changePassword } from "@/lib/auth_ops";
import { useAlert } from "@/context/AlertContext";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  open,
  onClose,
}: ChangePasswordModalProps) {
  const { t } = useTranslation("auth");
  const { showAlert } = useAlert();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const newError = { oldPassword: "", newPassword: "", confirmPassword: "" };

    if (!oldPassword?.trim())
      newError.oldPassword = t("validation.passwordRequired");
    if (!newPassword?.trim()) {
      newError.newPassword = t("validation.passwordRequired");
    } else {
      const checks = [
        { regex: /[A-Z]/, msg: t("validation.uppercaseLetter") },
        { regex: /[a-z]/, msg: t("validation.lowercaseLetter") },
        { regex: /[0-9]/, msg: t("validation.number") },
        { regex: /[!@#$%^&*(),.?":{}|<>]/, msg: t("validation.specialChar") },
        { regex: /.{8,}/, msg: t("validation.minChars") },
      ];

      const failed = checks.filter((c) => !c.regex.test(newPassword));
      if (failed.length)
        newError.newPassword = failed.map((c) => c.msg).join(", ");
    }

    if (newPassword !== confirmPassword) {
      newError.confirmPassword = t("validation.passwordMismatch");
    }

    return newError;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newError = validateForm();
    if (Object.values(newError).some((v) => v)) {
      setError(newError);
      return;
    }

    try {
      const res = await changePassword(
        oldPassword,
        newPassword,
        confirmPassword
      );
      if (res?.success) {
        handleApiMessage(res.message, showAlert, "success");
        onClose();
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      console.error("Change password failed", err);
      handleApiMessage(t("validation.registerFailed"), showAlert, "error");
    }
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={t("changePassword")}
      titleClass="font-rajdhani"
      contClass="w-[95%] sm:w-md max-w-md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-full">
        <InputComp
          variant="secondary"
          label={t("validation.passwordPlaceholder")}
          placeholder={t("validation.passwordPlaceholder")}
          type="password"
          isRequired={true}
          showPasswordToggle
          value={oldPassword}
          onChange={(e) => {
            setOldPassword(e.target.value);
            setError({ ...error, oldPassword: "" });
          }}
          isError={Boolean(error.oldPassword)}
          errorMessage={error.oldPassword}
        />

        <InputComp
          variant="secondary"
          label={t("validation.newPassword")}
          placeholder={t("validation.passwordPlaceholder")}
          type="password"
          isRequired={true}
          showPasswordToggle
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setError({ ...error, newPassword: "" });
          }}
          isError={Boolean(error.newPassword)}
          errorMessage={error.newPassword}
        />

        <InputComp
          variant="secondary"
          label={t("validation.confirmPassword")}
          placeholder={t("validation.passwordPlaceholder")}
          type="password"
          isRequired={true}
          showPasswordToggle
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError({ ...error, confirmPassword: "" });
          }}
          isError={Boolean(error.confirmPassword)}
          errorMessage={error.confirmPassword}
        />

        <button
          type="submit"
          className="cursor-pointer w-full px-6 py-2 mt-3 rounded-[100px] bg-[var(--primary)] text-[var(--secondary)] font-rajdhani font-bold transition duration-200 hover:shadow-[0_0_4px_var(--primary)]"
        >
          {t("validation.updatePassword")}
        </button>
      </form>
    </AppModal>
  );
}
