"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import AppModal from "@components/AppModal";
import InputComp from "../Form/InputComp";
import { useAlert } from "@/context/AlertContext";
import { handleApiMessage, updateProfile } from "@/lib/auth_ops";
import { useAuth } from "@/context/AuthContext";
import DatePicker from "../Form/DatePicker";
import CountryPicker from "../Form/CountryPicker";
import TagSelect from "../common/TagSelect";

const initError = {
  name: "",
  username: "",
  tags: "",
};
const initUser = {
  name: "",
  phone: "",
  username: "",
  dob: "",
  country: "",
  bio: "",
};

export default function EditProfileModal({ open, onClose }) {
  const { t: tAuth } = useTranslation("auth");
  const { t: tScreen } = useTranslation("screen");
  const { showAlert } = useAlert();
  const { user, setUser, handleProfile } = useAuth();

  const [loading, setLoading] = useState(false);

  const [tags, setTags] = useState([]);
  const [userData, setFormData] = useState(initUser);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [error, setError] = useState(initError);

  function handleClose() {
    onClose();
    setError(initError);
    setFormData(initUser);
    setTags([]);
  }

  const formValidate = () => {
    const newError = { ...initError }; // clone object

    // name required
    if (!userData?.name.trim())
      newError.name = tAuth("validation.nameRequired");
    if (!userData?.username.trim())
      newError.username = tAuth("validation.usernameRequired");
    if (!tags.length) newError.tags = tAuth("validation.tagRequired");

    setError(newError);
    console.log("in validate", newError);

    // return true if no errors
    return !Object.values(newError).some((val) => val);
  };

  useEffect(() => {
    if (user) {
      setPreview(user.avatar_url || "");
      setFormData({
        ...userData,
        name: user.name,
        phone: user.phone,
        username: user?.username,
        dob: user?.dob,
        country: user?.country,
        bio: user?.bio,
      });
      const mapped = user?.tags?.map((t: any) => ({
        id: t.id,
        value: t.id,
        label: t.name,
        name: t.name,
      }));
      setTags(mapped);
    }
    setError(initError);
  }, [user, open]);

  // 🧹 Cleanup blob URL on unmount or when preview changes
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Revoke previous preview if it was a blob URL
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const getFallbackAvatar = () =>
    user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "?";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // prevent duplicate submissions

    if (!formValidate()) return; // stop submission if validation fails

    const formData = new FormData();

    // Append other fields
    Object.entries(userData).forEach(([key, value]) => {
      if (value != null) formData.append(key, String(value));
    });

    // Append tags as tags[index] = tagId
    tags?.forEach((t, i) => {
      formData.append(`tags[${i}]`, String(t.id));
    });

    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      setLoading(true);
      const res = await updateProfile(formData);
      if (res?.success) {
        setUser(res?.data?.user);
        handleProfile();
        handleApiMessage(res?.message, showAlert, "success");
        onClose();
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      console.error("Profile update failed", err);
      handleApiMessage("Profile update failed", showAlert, "error");
    } finally {
      setLoading(false); // always reset
    }
  };

  return (
    <AppModal
      open={open}
      onClose={handleClose}
      title={tAuth("profile")}
      titleClass="font-rajdhani"
      contClass="w-[95%] sm:w-2xl"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-4  h-full"
      >
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <label className="relative cursor-pointer w-20 h-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {preview ? (
              <img
                src={preview}
                alt="User Avatar"
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

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <InputComp
            label={tScreen("user.Username")}
            type="text"
            // required
            isError={Boolean(error.username)}
            errorMessage={error.username}
            value={userData?.username ?? ""}
            onChange={(e: any) => {
              setError({ ...error, username: "" });
              setFormData({ ...userData, username: e.target.value });
            }}
          />
          <InputComp
            isError={Boolean(error.name)}
            errorMessage={error.name}
            label={tScreen("user.name")}
            type="text"
            // required
            value={userData?.name ?? ""}
            onChange={(e: any) => {
              setError({ ...error, name: "" });
              setFormData({ ...userData, name: e.target.value });
            }}
          />

          {/* Phone */}
          <InputComp
            label={tScreen("user.phone")}
            placeholder={tAuth("phonePlaceholder") || "Enter your phone number"}
            type="tel"
            value={userData?.phone ?? ""}
            onChange={(e) =>
              setFormData({ ...userData, phone: e.target.value })
            }
          />

          {/* Email (readonly) */}
          <InputComp
            label={tScreen("user.email")}
            placeholder={tAuth("emailPlaceholder")}
            type="email"
            value={user?.email || ""}
            readOnly
          />

          <DatePicker
            label={tScreen("user.dob")}
            value={userData?.dob ?? ""}
            onChange={(dob: any) => {
              setFormData({ ...userData, dob });
            }}
          />
          <CountryPicker
            label={tScreen("user.country")}
            value={userData?.country ?? ""}
            onChange={(country: any) => setFormData({ ...userData, country })}
          />
        </div>
        <InputComp
          label={tScreen("user.bio")}
          name="bio"
          type="textarea"
          radius="10px"
          rows={3}
          value={userData?.bio ?? ""}
          onChange={(e: any) =>
            setFormData({ ...userData, bio: e?.target?.value })
          }
        />

        <TagSelect
          tags={tags}
          setTags={(list) => {
            setTags(list);
            setError({ ...error, tags: "" });
          }}
          isError={Boolean(error.tags)}
          errorMessage={error.tags}
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading} // disable when processing
          className={`cursor-pointer w-full px-6 py-2 mt-3 rounded-[100px] 
              bg-[var(--primary)] text-[var(--secondary)] font-rajdhani 
              font-bold transition duration-200 hover:shadow-[0_0_4px_var(--primary)]
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading
            ? tAuth("processing") || "Processing..."
            : tAuth("updateProfile") || "Save Changes"}
        </button>
      </form>
    </AppModal>
  );
}
