"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import AppModal from "@components/AppModal";
import InputComp from "../Form/InputComp";
import { useAlert } from "@/context/AlertContext";
import { handleApiMessage, updateProfile } from "@/lib/auth_ops";
import { useAuth } from "@/context/AuthContext";

export default function EditProfileModal({ open, onClose }) {
  const { t: tAuth } = useTranslation("auth");
  const { showAlert } = useAlert();
  const { user, setUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (user?.avatar_url) setPreview(user.avatar_url);
  }, [user, open]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const getFallbackAvatar = () =>
    user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "?";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      const res = await updateProfile(formData);
      if (res?.success) {
        setUser(res?.data?.user);
        handleApiMessage(res?.message, showAlert, "success");
        onClose();
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      console.error("Profile update failed", err);
      handleApiMessage("Profile update failed", showAlert, "error");
    }
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={tAuth("profile")}
      titleClass="font-rajdhani"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <label className="relative cursor-pointer w-20 h-20">
            {preview ? (
              <img
                src={preview}
                alt={getFallbackAvatar()}
                className="w-20 h-20 rounded-full object-cover border border-[var(--borderTwo)]"
              />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--primary)] text-2xl font-bold border border-[var(--borderTwo)]">
                {getFallbackAvatar()}
              </div>
            )}

            {/* Camera overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-40 opacity-0 hover:opacity-60 transition">
              <CameraAltIcon className="text-white" />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
          <p className="text-xs text-[var(--textTwo)] mt-1">
            {tAuth("changeAvatar")}
          </p>
        </div>

        {/* Name */}
        <InputComp
          label={tAuth("username")}
          placeholder={tAuth("namePlaceholder")}
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Phone */}
        <InputComp
          label={tAuth("phone") || "Phone"}
          placeholder={tAuth("phonePlaceholder") || "Enter your phone number"}
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Email (readonly) */}
        <InputComp
          label={tAuth("email")}
          placeholder={tAuth("emailPlaceholder")}
          type="email"
          value={user?.email || ""}
          readOnly
        />

        {/* Submit */}
        <button
          type="submit"
          className="cursor-pointer w-full px-6 py-2 mt-3 rounded-[100px] 
                     bg-[var(--primary)] text-[var(--secondary)] font-rajdhani 
                     font-bold transition duration-200 hover:shadow-[0_0_4px_var(--primary)]"
        >
          {tAuth("updateProfile") || "Save Changes"}
        </button>
      </form>
    </AppModal>
  );
}
