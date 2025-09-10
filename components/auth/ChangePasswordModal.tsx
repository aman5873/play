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
  const { t: tAuth } = useTranslation("auth");
  const { showAlert } = useAlert();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert(tAuth("passwordsDontMatch"));
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
      handleApiMessage(tAuth("changePasswordFailed"), showAlert, "error");
    }
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={tAuth("changePassword")}
      titleClass="font-rajdhani"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <InputComp
          label={tAuth("password")}
          placeholder={tAuth("passwordPlaceholder")}
          type="password"
          required
          showPasswordToggle
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <InputComp
          label={tAuth("newPassword")}
          placeholder={tAuth("passwordPlaceholder")}
          type="password"
          required
          showPasswordToggle
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <InputComp
          label={tAuth("confirmPassword")}
          placeholder={tAuth("confirmPasswordPlaceholder")}
          type="password"
          required
          showPasswordToggle
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          className="cursor-pointer w-full px-6 py-2 mt-3 rounded-[100px] bg-[var(--primary)] text-[var(--secondary)] font-rajdhani font-bold transition duration-200 hover:shadow-[0_0_4px_var(--primary)]"
        >
          {tAuth("updatePassword")}
        </button>
      </form>
    </AppModal>
  );
}
