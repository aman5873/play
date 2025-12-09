"use client";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FolderOpenDot } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import AppModal from "@/components/AppModal";
import InputComp from "@/components/Form/InputComp";
import { handleApiMessage } from "@/lib/auth_ops";
import { createPost } from "@/lib/content_creator";
import { useAlert } from "@/context/AlertContext";
import { PostMedia } from "../creator/PostComponents";

interface UploadBoxProps {
  label: string;
  description?: string;
  accept: string;
  maxSizeMB: number;
  multiple?: boolean;
  type?: "image" | "video";
  onFilesSelect: (files: File[]) => void;
  height?: number;
}

const UploadBox: React.FC<UploadBoxProps> = React.memo(function UploadBox({
  label,
  description = "",
  accept,
  maxSizeMB,
  multiple = true,
  onFilesSelect,
  height = 250,
}) {
  const { t: tScreen } = useTranslation("screen");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const mediaRef = useRef<{ url: string; type: string; id: string }[]>([]);
  const [, forceUpdate] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList?.length) return;

    const validFiles: File[] = [];
    const newMedia: { url: string; type: string; id: string }[] = [];

    Array.from(fileList).forEach((file) => {
      if (file.size <= maxSizeMB * 1024 * 1024) {
        validFiles.push(file);
        newMedia.push({
          url: URL.createObjectURL(file),
          type: file.type.startsWith("video") ? "video" : "image",
          id: crypto.randomUUID(),
        });
      } else {
        const alertMessage = tScreen("contentCreator.post.fileSizeAlert", {
          name: file.name,
          maxSizeMB: maxSizeMB,
        });
        alert(alertMessage);
      }
    });

    setFiles(validFiles);
    mediaRef.current = newMedia;
    onFilesSelect(validFiles);
    forceUpdate((n) => n + 1);
  };

  const handleRemove = (obj: any) => {
    mediaRef.current = mediaRef.current.filter((m) => m.id !== obj.id);
    const updatedFiles = files.filter(
      (_, i) => mediaRef.current[i]?.id !== obj.id
    );
    setFiles(updatedFiles);
    onFilesSelect(updatedFiles);
    forceUpdate((n) => n + 1);
  };

  const handleBoxClick = () => inputRef.current?.click();
  const media = mediaRef.current;

  return (
    <div className="flex flex-col items-center justify-center gap-3 border border-[var(--borderTwo)] rounded-2xl p-3 sm:p-4 transition-all duration-200 bg-[var(--bgTwo)] hover:bg-[var(--bgThree)] text-[var(--textTwo)] w-full">
      {media.length === 0 ? (
        <div
          onClick={handleBoxClick}
          className="flex flex-col items-center justify-center cursor-pointer w-full"
          style={{ height }}
        >
          <FolderOpenDot className="w-10 h-10 text-[var(--primary)]" />
          <p className="font-semibold text-[var(--textOne)]">{label}</p>
          <p className="text-sm text-[var(--textTwo)] text-center">
            {description}
          </p>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            hidden
          />
        </div>
      ) : (
        <PostMedia
          media={media}
          height={"h-[200px]"}
          onRemove={handleRemove}
          contClass="w-full"
        />
      )}
    </div>
  );
});

function ContentFeed({ type, onSubmit, loading }) {
  const { t: tScreen } = useTranslation("screen");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🧠 Normalize and split tags
    const tagList = Array.from(
      new Set(
        tags
          .split(/[\s,]+/) // split by space or comma
          .map((tag) => tag.replace(/^#/, "").trim()) // remove leading #
          .filter((t) => t.length > 0) // remove empty
      )
    );

    const formData = new FormData();
    formData.append("description", description);

    // ✅ Append tags as indexed keys: tags[0], tags[1], ...
    tagList.forEach((tag, i) => formData.append(`tags[${i}]`, tag));

    // ✅ Append media files as indexed keys: images[0], videos[0], ...
    if (type === "image") {
      formData.append("type", "image");
      images.forEach((file, i) => formData.append(`images[${i}]`, file));
    } else if (type === "video") {
      formData.append("type", "video");
      videos.forEach((file, i) => formData.append(`videos[${i}]`, file));
    } else {
      formData.append("type", "text");
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {type === "image" && (
        <UploadBox
          label={tScreen("contentCreator.post.uploadImages")}
          description={tScreen("contentCreator.post.uploadImagesDesc", {
            size: "10",
          })}
          accept="image/png,image/jpeg"
          maxSizeMB={10}
          type="image"
          onFilesSelect={setImages}
        />
      )}

      {type === "video" && (
        <UploadBox
          label={tScreen("contentCreator.post.uploadVideos")}
          description={tScreen("contentCreator.post.uploadVideosDesc", {
            size: "50",
          })}
          accept="video/mp4"
          maxSizeMB={50}
          type="video"
          onFilesSelect={setVideos}
        />
      )}

      <InputComp
        name="description"
        type="textarea"
        rows={4}
        radius="10px"
        required={true}
        placeholder={tScreen("contentCreator.post.descriptionPlaceholder")}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="secondary"
      />
      <InputComp
        name="tags"
        type="textarea"
        required={true}
        rows={1}
        radius="10px"
        placeholder={tScreen("contentCreator.post.hashtagsPlaceholder")}
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        variant="secondary"
      />

      <div className="sticky bottom-0 left-0 right-0  py-3 mt-4 z-20 gradient-one">
        <button
          disabled={loading}
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-[var(--secondary)] bg-[var(--primary)] hover:opacity-90 transition-all"
        >
          {loading
            ? tScreen("contentCreator.post.processing") || "Processing..."
            : tScreen("contentCreator.post.post")}
        </button>
      </div>
    </form>
  );
}

function ContentTab({ onSubmit, loading }) {
  const { t: tScreen } = useTranslation("screen");
  const [activeTab, setActiveTab] = useState<"text" | "image" | "video">(
    "image"
  );

  const tabs = [
    { key: "text", label: tScreen("contentCreator.createPost.text") },
    { key: "image", label: tScreen("contentCreator.createPost.image") },
    { key: "video", label: tScreen("contentCreator.createPost.video") },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 bg-[var(--bgTwo)] rounded-full overflow-x-auto p-1 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 cursor-pointer py-2 text-center font-semibold rounded-3xl transition-all duration-300 ${
              activeTab === tab.key
                ? "bg-[var(--primary)] text-[var(--secondary)] shadow-md"
                : "text-[var(--textTwo)] hover:text-[var(--textOne)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ContentFeed type={activeTab} onSubmit={onSubmit} loading={loading} />
    </div>
  );
}

export default function ContentCreateModal({ show, onClose, handleRefresh }) {
  const { t: tScreen } = useTranslation("screen");
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      setLoading(true);
      const res = await createPost(formData);
      if (res?.success) {
        handleApiMessage(res?.message, showAlert, "success");
        onClose();
        if (handleRefresh) {
          handleRefresh();
        }
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      const errMessage = tScreen("contentCreator.post.createPostFailed");
      handleApiMessage(errMessage, showAlert, "error");
    } finally {
      setLoading(false); // always reset
    }
  };

  return (
    <AppModal
      open={show}
      onClose={onClose}
      titleClass="font-rajdhani"
      contClass="w-[95%] sm:w-md max-w-lg"
      closeIconClass="top-3 right-4"
      contPadding="p-3"
      header={
        <h2 className="text-[var(--textOne)] font-bold text-lg sm:text-xl md:text-2xl">
          {tScreen("contentCreator.createPost.title")}
        </h2>
      }
    >
      <ContentTab onSubmit={handleSubmit} loading={loading} />
    </AppModal>
  );
}
