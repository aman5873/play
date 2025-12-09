"use client";
import React, {
  useState,
  ChangeEvent,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

import { AppButton } from "@/components/TopComp";
import InputComp from "@/components/Form/InputComp";
import { Twitter, Instagram, Camera, Image as ImageIcon } from "lucide-react";
import { DiscordIcon } from "@/app/icons";
import CountryPicker from "@/components/Form/CountryPicker";
import DatePicker from "@/components/Form/DatePicker";
import { useAuth } from "@/context/AuthContext";
import { handleApiMessage, updateProfile } from "@/lib/auth_ops";
import { useAlert } from "@/context/AlertContext";
import Loading from "@/components/common/Loading";

// Map social names to Lucide icons
const iconMap = {
  discord: DiscordIcon,
  twitter: Twitter,
  instagram: Instagram,
};

export const initCreatorProfile = {
  name: "",
  username: "",
  avatar_url: "",
  level: "",
  email: "",
  phone: "",
  country: "",
  dob: "",
  achievement: "",
  bio: "",
  cover_url: "",
  website: "",
  discord_url: "",
  twitter_url: "",
  instagram_url: "",
};
const SocialInputRow = ({ name, Icon, value, onChange }) => (
  <div className="flex items-center flex-col gap-2 w-full">
    <div className="w-full flex items-center gap-4 p-2 rounded-md">
      {Icon && <Icon size={24} className="text-[var(--textOne)]" />}
      <InputComp
        name={`social-${name}`}
        type="text"
        radius="10px"
        value={value ?? ""}
        onChange={(e) => onChange({ target: { value: e.target.value, name } })}
      />
    </div>
  </div>
);
function SocialInputsComp({ form, handleInputChange }) {
  const { t: tScreen } = useTranslation("screen");
  const socials = [
    { id: 1, icon: "discord", name: "discord_url", url: form?.discord_url },
    { id: 2, icon: "twitter", name: "twitter_url", url: form?.twitter_url },
    {
      id: 3,
      icon: "instagram",
      name: "instagram_url",
      url: form?.instagram_url,
    },
  ];

  return (
    <div>
      <h1 className="text-md font-semibold text-[var(--textOne)]">
        {tScreen("contentCreator.profile.socialLinks")}
      </h1>
      <div className="flex flex-wrap gap-3 mt-1">
        {socials.map(({ id, icon, name, url }) => {
          const Icon = iconMap[icon];
          return (
            <SocialInputRow
              key={id}
              name={name}
              value={url}
              onChange={handleInputChange}
              Icon={Icon}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function EditProfile() {
  const { user, setUser, handleProfile } = useAuth();
  const { showAlert } = useAlert();
  const { t: tScreen } = useTranslation("screen");

  const [form, setForm] = useState(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, type: "cover" | "avatar") => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        setForm((prev) =>
          type === "cover"
            ? { ...prev, cover_url: url }
            : { ...prev, avatar_url: url }
        );
      };
      reader.readAsDataURL(file);

      // Store file separately for upload
      if (type === "cover") setCoverFile(file);
      else setAvatarFile(file);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (loading) return;

      const formData = new FormData();

      // Append fields
      Object.entries(form).forEach(([key, value]) => {
        if (key === "cover_url" || key === "avatar_url") return; // skip these keys
        if (value != null && value !== "") formData.append(key, String(value));
      });

      if (avatarFile) formData.append("avatar", avatarFile);
      if (coverFile) formData.append("cover", coverFile);

      try {
        setLoading(true);
        const res = await updateProfile(formData);
        if (res?.success) {
          setUser(res?.data?.user);
          handleProfile();
          handleApiMessage(res?.message, showAlert, "success");
        } else {
          handleApiMessage(res?.message, showAlert, "error");
        }
      } catch (err) {
        const errMessage = tScreen(
          "contentCreator.profile.profileUpdateFailed"
        );
        console.error(errMessage, err);
        handleApiMessage(errMessage, showAlert, "error");
      } finally {
        setLoading(false);
      }
    },
    [form, avatarFile, coverFile, loading, setUser, handleProfile, showAlert]
  );

  useEffect(() => {
    if (user) {
      setForm({
        ...initCreatorProfile,
        name: user?.name || "",
        phone: user?.phone || "",
        username: user?.username || "",
        dob: user?.dob || "",
        country: user?.country || "",
        bio: user?.bio || "",
        avatar_url: user?.avatar_url || "",
        cover_url: user?.cover_url || "",
        website: user?.website || "",
        discord_url: user?.discord_url || "",
        twitter_url: user?.twitter_url || "",
        instagram_url: user?.instagram_url || "",
      });
    }
  }, [user]);

  return (
    <>
      <Loading loading={loading} />
      <form
        onSubmit={handleSubmit}
        className="gradient-one border p-2 sm:p-4 gap-4 rounded-[16px] flex flex-col border-[var(--borderThree)]"
      >
        <div className="flex justify-between">
          <h1 className="text-lg lg:text-xl font-semibold text-[var(--textOne)]">
            {tScreen("contentCreator.profile.editProfile")}
          </h1>
        </div>

        <h2 className="text-md font-semibold text-[var(--textOne)]">
          {tScreen("contentCreator.profile.generalInformation")}
        </h2>

        {/* Cover Upload */}
        <div className="w-full aspect-[10/2] overflow-hidden rounded-md bg-[var(--bgTwo)] relative mb-2 group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#1c2b4a]"></div>
          {form?.cover_url && (
            <Image
              src={form?.cover_url}
              alt="cover"
              fill
              className="object-cover"
            />
          )}
          <div
            className="absolute bottom-2 right-2 bg-[var(--primary)] rounded-full p-2 cursor-pointer z-10"
            onClick={() => coverInputRef.current?.click()}
          >
            <ImageIcon size={24} className="text-[var(--secondary)]" />
          </div>
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "cover")}
            className="hidden"
          />
        </div>

        {/* Avatar + Name + Username */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          {/* Avatar */}
          <div className="relative w-[120px] h-[120px] rounded-full">
            <div className="w-full h-full rounded-full overflow-hidden bg-[var(--bgTwo)]">
              {form?.avatar_url && (
                <Image
                  src={form?.avatar_url}
                  alt="avatar"
                  fill
                  className="object-cover rounded-full"
                />
              )}
            </div>
            <div
              className="absolute bottom-0 right-0 p-2 bg-[var(--primary)] text-[var(--secondary)] rounded-full cursor-pointer z-10"
              onClick={() => avatarInputRef.current?.click()}
            >
              <Camera size={18} />
            </div>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "avatar")}
              className="hidden"
            />
          </div>

          {/* Name + Username */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
            <InputComp
              label={tScreen("user.Username")}
              name="username"
              type="text"
              radius="10px"
              value={form?.username ?? ""}
              onChange={handleInputChange}
            />
            <InputComp
              label={tScreen("user.name")}
              name="name"
              type="text"
              radius="10px"
              value={form?.name ?? ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <InputComp
          label={tScreen("user.email")}
          name="email"
          type="text"
          radius="10px"
          value={user?.email ?? ""}
          readOnly
        />
        <DatePicker
          label={tScreen("user.dob")}
          value={form?.dob ?? ""}
          onChange={(dob: any) => setForm({ ...form, dob })}
        />
        <CountryPicker
          label={tScreen("user.country")}
          value={form?.country ?? ""}
          onChange={(country: any) => setForm({ ...form, country })}
        />
        <InputComp
          label={tScreen("user.bio")}
          name="bio"
          type="textarea"
          radius="10px"
          rows={3}
          value={form?.bio ?? ""}
          onChange={handleInputChange}
        />

        <InputComp
          label={tScreen("contentCreator.profile.website")}
          name="website"
          type="text"
          radius="10px"
          value={form?.website ?? ""}
          onChange={handleInputChange}
        />

        <SocialInputsComp form={form} handleInputChange={handleInputChange} />

        <div className="flex gap-2 justify-end">
          <AppButton
            type="secondaryTwo"
            onClick={() => {
              setLoading(true);
              handleProfile().then(() => {
                setLoading(false);
                // Reset file states
                setAvatarFile(null);
                setCoverFile(null);

                // Reset file input values
                if (avatarInputRef.current) avatarInputRef.current.value = "";
                if (coverInputRef.current) coverInputRef.current.value = "";
              });
            }}
            label={tScreen("contentCreator.profile.cancel")}
          />
          <AppButton
            actionType="submit"
            type="primary"
            disabled={loading}
            label={tScreen("contentCreator.profile.saveChanges")}
          />
        </div>
      </form>
    </>
  );
}
