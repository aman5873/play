"use client";

import Image from "next/image";
import React, {
  forwardRef,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  CircleChevronLeft,
  CircleChevronRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  MoreVertical,
  Trash2,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { createStreamPoll, deletePost } from "@/lib/content_creator";
import { handleApiMessage } from "@/lib/auth_ops";
import { useAlert } from "@/context/AlertContext";
import { BadgeIcon } from "@/app/icons";
import AppModal from "@/components/AppModal";
import Avatar from "@/components/auth/Avatar";
import ContentEditModal from "../components/ContentEditModal";
import { useTimeAgo } from "@/hooks/useTimeAgo";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import InputComp from "@/components/Form/InputComp";
import { encodeUUID } from "@/lib/system";
// import { CardChip } from "@/components/common/CardComp";

export function UserInfo({
  postInfo,
  contClass = "",
  isFollowed = null,
  handleToggleFollow = null,
}) {
  const { lang } = useLanguage();
  const { t: tScreen } = useTranslation("screen");
  const encryptedUserId = encodeUUID(postInfo?.created_by?.id);

  const timeAgo = useTimeAgo(postInfo?.created_at);
  return (
    <div className={`flex gap-2 items-center ${contClass}`}>
      <a
        className="cursor-pointer"
        href={`${window.location.origin}/social/profile/${encryptedUserId}?lang=${lang}`}
      >
        <Avatar
          user={{ avatar_url: postInfo?.created_by?.avatar_url }}
          size={45}
        />
      </a>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <a
            className="cursor-pointer"
            href={`${window.location.origin}/social/profile/${encryptedUserId}?lang=${lang}`}
          >
            <h1 className="text-lg lg:text-lg font-semibold text-[var(--textOne)]">
              {postInfo?.created_by?.name}
            </h1>
          </a>

          {Boolean(postInfo?.created_by?.is_verified) && (
            <BadgeIcon className="text-[var(--primary)]" size={20} />
          )}

          {/* <CardChip
            label={postInfo?.created_by?.level}
            style={{
              background: "var(--textFive)",
              fontWeight: 600,
              padding: "1px 8px",
              fontSize: 14,
              height: "fit-content",
            }}
          /> */}

          {isFollowed !== null && !postInfo?.self_content && (
            <div
              onClick={handleToggleFollow}
              className="text-base font-semibold cursor-pointer"
            >
              {/* {isFollowed ? (
                <span className="text-[var(--textTwo)]">
                  {tScreen("contentCreator.profile.unfollow")}
                </span>
              ) : (
                <span className="text-[var(--bgBlue)]">
                  {tScreen("contentCreator.profile.follow")}
                </span>
              )} */}

              {!isFollowed && (
                <span className="text-[var(--bgBlue)]">
                  {tScreen("contentCreator.profile.follow")}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {postInfo?.created_by?.username && (
            <p className="text-[14px] text-[var(--textTwo)] flex items-center">
              {postInfo?.created_by?.username}{" "}
              <span className="w-[3px] h-[3px] ml-2 bg-[var(--textTwo)]"></span>
            </p>
          )}
          {timeAgo && (
            <p className="text-[14px] text-[var(--textTwo)]">{timeAgo}</p>
          )}
          <p className="text-[14px] font-semibold text-[var(--primary)]">
            {postInfo?.created_by?.achievement}
          </p>
        </div>
      </div>
    </div>
  );
}

function StreamPollComp({ show, onClose, streamId }) {
  const { t: tScreen } = useTranslation("screen");
  const initPollObj = {
    question: "",
    options: ["", ""], // minimum 2
  };
  const { showAlert } = useAlert();
  const [form, setForm] = useState(initPollObj);
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (e) => {
    setForm({ ...form, question: e.target.value });
  };

  const handleOptionChange = (value, index) => {
    const updated = [...form.options];
    updated[index] = value;
    setForm({ ...form, options: updated });
  };

  const addOption = () => {
    if (form.options.length < 4) {
      setForm({ ...form, options: [...form.options, ""] });
    }
  };

  const deleteOption = (index) => {
    if (form.options.length > 2) {
      const updated = form.options.filter((_, i) => i !== index);
      setForm({ ...form, options: updated });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Add question
    formData.append("question", form.question);

    // Add options with indexed keys: options[0], options[1], ...
    form.options.forEach((opt, index) => {
      formData.append(`options[${index}]`, opt);
    });

    try {
      setLoading(true);
      const res = await createStreamPoll({
        streamId,
        data: formData,
      });
      if (res?.success) {
        setForm(initPollObj);
        onClose();
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      handleApiMessage("Stream Poll creation failed", showAlert, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppModal
      open={show}
      onClose={onClose}
      contStyle={{ overflow: "hidden" }}
      titleClass="font-rajdhani"
      closeIconClass="top-4 right-4"
      contPadding="p-3"
      header={
        <h2 className="text-[var(--textOne)] mb-4 font-bold text-lg sm:text-xl md:text-2xl">
          {tScreen("contentCreator.stream.createPoll")}
        </h2>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
        {/* Question */}
        <InputComp
          variant="secondary"
          label={tScreen("contentCreator.stream.question")}
          type="textarea"
          rows={2}
          radius="10px"
          value={form.question}
          onChange={handleQuestionChange}
        />

        {/* Options */}
        {form.options.map((opt, index) => (
          <div key={index} className=" relative group flex items-center">
            <InputComp
              variant="secondary"
              // label={`Option ${index + 1}`}
              label={tScreen("contentCreator.stream.option", {
                index: index + 1,
              })}
              type="text"
              radius="10px"
              value={opt}
              onChange={(e) => handleOptionChange(e.target.value, index)}
            />

            {/* Delete (only if >2 options) */}
            {form.options.length > 2 && (
              <button
                type="button"
                onClick={() => deleteOption(index)}
                className="absolute right-2 top-10 cursor-pointer  opacity-0 group-hover:opacity-100 transition"
              >
                <X
                  size={18}
                  className="text-red-400 hover:text-red-500 font-bold"
                />
              </button>
            )}
          </div>
        ))}

        {/* Add Option Button */}
        {form.options.length < 4 && (
          <button
            type="button"
            onClick={addOption}
            className="cursor-pointer mt-3 text-sm font-semibold text-[var(--textTwo)] hover:text-[var(--textOne)]"
          >
            {tScreen("contentCreator.stream.addOption")}
          </button>
        )}

        <button
          disabled={loading}
          type="submit"
          className="cursor-pointer w-full px-6 py-2 rounded-[100px] bg-[var(--primary)] text-[var(--secondary)] font-rajdhani font-bold transition duration-200 hover:shadow-[0_0_4px_var(--primary)]"
        >
          {loading
            ? tScreen("contentCreator.post.processing") || "Processing..."
            : tScreen("contentCreator.stream.submit")}
        </button>
      </form>
    </AppModal>
  );
}

function PostConfirmDeleteModal({ show, onClose, onDelete, postToDelete }) {
  const { t: tScreen } = useTranslation("screen");
  const { showAlert } = useAlert();
  const handleConfirmDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res?.success) {
        handleApiMessage(res?.message, showAlert, "success");
        if (onDelete) {
          onDelete(postToDelete);
        }
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };
  return (
    <AppModal
      open={show}
      onClose={onClose}
      showCloseIcon={false}
      contPadding="p-0"
      contStyle={{ overflow: "hidden" }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="p-6 text-center">
          <p className="text-lg font-medium text-[var(--text)]">
            {tScreen("contentCreator.post.deletePostTitle")}
          </p>
          <p className="text-sm text-[var(--textTwo)] mt-1">
            {tScreen("contentCreator.post.deletePostSubTitle")}
          </p>
        </div>

        <button
          onClick={() => {
            handleConfirmDeletePost(postToDelete?.id);
            onClose();
          }}
          className="cursor-pointer w-full py-3 text-red-400  text-base font-medium border-t border-[var(--borderThree)] hover:bg-[var(--bgThree)]"
        >
          {tScreen("contentCreator.post.delete")}
        </button>
        <button
          onClick={() => onClose()}
          className="cursor-pointer w-full py-3 text-base font-medium border-t border-[var(--borderThree)] text-[var(--text)] hover:bg-[var(--bgThree)]"
        >
          {tScreen("contentCreator.post.cancel")}
        </button>
      </div>
    </AppModal>
  );
}
export function PostMenu({
  obj,
  isCreator = false,
  onDelete,
  handleRefresh,
  isFollowed,
  handleToggleFollow,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isPostPage = pathname.includes("/social/post/");

  const { isAuthenticated } = useAuth();
  const { lang } = useLanguage();
  const { t: tScreen } = useTranslation("screen");
  const { showAlert } = useAlert();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [postToDelete, setPostToDelete] = useState(null);
  const [postToEdit, setPostToEdit] = useState(null);

  // post-page url
  const encryptedId = encodeUUID(obj?.id);
  const encryptedUserId = encodeUUID(obj?.created_by?.id);
  const postLink = `/social/post/${encryptedId}?lang=${lang}`;
  const postUrl = `${window.location.origin}${postLink}`;

  // ---- Copy link handler ----
  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    showAlert(tScreen("contentCreator.post.linkCopied"), "success");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: tScreen("contentCreator.post.checkoutPost"),
          text: obj?.description ?? tScreen("contentCreator.post.checkoutPost"),
          url: postUrl,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(postUrl);
      showAlert(tScreen("contentCreator.post.linkCopiedToClipboard"), "info");
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // --- Menu items ---
  const menuItems = useMemo(() => {
    return [
      ...(isFollowed
        ? [
            {
              label: tScreen("contentCreator.profile.unfollow"),
              onClick: () => handleToggleFollow(obj?.id),
              type: "danger",
            },
          ]
        : []),

      ...(!isPostPage
        ? [
            {
              label: tScreen("contentCreator.post.goToPost"),
              onClick: () => router.push(postLink),
            },
          ]
        : []),

      {
        label: tScreen("contentCreator.post.copyLink"),
        onClick: handleCopyLink,
      },

      {
        label: tScreen("contentCreator.post.share"),
        onClick: handleShare,
      },

      {
        label: tScreen("contentCreator.post.aboutThisAccount"),
        onClick: () =>
          router.push(`/social/profile/${encryptedUserId}?lang=${lang}`),
      },

      ...(isCreator
        ? [
            {
              label: tScreen("contentCreator.post.deletePost"),
              onClick: () => setPostToDelete(obj),
              type: "danger",
            },
            {
              label: tScreen("contentCreator.post.editPost"),
              onClick: () => setPostToEdit(obj),
            },
          ]
        : []),
    ];
  }, [
    isAuthenticated,
    isFollowed,
    isPostPage,
    isCreator,
    obj, // needed: nested ids change
    obj?.id,
    obj?.created_by?.id,
    tScreen,
    router,
    handleCopyLink,
    handleShare,
    handleToggleFollow,
    setPostToDelete,
    setPostToEdit,
  ]);

  return (
    <>
      {/* Delete confirm modal */}
      <PostConfirmDeleteModal
        show={Boolean(postToDelete)}
        onClose={() => setPostToDelete(null)}
        onDelete={onDelete}
        postToDelete={postToDelete}
      />

      <ContentEditModal
        show={Boolean(postToEdit)}
        onClose={() => setPostToEdit(null)}
        postInfo={postToEdit}
        handleRefresh={handleRefresh}
      />

      {/* Main menu */}
      <div ref={menuRef} className="relative">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="cursor-pointer p-1 hover:bg-[var(--bgThree)] rounded-full transition"
        >
          <MoreVertical className="w-5 h-5 text-[var(--textTwo)]" />
        </button>

        <AppModal
          open={Boolean(menuOpen)}
          onClose={() => setMenuOpen(false)}
          showCloseIcon={false}
          contPadding="p-0"
          contStyle={{ overflow: "hidden" }}
        >
          <div className="flex flex-col text-sm text-[var(--textOne)]">
            {menuItems.map((item, i) => {
              const isDestructive = item?.type === "danger";
              return (
                <button
                  key={i}
                  onClick={() => {
                    setMenuOpen(false);
                    item.onClick?.();
                  }}
                  className={`cursor-pointer w-full px-4 py-3 text-center font-medium text-base border-t first:border-none border-[var(--borderThree)]  transition ${
                    isDestructive
                      ? "text-red-400 hover:bg-[var(--bgThree)]"
                      : "hover:bg-[var(--bgThree)]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer w-full px-4 py-3 text-base font-medium text-center  border-t border-[var(--borderThree)] hover:bg-[var(--bgThree)] transition"
            >
              {tScreen("contentCreator.post.cancel")}
            </button>
          </div>
        </AppModal>
      </div>
    </>
  );
}

export function StreamMenu({ obj }) {
  const router = useRouter();
  const pathname = usePathname();
  const isPostPage = pathname.includes("/social/stream/");
  const { isAuthenticated } = useAuth();

  const { lang } = useLanguage();
  const { t: tScreen } = useTranslation("screen");
  const { showAlert } = useAlert();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const menuRef = useRef(null);

  // stream-page url
  const encryptedUserId = encodeUUID(obj?.user_id);
  const streamLink = `/social/stream/${encryptedUserId}?lang=${lang}`;

  // ---- Copy link handler ----
  const handleCopyLink = () => {
    const postUrl = `${window.location.origin}${streamLink}`;
    navigator.clipboard.writeText(postUrl);
    showAlert(tScreen("contentCreator.post.linkCopied"), "success");
  };

  const handleShare = () => {
    const postUrl = `${window.location.origin}${streamLink}`;
    if (navigator.share) {
      navigator
        .share({
          title: obj?.title || "",
          text:
            obj?.game_name || tScreen("contentCreator.stream.checkoutStream"),
          url: postUrl,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(postUrl);
      showAlert(tScreen("contentCreator.post.linkCopiedToClipboard"), "info");
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // --- Menu items ---
  const menuItems = useMemo(() => {
    return [
      ...(!isPostPage
        ? [
            {
              label: tScreen("contentCreator.stream.goToStream"),
              onClick: () => router.push(streamLink),
            },
          ]
        : []),

      {
        label: tScreen("contentCreator.post.copyLink"),
        onClick: handleCopyLink,
      },
      {
        label: tScreen("contentCreator.post.share"),
        onClick: handleShare,
      },

      {
        label: tScreen("contentCreator.post.aboutThisAccount"),
        onClick: () =>
          router.push(`/social/profile/${encryptedUserId}?lang=${lang}`),
      },
      ...(obj?.stream_owner && !obj?.poll
        ? [
            {
              label: tScreen("contentCreator.stream.createAPoll"),
              onClick: () => setShowCreatePoll(true),
            },
          ]
        : []),
    ];
  }, [
    isAuthenticated,
    isPostPage,
    obj?.user_id,
    tScreen, // REQUIRED
    router,
    obj?.stream_owner,
    obj?.poll,
    handleCopyLink,
    handleShare,
  ]);

  return (
    <>
      <StreamPollComp
        streamId={obj?.id}
        show={showCreatePoll}
        onClose={() => setShowCreatePoll(false)}
      />
      {/* Main menu */}
      <div ref={menuRef} className="relative">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="cursor-pointer p-1 hover:bg-[var(--bgThree)] rounded-full transition"
        >
          <MoreVertical className="w-5 h-5 text-[var(--textTwo)]" />
        </button>

        <AppModal
          open={Boolean(menuOpen)}
          onClose={() => setMenuOpen(false)}
          showCloseIcon={false}
          contPadding="p-0"
          contStyle={{ overflow: "hidden" }}
        >
          <div className="flex flex-col text-sm text-[var(--textOne)]">
            {menuItems.map((item, i) => {
              const isDestructive = false;
              // const isDestructive = item?.type === "danger";
              return (
                <button
                  key={i}
                  onClick={() => {
                    setMenuOpen(false);
                    item.onClick?.();
                  }}
                  className={`cursor-pointer w-full px-4 py-3 text-center font-medium text-base border-t first:border-none border-[var(--borderThree)]  transition ${
                    isDestructive
                      ? "text-red-400 hover:bg-[var(--bgThree)]"
                      : "hover:bg-[var(--bgThree)]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer w-full px-4 py-3 text-base font-medium text-center  border-t border-[var(--borderThree)] hover:bg-[var(--bgThree)] transition"
            >
              {tScreen("contentCreator.post.cancel")}
            </button>
          </div>
        </AppModal>
      </div>
    </>
  );
}

export function PostMedia({
  media = [],
  height = "",
  contClass = "",
  aspect = "aspect-[2.5/1]",
  onRemove = null,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // 🧱 Glass Wrapper (handles height + optional aspect)
  const GlassWrapper = ({
    children,
    isImage = false,
  }: {
    children: React.ReactNode;
    isImage?: boolean;
  }) => {
    const isTailwindHeight = height?.startsWith("h-");
    return (
      <div
        className={`relative w-full max-w-full overflow-hidden rounded-xl inset-0 backdrop-blur-md bg-[var(--borderTwo)] ${
          isImage ? aspect : ""
        } ${isTailwindHeight ? height : ""}`}
        style={!isTailwindHeight && height ? { height } : {}}
      >
        <div className="relative z-10 w-full h-full rounded-xl">{children}</div>
      </div>
    );
  };

  // 🖼️ Image Card
  const ImageCard = memo(({ obj, index }: { obj: any; index: number }) => (
    <GlassWrapper isImage>
      {/* Delete Icon */}
      {onRemove && media.length > 1 && (
        <button
          onClick={() => onRemove(obj, index)}
          className="absolute top-2 right-2 z-20 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full transition"
        >
          <Trash2 size={18} />
        </button>
      )}

      <Image
        src={obj.url}
        alt="post image"
        fill
        className="object-contain rounded-xl transition-transform duration-500 ease-in-out"
        sizes="(max-width: 650px) 100vw, 650px"
      />
    </GlassWrapper>
  ));
  ImageCard.displayName = "ImageCard";

  // 🎥 Video Card
  const VideoCard = memo(
    forwardRef<HTMLVideoElement, { obj: any; index: number }>(
      ({ obj, index }, forwardedRef) => {
        const ref = useRef<HTMLVideoElement | null>(null);
        const [showIcon, setShowIcon] = useState<"play" | "pause" | null>(null);
        const [isMuted, setIsMuted] = useState(true);

        useEffect(() => {
          if (ref.current) videoRefs.current[index] = ref.current;
        }, [index]);

        const showFeedback = (type: "play" | "pause") => {
          setShowIcon(type);
          setTimeout(() => setShowIcon(null), 500);
        };

        const handleTogglePlay = () => {
          const vid = ref.current;
          if (!vid) return;
          if (vid.paused) {
            vid
              .play()
              .then(() => showFeedback("play"))
              .catch(() => {});
          } else {
            vid.pause();
            showFeedback("pause");
          }
        };

        const handleToggleMute = (e: React.MouseEvent) => {
          e.stopPropagation();
          const vid = ref.current;
          if (!vid) return;
          const newMuted = !isMuted;
          vid.muted = newMuted;
          setIsMuted(newMuted);
        };

        return (
          <GlassWrapper>
            {/* Delete Icon */}
            {onRemove && media.length > 1 && (
              <button
                onClick={() => onRemove(obj, index)}
                className="absolute top-2 right-2 z-20 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full transition"
              >
                <Trash2 size={18} />
              </button>
            )}

            <video
              ref={(el) => {
                ref.current = el;
                if (typeof forwardedRef === "function") forwardedRef(el);
                else if (forwardedRef) forwardedRef.current = el;
              }}
              src={obj.url}
              playsInline
              muted={isMuted}
              preload="metadata"
              className="w-full h-full object-contain rounded-xl cursor-pointer"
              onClick={handleTogglePlay}
              onEnded={() => {
                if (ref.current) {
                  ref.current.pause();
                  ref.current.currentTime = 0;
                }
                showFeedback("pause");
              }}
            />

            {/* Mute/Unmute */}
            <button
              onClick={handleToggleMute}
              className="absolute bottom-3 right-3 z-20 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition"
            >
              {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </button>

            {/* Play/Pause Feedback */}
            <AnimatePresence>
              {showIcon && (
                <motion.div
                  key="centericon"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="bg-black/50 rounded-full p-4 text-white">
                    {showIcon === "play" ? (
                      <Play size={36} />
                    ) : (
                      <Pause size={36} />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassWrapper>
        );
      }
    )
  );
  VideoCard.displayName = "VideoCard";

  const LiveStreamCard = memo(({ obj, index }: { obj: any; index: number }) => {
    const autoplayUrl = `${obj.embed_url}&autoplay=true&muted=true&controls=true`;

    return (
      <GlassWrapper isImage>
        <iframe
          id={`player-${index}`}
          src={autoplayUrl}
          allow="autoplay; encrypted-media; fullscreen"
          className="w-full h-full rounded-xl"
        />
      </GlassWrapper>
    );
  });

  LiveStreamCard.displayName = "LiveStreamCard";

  // 🧠 Memoized Media Rendering
  const memoizedMedia = useMemo(
    () =>
      media.map((obj, i) => {
        if (obj.type === "video")
          return <VideoCard obj={obj} index={i} key={obj.id || obj.url} />;

        if (obj.type === "live_stream")
          return <LiveStreamCard obj={obj} index={i} key={obj.id} />;

        return <ImageCard obj={obj} index={i} key={obj.id || obj.url} />;
      }),
    [media, onRemove]
  );

  // 🧾 No media
  if (!media?.length) return null;
  // Single media
  if (media.length === 1) return memoizedMedia[0];

  // 🌀 Swiper for multiple media
  return (
    <div className={`relative w-full max-w-full ${contClass}`}>
      <Swiper
        modules={[Pagination, Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full h-full"
        pagination={{
          clickable: true,
          renderBullet: (_, className) =>
            `<span class="${className} custom-bullet"></span>`,
        }}
        navigation={{
          nextEl: ".custom-swiper-next",
          prevEl: ".custom-swiper-prev",
        }}
        slidesPerView={1}
        speed={600}
      >
        {memoizedMedia.map((item, i) => (
          <SwiperSlide key={i} className="w-full h-auto">
            {item}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Arrows */}
      {activeIndex > 0 && (
        <div
          className="custom-swiper-prev absolute left-2 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <CircleChevronLeft
            size={30}
            className="text-[var(--textOne)] opacity-90 drop-shadow"
          />
        </div>
      )}

      {activeIndex < media.length - 1 && (
        <div
          className="custom-swiper-next absolute right-2 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <CircleChevronRight
            size={30}
            className="text-[var(--textOne)] opacity-90 drop-shadow"
          />
        </div>
      )}
    </div>
  );
}
