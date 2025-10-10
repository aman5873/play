"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  Loader2,
  Upload,
  Eye,
  Star,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function PrimaryToggle({ url, primaryImage, onSetPrimary, showLabel = false }) {
  const isPrimary = primaryImage === url;
  return (
    <button
      type="button"
      onClick={() => onSetPrimary(url)}
      className={`p-1.5 shadow transition z-30 flex items-center justify-center ${
        isPrimary ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
      } ${showLabel ? "rounded-lg px-3 py-2" : "rounded-full"}`}
      title={isPrimary ? "Primary Image" : "Set as Primary"}
    >
      <Star
        className={`w-4 h-4 ${isPrimary ? "text-white" : "text-gray-700"}`}
      />
      {showLabel && (
        <span className="ml-2 text-sm">
          {isPrimary ? "Primary" : "Make Primary"}
        </span>
      )}
    </button>
  );
}

function RemoveButton({ item, onConfirmRemove, showLabel = false }) {
  return (
    <button
      type="button"
      onClick={() => onConfirmRemove(item.url)}
      className={`p-1.5 shadow transition flex items-center justify-center z-30 ${
        showLabel
          ? "rounded-lg bg-red-600 text-white hover:bg-red-700 px-3 py-2"
          : "rounded-full bg-white hover:bg-red-100"
      }`}
      title="Remove Image"
    >
      <Trash2
        className={`w-5 h-5 ${showLabel ? "text-white" : "text-red-600"}`}
      />
      {showLabel && <span className="ml-2 text-sm">Remove</span>}
    </button>
  );
}

function ImageCard({
  img,
  primaryImage,
  onSetPrimary,
  onConfirmRemove,
  onPreview,
  onUpdate,
  isDelete,
}) {
  const isPrimary = primaryImage === img.url;

  return (
    <div
      className={`relative border rounded-lg overflow-hidden group ${
        isPrimary ? "border-blue-500" : "border-gray-300"
      }`}
    >
      <div className="relative w-full aspect-[4/3]">
        <Image src={img?.url} alt="Preview" fill className="object-cover" />
      </div>

      {/* Primary Toggle */}
      <div className="absolute top-2 right-2 z-20">
        <PrimaryToggle
          url={img.url}
          primaryImage={primaryImage}
          onSetPrimary={onSetPrimary}
        />
      </div>

      {/* Overlay Actions */}
      <div className="absolute inset-0 flex items-center justify-center gap-3 backdrop-blur-sm bg-black/30 opacity-0 group-hover:opacity-100 transition z-10">
        {isDelete && (
          <RemoveButton item={img} onConfirmRemove={onConfirmRemove} />
        )}
        <button
          type="button"
          onClick={onPreview}
          className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
          title="Preview"
        >
          <Eye className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
}

function PreviewModal({
  images,
  previewIndex,
  setPreviewIndex,
  primaryImage,
  onSetPrimary,
  onConfirmRemove,
  isDisableAddNew,
}) {
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    document.body.style.overflow = previewIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [previewIndex]);

  if (previewIndex === null) return null;
  const img = images[previewIndex];
  if (!img) return null;

  const wrapIndex = (i) => (i + images.length) % images.length;

  const showPrev = () => setPreviewIndex((i) => wrapIndex(i - 1));
  const showNext = () => setPreviewIndex((i) => wrapIndex(i + 1));

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100000]">
      <div
        className="absolute inset-0 bg-black/40 dark:bg-gray-900/80 backdrop-blur-md"
        onClick={() => setPreviewIndex(null)}
      />
      <div className="relative max-w-5xl w-full rounded-lg mx-4 flex flex-col items-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md overflow-hidden">
        <button
          type="button"
          onClick={() => setPreviewIndex(null)}
          className="absolute top-4 right-4 z-[100001] bg-white/80 rounded-full p-2 shadow hover:bg-white"
        >
          <X className="w-6 h-6 text-gray-800" />
        </button>
        <div className="relative w-full h-[60vh] flex justify-center overflow-hidden">
          <AnimatePresence custom={direction}>
            <motion.div
              key={img.url}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="absolute w-full h-full flex justify-center items-center"
            >
              <Image
                src={img.url}
                alt="Preview"
                width={1400}
                height={900}
                className="object-contain max-h-full w-auto rounded-lg"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={showPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:bg-white"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          type="button"
          onClick={showNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:bg-white"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {!isDisableAddNew && (
          <div className="mt-4 flex gap-3">
            <PrimaryToggle
              url={img.url}
              primaryImage={primaryImage}
              onSetPrimary={onSetPrimary}
              showLabel
            />
            <RemoveButton
              item={img}
              onConfirmRemove={(url) => {
                onConfirmRemove(url);
                if (images.length > 1) showNext();
              }}
              showLabel
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ImageUploader({
  images = [],
  onChange,
  isMulti = false,
  isDisableAddNew = false,
  isDisablePrimaryToggle = false,
  isDelete = true,
  variant = "primary",
}) {
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const primaryImage = isMulti
    ? images.find((img) => img.is_primary)?.url
    : images[0]?.url;

  const emit = (nextImages: any[]) => onChange?.(nextImages);

  const setPrimary = (url: string) => {
    if (!isMulti || isDisablePrimaryToggle) return;
    const nextImages = images.map((img) => ({
      ...img,
      is_primary: img.url === url,
    }));
    emit(nextImages);
  };

  const removeByUrl = (url: string) => {
    const nextImages = images.filter((i) => i.url !== url);
    if (
      isMulti &&
      nextImages.length > 0 &&
      !nextImages.some((img) => img.is_primary)
    ) {
      nextImages[0].is_primary = true;
    }
    emit(nextImages);
  };

  const updateImage = (id: string, file: File) => {
    if (!file) return;
    const nextImages = images.map((img) =>
      img.id === id ? { ...img, file, url: URL.createObjectURL(file) } : img
    );
    emit(nextImages);
  };

  const processFiles = useCallback(
    (files: FileList | null) => {
      if (!files?.length) return;
      setLoading(true);
      const newImages = Array.from(files).map((file, idx) => ({
        id: `${file.name}-${Date.now()}-${idx}`,
        url: URL.createObjectURL(file),
        file,
        is_primary: isMulti ? images.length === 0 && idx === 0 : true,
      }));
      emit(isMulti ? [...images, ...newImages] : [newImages[0]]);
      setLoading(false);
    },
    [images, isMulti, emit]
  );

  // Theme colors
  const isSecondary = variant === "secondary";
  const borderColor = isSecondary ? "var(--borderTwo)" : "var(--borderOne)";
  const bgColor = isSecondary ? "var(--bgTwo)" : "var(--bgOne)";
  const textColor = "var(--textOne)";

  return (
    <div
      className={`space-y-4 border-1 rounded-lg cursor-pointer border-[${borderColor}] bg-[${bgColor}] p-2`}
    >
      {!isDisableAddNew && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragOver(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            processFiles(e.dataTransfer.files);
          }}
          className={`relative flex flex-col items-center justify-center w-full  h-min-32  rounded-lg cursor-pointer transition-colors duration-200 `}
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin text-[var(--primary)]" />
          ) : (
            <>
              <Upload
                className={`w-6 h-6 text-[var(--textTwo)] hover:text-[var(--textOne)] mt-3`}
              />
              <span
                className={`mt-2 text-sm text-center text-[${textColor}] hover:text-[var(--textOne)] mb-3`}
              >
                {isMulti
                  ? "Click or drag multiple images"
                  : "Click or drag an image"}
              </span>
            </>
          )}

          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            multiple={isMulti}
            ref={inputRef}
            onChange={(e) => processFiles(e.target.files)}
            className="hidden"
          />
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div
          className={`grid ${
            isMulti
              ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1"
          } gap-4`}
        >
          {images.map((img, idx) => (
            <ImageCard
              key={img.id}
              img={img}
              primaryImage={primaryImage}
              onSetPrimary={setPrimary}
              onConfirmRemove={removeByUrl}
              onUpdate={updateImage}
              onPreview={() => setPreviewIndex(idx)}
              isDelete={isDelete}
            />
          ))}
        </div>
      )}

      {/* Preview Modal */}
      <PreviewModal
        images={images}
        previewIndex={previewIndex}
        setPreviewIndex={setPreviewIndex}
        primaryImage={primaryImage}
        onSetPrimary={setPrimary}
        onConfirmRemove={removeByUrl}
        isDisableAddNew={isDisableAddNew}
      />
    </div>
  );
}
