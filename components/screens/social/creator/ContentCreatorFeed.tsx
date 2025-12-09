"use client";
import { BadgeIcon } from "@/app/icons";
import Avatar from "@/components/auth/Avatar";
import { CardChip } from "@/components/common/CardComp";
import InputComp from "@/components/Form/InputComp";
import { useAuth } from "@/context/AuthContext";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  X,
  MoreHorizontal,
} from "lucide-react";

import AppModal from "@/components/AppModal";
import {
  getPost,
  createPost,
  toggleLikePost,
  createComment,
  getComments,
  toggleLikeComment,
  toggleFollowAccount,
  deleteComment,
} from "@/lib/content_creator";
import { handleApiMessage } from "@/lib/auth_ops";
import { useAlert } from "@/context/AlertContext";
import { useTimeAgo } from "@/hooks/useTimeAgo";
import { useLanguage } from "@/context/LanguageContext";

import { PostMedia, PostMenu, UserInfo } from "./PostComponents";
import ContentCreatorTopComp from "@components/screens/social/components/ContentCreatorTopComp";
import { SuggestionList } from "@components/screens/social/components/FollowListModal";
import LiveStreamFeed from "@components/screens/social/components/LiveStreamFeed";
import MobileSuggestionComp from "@components/screens/social/components/MobileSuggestionComp";
import { encodeUUID } from "@/lib/system";

function ShareExperience({ setRefreshPosts }) {
  const { user } = useAuth();
  const { t: tScreen } = useTranslation("screen");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const suggestions = [
    tScreen("contentCreator.home.shareMoment"),
    tScreen("contentCreator.home.justHitNewRank"),
    tScreen("contentCreator.home.goingLive"),
    tScreen("contentCreator.home.newSetupReveal"),
  ];

  const handleSubmit = async () => {
    if (loading) return;
    const formData = new FormData();
    formData.append("description", description);
    formData.append("type", "text");
    try {
      setLoading(true);
      const res = await createPost(formData);
      if (res?.success) {
        handleApiMessage(res?.message, showAlert, "success");
        setRefreshPosts(true);
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      console.error("Create post failed", err);
      handleApiMessage("Create post failed", showAlert, "error");
    } finally {
      setLoading(false); // always reset
    }
  };
  return (
    <div
      className={`gradient-one border p-4 overflow-hidden rounded-xl flex flex-col gap-3 border-[var(--borderThree)]`}
    >
      <div className="flex gap-4">
        <div>
          <Avatar
            size={60}
            user={user}
            contClass="border-2 border-[var(--primary)]"
          />
        </div>

        <InputComp
          name="description"
          type="textarea"
          required
          radius="10px"
          variant="secondaryTwo"
          rows={2}
          value={description ?? ""}
          onChange={(e: any) => setDescription(e.target.value)}
        />
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="cursor-pointer w-fit text-[var(--primary)] font-semibold flex items-center justify-center transition-all hover:scale-[1.10] hover:opacity-95 duration-300 shadow-md"
        >
          <Send className="w-6 h-6" />
          {/* Post */}
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {suggestions?.map((label, index) => {
          return (
            <CardChip
              key={`key-${index}`}
              label={label}
              onClick={() => setDescription(label)}
            />
          );
        })}
      </div>
    </div>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="animate-pulse bg-[var(--bgTwo)] border border-[var(--borderThree)] w-full rounded-lg p-4 mb-3 w-full ">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-[var(--textTwo)] rounded-full" />
        <div className="h-4 w-1/3 bg-[var(--textTwo)] rounded" />
      </div>
      <div className="h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 w-full bg-[var(--textTwo)] rounded-md" />
      <div className="h-4 w-1/2 bg-[var(--textTwo)] rounded mt-3" />
    </div>
  );
}

export function PostCard({
  obj,
  handleViewComments = null,
  contClass = "gradient-one border  rounded-xl border-[var(--borderThree)] p-4",
  // mediaHeight = "h-80",
  // mediaAspect = "aspect-[2/1]",
  mediaHeight = "h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96",
  mediaAspect = "aspect-[4/3] sm:aspect-[3/2] md:aspect-[16/9]",
  showInstantComment = true,
  onDelete = null,
  handleRefresh = null,
  handleRefreshUpdatePost = null,
  handleRefreshOnFollow = null,
}) {
  const { user, setLoginOpen, isAuthenticated } = useAuth();
  const { t: tScreen } = useTranslation("screen");
  const { showAlert } = useAlert();
  const { lang } = useLanguage();

  const [isLiked, setIsLiked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const encryptedId = encodeUUID(obj?.id);
  const handleShare = () => {
    const postUrl = `${window.location.origin}/social/post/${encryptedId}?lang=${lang}`;
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

  async function handleToggleLike(id, obj) {
    if (isAuthenticated) {
      try {
        setLoading(true);
        handleLike();
        const res = await toggleLikePost(id);
        if (res?.success) {
          if (handleRefreshUpdatePost) {
            handleRefreshUpdatePost({
              ...obj,
              is_liked: !obj?.is_liked,
              like: !obj?.is_liked
                ? (obj?.like ?? 0) + 1
                : Math.max((obj?.like ?? 0) - 1, 0),
            });
          }
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
    } else {
      setLoginOpen(true);
    }
  }
  async function handleToggleFollow(id, obj) {
    if (isAuthenticated) {
      try {
        setLoading(true);
        setIsFollowed(!isFollowed);
        const res = await toggleFollowAccount(id);
        if (res?.success) {
          if (handleRefreshUpdatePost) {
            handleRefreshUpdatePost({
              ...obj,
              is_followed: !obj?.is_followed,
            });
            if (handleRefreshOnFollow) {
              handleRefreshOnFollow({
                ...obj,
                is_followed: !obj?.is_followed,
              });
            }
          }
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
    } else {
      setLoginOpen(true);
    }
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      const data = {
        content_item_id: obj?.id,
        content: comment,
        parent_id: null,
      };
      try {
        setLoading(true);
        const res = await createComment(data);
        if (res?.success) {
          setComment("");
          setCommentCount((prev) => prev + 1);
        } else {
          handleApiMessage(res?.message, showAlert, "error");
        }
      } catch (err) {
        console.error("comment failed", err);
        handleApiMessage("comment failed", showAlert, "error");
      } finally {
        setLoading(false);
      }
    } else {
      setLoginOpen(true);
    }
  };

  useEffect(() => {
    setIsLiked(obj?.is_liked);
    setIsFollowed(obj?.is_followed);

    // if (obj?.comment) setComment(obj.comment);
    setLikeCount(obj?.like || 0);
    setCommentCount(obj?.comment || 0);
  }, [obj]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => prev + (isLiked ? -1 : 1));

    // Trigger scale animation
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300); // animation duration
  };

  return (
    <div className={`w-full flex flex-col gap-3 ${contClass}`}>
      <div className="flex gap-2  justify-between items-center">
        <UserInfo
          postInfo={obj}
          isFollowed={isFollowed}
          handleToggleFollow={() => {
            handleToggleFollow(obj?.created_by?.id, obj);
          }}
        />

        <PostMenu
          isCreator={obj?.created_by?.id === user?.id}
          obj={obj}
          onDelete={onDelete}
          handleRefresh={handleRefresh}
          isFollowed={isFollowed}
          handleToggleFollow={() => {
            handleToggleFollow(obj?.created_by?.id, obj);
          }}
        />
      </div>

      <p className="text-md text-[var(--textOne)] whitespace-pre-line">
        {obj?.description}
      </p>
      <PostMedia media={obj?.media} height={mediaHeight} aspect={mediaAspect} />

      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <div
            className={`flex items-center gap-1 text-[var(--textTwo)] cursor-pointer`}
            onClick={() => !loading && handleToggleLike(obj?.id, obj)}
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked ? "text-[var(--bgFour)] fill-[var(--bgFour)]" : ""
              } ${
                animating
                  ? "scale-125 transition-transform duration-300"
                  : "transition-transform duration-300"
              }`}
            />
            <span className="select-none min:w-6">
              {likeCount !== 0 ? likeCount : ""}
            </span>
          </div>

          <div
            onClick={() => {
              if (handleViewComments) {
                if (isAuthenticated) {
                  handleViewComments(obj);
                } else {
                  setLoginOpen(true);
                }
              }
            }}
            className="flex items-center gap-1 text-[var(--textTwo)] cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="select-none">
              {commentCount !== 0 ? commentCount : ""}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleShare}
          disabled={loading}
          className="border cursor-pointer w-fit px-3 gap-1 py-1 border-[var(--borderTwo)] bg-[var(--bgTwo)] rounded-full flex items-center justify-center transition-all hover:scale-[1.10] hover:opacity-95 duration-300 shadow-md"
        >
          <span>{tScreen("contentCreator.post.share")}</span>
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {showInstantComment && (
        <form onSubmit={handleSubmitComment} className="flex gap-4">
          <div>
            <Avatar
              size={40}
              user={user}
              contClass="border-1 border-[var(--primary)]"
            />
          </div>
          <InputComp
            name="comment"
            placeholder={tScreen("contentCreator.post.dropComment")}
            type="text"
            required
            radius="50px"
            variant="secondaryTwo"
            rows={2}
            value={comment ?? ""}
            onChange={(e: any) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="cursor-pointer w-fit text-[var(--primary)] flex items-center justify-center transition-all hover:scale-[1.10] hover:opacity-95 duration-300 shadow-md"
          >
            <Send className="w-6 h-6" />
          </button>
        </form>
      )}
    </div>
  );
}

export function PostCommentMenu({
  commentObj,
  isCreator = false,
  handleRefreshComments,
}) {
  const { t: tScreen } = useTranslation("screen");
  const { showAlert } = useAlert();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  /** 🧹 Delete Comment */
  async function handleCommentDelete(id) {
    try {
      const res = await deleteComment(id);
      if (res?.success) {
        handleRefreshComments?.();
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      console.error("comment delete failed", err);
      handleApiMessage("comment delete failed", showAlert, "error");
    }
  }

  // --- Menu items ---
  const menuItems = [
    ...(isCreator
      ? [
          {
            label: tScreen("contentCreator.post.delete"),
            onClick: () => handleCommentDelete(commentObj?.id),
            type: "danger",
          },
        ]
      : []),
  ];

  if (!isCreator) return null;

  return (
    <div ref={menuRef} className="relative group">
      {/* --- Horizontal 3 Dots Button --- */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className={`
          p-1 rounded-full transition hover:bg-[var(--bgThree)]
          text-[var(--textTwo)] cursor-pointer
          sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity
          sm:duration-200 sm:ease-in-out
        `}
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      {/* --- Force always visible on mobile --- */}
      <style jsx>{`
        @media (max-width: 640px) {
          button {
            opacity: 1 !important;
          }
        }
      `}</style>

      {/* --- Modal Menu --- */}
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
                className={`cursor-pointer w-full px-4 py-3 text-center font-medium text-base border-t first:border-none border-[var(--borderThree)] transition ${
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
            className="cursor-pointer w-full px-4 py-3 text-base font-medium text-center border-t border-[var(--borderThree)] hover:bg-[var(--bgThree)] transition"
          >
            {tScreen("contentCreator.post.cancel")}
          </button>
        </div>
      </AppModal>
    </div>
  );
}

function CommentCard({ commentObj, handleReply, handleRefreshComments }) {
  const { t: tScreen } = useTranslation("screen");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showReplies, setShowReplies] = useState(false);
  const { showAlert } = useAlert();
  const { lang } = useLanguage();
  const { user } = useAuth();

  const encryptedUserId = encodeUUID(commentObj?.user?.id);
  const timeAgo = useTimeAgo(commentObj?.created_at);

  async function handleToggleCommentLike(id) {
    try {
      onLike();
      const res = await toggleLikeComment(id);
      if (!res?.success) {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      console.error("comment like failed", err);
    }
  }

  const onLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => prev + (isLiked ? -1 : 1));
  };

  useEffect(() => {
    setIsLiked(commentObj?.is_liked || false);
    setLikeCount(commentObj?.like_count || 0);
  }, [commentObj]);

  return (
    <div className="flex flex-col gap-2 pl-4 border-l border-[var(--borderThree)]">
      {/* Main Comment  */}
      <div className="flex gap-2 items-start">
        <a
          className="cursor-pointer"
          href={`${window.location.origin}/social/user/${encryptedUserId}?lang=${lang}`}
        >
          <Avatar size={35} user={commentObj?.user} />
        </a>

        <div className="flex flex-col gap-1 w-full">
          <a
            className="flex gap-2 items-center cursor-pointer"
            href={`${window.location.origin}/social/profile/${encryptedUserId}?lang=${lang}`}
          >
            <h1 className="font-semibold text-[var(--textOne)] text-sm">
              {commentObj?.user?.name}
            </h1>
            {Boolean(commentObj?.user?.is_verified) && (
              <BadgeIcon className="text-[var(--primary)]" size={15} />
            )}
          </a>

          <p className="text-[var(--textOne)] text-sm">{commentObj.content}</p>
          <div className="flex gap-3  items-center mt-1">
            <div
              className="flex gap-1 items-center cursor-pointer text-[var(--textTwo)]"
              onClick={() => handleToggleCommentLike(commentObj?.id)}
            >
              <Heart
                className={`w-4 h-4 ${
                  isLiked ? "fill-[var(--bgFour)] text-[var(--bgFour)]" : ""
                }`}
              />
              {Boolean(likeCount) && (
                <span className="text-xs">{likeCount}</span>
              )}
            </div>
            <span className="w-[3px] h-[3px] bg-[var(--textTwo)]"></span>
            {timeAgo && (
              <p className="text-[14px] text-[var(--textTwo)]">{timeAgo}</p>
            )}
            <span className="w-[3px] h-[3px] bg-[var(--textTwo)]"></span>

            <button
              className="text-[var(--textOne)] text-xs cursor-pointer"
              onClick={() => handleReply(commentObj)}
            >
              {tScreen("contentCreator.post.reply")}
            </button>
            <PostCommentMenu
              commentObj={commentObj}
              isCreator={user?.id === commentObj?.user?.id}
              handleRefreshComments={handleRefreshComments}
            />
          </div>
        </div>
      </div>

      {/* View Replies */}
      {commentObj?.replies?.length > 0 && !showReplies && (
        <button
          className="text-[var(--textTwo)] text-xs ml-10 mt-1 cursor-pointer hover:underline flex items-center"
          onClick={() => setShowReplies(true)}
        >
          <span className="border-t border-gray-100 opacity-20 w-6 mr-1" />
          <span>
            {tScreen("contentCreator.post.view")} {commentObj.replies.length}{" "}
            {commentObj.replies.length === 1 ? "reply" : "replies"}
          </span>
        </button>
      )}

      {/* Recursive Nested Replies */}
      {showReplies &&
        commentObj?.replies?.map((reply) => (
          <div key={reply.id}>
            <CommentCard
              commentObj={reply}
              handleReply={handleReply}
              handleRefreshComments={handleRefreshComments}
            />
          </div>
        ))}
    </div>
  );
}

export function PostDetailCard({
  show,
  onClose,
  postInfo,
  isPage = false,
  onDelete = null,
  handleRefresh,
  handleRefreshUpdatePost = null,
  handleRefreshOnFollow = null,
}) {
  const { user, isAuthenticated, setLoginOpen } = useAuth();
  const { showAlert } = useAlert();
  const { t: tScreen } = useTranslation("screen");

  const [localPostInfo, setLocalPostInfo] = useState(postInfo);
  const [commentList, setCommentList] = useState([]);
  const [replyTarget, setReplyTarget] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  /** Fetch Comments */
  const fetchComments = async (postId) => {
    try {
      setLoading(true);
      const res = await getComments(postId);
      if (res?.success) {
        setCommentList(res?.data);
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      console.error("fetch comments failed", err);
      handleApiMessage("fetch comments failed", showAlert, "error");
    } finally {
      setLoading(false);
    }
  };

  /** Handle Comment Submit */
  const handleSubmitComment = async (e) => {
    e?.preventDefault();

    if (isAuthenticated) {
      const data = replyTarget
        ? {
            content_item_id: replyTarget?.content_item_id,
            content: commentText,
            parent_id: replyTarget?.id,
          }
        : {
            content_item_id: postInfo?.id,
            content: commentText,
            parent_id: null,
          };

      try {
        setLoading(true);
        const res = await createComment(data);
        if (res?.success) {
          setCommentText("");
          setReplyTarget(null);
          fetchComments(postInfo?.id);

          // ✅ Instantly update comment count locally in modal
          setLocalPostInfo((prev) => ({
            ...prev,
            comment: (prev?.comment || 0) + 1,
          }));

          // ✅ Also notify parent if provided
          handleRefreshUpdatePost?.({
            ...postInfo,
            comment: (postInfo?.comment || 0) + 1,
          });
        } else {
          handleApiMessage(res?.message, showAlert, "error");
        }
      } catch (err) {
        console.error("comment failed", err);
        handleApiMessage("comment failed", showAlert, "error");
      } finally {
        setLoading(false);
      }
    } else {
      setLoginOpen(true);
    }
  };

  /** Load Comments on Open */
  useEffect(() => {
    if (show && postInfo?.id) {
      fetchComments(postInfo?.id);
    }
  }, [postInfo?.id, show]);

  const handleReply = (replyObj) => {
    setReplyTarget(replyObj);
  };

  /** Prevent Back Navigation */
  useEffect(() => {
    if (show) {
      window.history.pushState({ modalOpen: true }, "");
      const handleBack = (event) => {
        event.preventDefault();
        onClose?.();
      };
      window.addEventListener("popstate", handleBack);

      return () => {
        window.removeEventListener("popstate", handleBack);
        if (window.history.state?.modalOpen) {
          window.history.go(1);
        }
      };
    }
  }, [show]);

  useEffect(() => {
    setLocalPostInfo(postInfo);
  }, [postInfo]);

  /** Footer (comment input) */
  const footer = useMemo(
    () => (
      <div className="flex flex-col gap-1 w-full">
        {replyTarget && !loading && (
          <div className="flex justify-between items-center bg-[var(--bgTwo)] text-xs px-3 py-1.5 rounded-md mb-1">
            <span>
              {tScreen("contentCreator.post.replyingTo")}{" "}
              <span className="font-semibold text-[var(--textOne)]">
                {replyTarget.user?.name}
              </span>
            </span>
            <button
              onClick={() => {
                setReplyTarget(null);
                setCommentText("");
              }}
              className="text-[var(--textTwo)] hover:text-[var(--textOne)] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex gap-3 items-center mt-2 relative">
            <div className="relative inset-y-0 right-3 flex items-center">
              <div className="w-4 h-4 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => !loading && handleSubmitComment(e)}
            className="flex gap-3 items-center mt-2"
          >
            <div>
              <Avatar size={40} user={user} />
            </div>
            <InputComp
              name="comment"
              placeholder={
                replyTarget
                  ? `${tScreen("contentCreator.post.replyingTo")} ${
                      replyTarget?.user?.name
                    }`
                  : tScreen("contentCreator.post.dropComment")
              }
              type="text"
              radius="50px"
              variant="secondaryTwo"
              rows={2}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              type="submit"
              className="cursor-pointer w-fit text-[var(--primary)] flex items-center justify-center"
              // onClick={(e) => !loading && handleSubmitComment(e)}
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        )}
      </div>
    ),
    [commentText, replyTarget, user, loading]
  );

  /** 💀 Skeleton Loader for Comments */
  const renderSkeleton = () => (
    <div className="flex flex-col gap-4 mt-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-start gap-2 pl-4 border-l border-[var(--borderThree)]"
        >
          <div className="w-9 h-9 rounded-full bg-[var(--bgTwo)]" />
          <div className="flex flex-col gap-2 w-full">
            <div className="h-3 w-3/4 bg-[var(--bgTwo)] rounded" />
          </div>
        </div>
      ))}
    </div>
  );

  /** Render Comments or Skeleton */
  const renderComments = () => {
    if (loading) return renderSkeleton();
    if (commentList.length === 0)
      return (
        <p className="text-center text-[var(--textTwo)]">
          {tScreen("contentCreator.post.noCommentsYet")}
        </p>
      );
    return commentList.map((commentObj) => (
      <CommentCard
        key={commentObj.id}
        commentObj={commentObj}
        handleReply={handleReply}
        handleRefreshComments={() => {
          fetchComments(postInfo?.id);
        }}
      />
    ));
  };

  /** Main Layout */
  return (
    <>
      {isPage ? (
        <div className="rounded-[16px] p-6 gradient-one border-[1px] border-[var(--borderThree)] shadow-xl flex flex-col m-4">
          <PostCard
            obj={localPostInfo}
            contClass="p-2"
            showInstantComment={false}
            onDelete={onDelete}
            handleRefresh={handleRefresh}
            handleRefreshOnFollow={handleRefreshOnFollow}
            handleRefreshUpdatePost={(updatedPost) => {
              // ✅ instantly update local modal state
              setLocalPostInfo((prev) => ({
                ...prev,
                ...updatedPost,
              }));
              // ✅ also notify parent if provided
              handleRefreshUpdatePost?.(updatedPost);
            }}
          />
          <div className="mt-4 flex flex-col gap-4 mb-5">
            {renderComments()}
          </div>
          {footer}
        </div>
      ) : (
        <AppModal
          open={show}
          onClose={onClose}
          contClass="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-2xl pt-12"
          closeIconClass="top-5 right-5 z-[20]"
          footer={footer}
        >
          <PostCard
            obj={localPostInfo}
            contClass="p-2"
            showInstantComment={false}
            onDelete={onDelete}
            handleRefresh={handleRefresh}
            handleRefreshOnFollow={handleRefreshOnFollow}
            handleRefreshUpdatePost={(updatedPost) => {
              // ✅ instantly update local modal state
              setLocalPostInfo((prev) => ({
                ...prev,
                ...updatedPost,
              }));

              // ✅ also notify parent if provided
              handleRefreshUpdatePost?.(updatedPost);
            }}
          />
          <div className="mt-4 flex flex-col gap-4">{renderComments()}</div>
        </AppModal>
      )}
    </>
  );
}

export function AllPostsFeed({ refreshPosts, setRefreshPosts }) {
  const { t: tScreen } = useTranslation("screen");
  const { showAlert } = useAlert();
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  const [postList, setPostList] = useState<any[]>([]);
  const [meta, setMeta] = useState({ current_page: 1, per_page: 10 });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showComments, setShowComments] = useState<any | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const fetchLock = useRef(false); // ✅ single point guard
  const isFirstRun = useRef(true);

  const PAGE_SIZE = 10;
  const SUGGESTION_INTERVAL = 3;

  // 🔥 Reset when user logs out or logs in again
  useEffect(() => {
    // logout → clear local list
    setPostList([]); // uncomment
    setMeta({ current_page: 1, per_page: PAGE_SIZE });
    setHasMore(true);
    fetchLock.current = false;
    // delay a tick for safe API call
    // setTimeout(() => fetchContentPosts(1), 50);
  }, [isAuthenticated]);

  function handleRefreshUpdatePost(updatedPost) {
    if (!updatedPost?.id) return;
    setPostList((prevList) =>
      (prevList || []).map((obj) => {
        // ✅ Case 1: If this is the same post → replace it fully
        if (obj?.id === updatedPost.id) return updatedPost;

        // ✅ Case 2: If same creator → sync follow status
        if (obj?.created_by?.id === updatedPost?.created_by?.id) {
          return {
            ...obj,
            created_by: {
              ...obj.created_by,
            },
            is_followed: updatedPost?.is_followed,
          };
        }

        // ✅ Otherwise leave unchanged
        return obj;
      })
    );
  }
  function handleRefreshDeletedPost(deletedPost) {
    if (!deletedPost?.id) return;
    setPostList((prevList) =>
      (prevList || []).filter((obj) => obj?.id !== deletedPost.id)
    );
  }

  const handleViewComments = (obj: any) => setShowComments(obj);
  function handleRefresh() {
    setShowComments(null);
    setRefreshPosts(true);
  }

  // ✅ Stable fetch function
  const fetchContentPosts = async (page = 1) => {
    if (fetchLock.current || loading || !hasMore) return;

    try {
      fetchLock.current = true; // lock once
      setLoading(true);

      const res = await getPost({ page, per_page: PAGE_SIZE });
      if (res?.success) {
        const newPosts = res?.data?.data || [];

        // ✅ Deduplicate
        setPostList((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const filtered = newPosts.filter((p) => !existingIds.has(p.id));
          return [...prev, ...filtered];
        });

        if (newPosts.length < PAGE_SIZE) setHasMore(false);
        else
          setMeta((prev) => ({
            ...prev,
            current_page: prev.current_page + 1,
          }));
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      console.error("❌ getPost failed", err);
    } finally {
      setLoading(false);
      // ✅ small delay before unlocking to prevent re-render chain duplicate fetch
      setTimeout(() => {
        fetchLock.current = false;
      }, 200);
    }
  };

  // 🔹 Reset everything on route change
  useEffect(() => {
    setPostList([]);
    setMeta({ current_page: 1, per_page: PAGE_SIZE });
    setHasMore(true);
    fetchLock.current = false;
  }, [pathname]);

  // 🔹 Single initial fetch (on mount + when auth ready)
  useEffect(() => {
    // if (!isAuthenticated) return;

    // ✅ Delay a tick so Strict Mode remounts don't double-trigger
    const timeout = setTimeout(() => {
      if (!fetchLock.current) fetchContentPosts(1);
    }, 100);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, pathname]);

  // 🔹 Infinite scroll observer
  useEffect(() => {
    // if (!isAuthenticated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !fetchLock.current && !loading && hasMore) {
          fetchContentPosts(meta.current_page);
        }
      },
      { threshold: 0.5, rootMargin: "200px" }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [isAuthenticated, hasMore, loading, meta.current_page]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return; // ✅ skip first run
    }

    if (refreshPosts) {
      (async () => {
        setLoading(true);
        setPostList([]);
        setMeta({ current_page: 1, per_page: PAGE_SIZE });
        setHasMore(true);
        fetchLock.current = false;

        await fetchContentPosts(1);
        setLoading(false);
        setRefreshPosts(false);
      })();
    }
  }, [refreshPosts]);

  return (
    <>
      <PostDetailCard
        show={Boolean(showComments)}
        onClose={() => setShowComments(null)}
        postInfo={showComments}
        onDelete={(data) => {
          handleRefreshDeletedPost(data);
          setShowComments(null);
        }}
        handleRefresh={handleRefresh}
        handleRefreshUpdatePost={handleRefreshUpdatePost}
      />

      {postList.map((obj, index) => (
        <React.Fragment key={obj.id}>
          <PostCard
            obj={obj}
            handleViewComments={handleViewComments}
            onDelete={(data) => {
              handleRefreshDeletedPost(data);
              setShowComments(null);
            }}
            handleRefresh={handleRefresh}
            handleRefreshUpdatePost={handleRefreshUpdatePost}
          />

          {/* 🔥 Show after every SUGGESTION_INTERVAL posts */}
          {index % SUGGESTION_INTERVAL === SUGGESTION_INTERVAL - 1 &&
            isAuthenticated && (
              <div className="block max-[1290px]:block min-[1290px]:hidden">
                <MobileSuggestionComp />
              </div>
            )}
        </React.Fragment>
      ))}

      {/* 🔥 If total posts < interval → show suggestions ONCE */}
      {postList.length > 0 &&
        postList.length < SUGGESTION_INTERVAL &&
        isAuthenticated && (
          <div className="block max-[1290px]:block min-[1290px]:hidden">
            <MobileSuggestionComp />
          </div>
        )}

      {loading &&
        Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <PostCardSkeleton key={`skeleton-${i}`} />
        ))}

      {hasMore && !loading && <div ref={observerRef} className="h-8 w-full" />}

      {!loading && postList.length === 0 && (
        <p className="text-center text-[var(--textTwo)] mt-4">
          {tScreen("contentCreator.post.noPostsAvailable")}
        </p>
      )}
    </>
  );
}

export default function ContentCreatorFeed() {
  const [refreshPosts, setRefreshPosts] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { t: tScreen } = useTranslation("screen");

  const handleRefresh = useCallback(() => setRefreshPosts(true), []);

  const AllPostsComponent = useMemo(
    () => (
      <div className="w-full flex justify-center px-2 sm:px-4 mt-6">
        <div className="w-full max-w-7xl flex justify-center gap:4 sm:gap-10">
          {/* MAIN FEED */}
          <div className="flex-1 max-w-full sm:max-w-[650px] flex flex-col gap-5">
            <ShareExperience setRefreshPosts={setRefreshPosts} />
            <AllPostsFeed
              refreshPosts={refreshPosts}
              setRefreshPosts={setRefreshPosts}
            />
          </div>

          {/* SIDEBAR (desktop only) */}
          <SuggestionList />
        </div>
      </div>
    ),
    [refreshPosts]
  );

  const LiveStreamComponent = useMemo(
    () => <LiveStreamFeed activeTab={activeTab} />,
    [activeTab]
  );

  // Memoize tab config (prevents unnecessary re-renders)
  const postFeedTabs = useMemo(
    () => [
      {
        key: "all",
        label: tScreen("contentCreator.stream.allPost"),
        component: AllPostsComponent,
      },
      {
        key: "live_stream",
        label: tScreen("contentCreator.stream.liveStream"),
        component: LiveStreamComponent,
      },
    ],
    [AllPostsComponent, LiveStreamComponent, tScreen]
  );

  const currentTabComponent = useMemo(
    () => postFeedTabs.find((t) => t.key === activeTab)?.component,
    [postFeedTabs, activeTab]
  );

  return (
    <>
      <ContentCreatorTopComp handleRefresh={handleRefresh} />
      <div className="flex flex-col  gap-4 mt-5">
        <div className="flex gap-3 sm:gap-4 justify-center overflow-x-auto scrollbar-hide p-[5px]">
          {postFeedTabs.map((tab) => {
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  cursor-pointer flex gap-1 flex-shrink-0 px-4 py-2 
                  font-medium font-semibold rounded-3xl 
                  transition-all duration-300
                  hover:scale-105
                  ${
                    activeTab === tab.key
                      ? "bg-[var(--primary)] text-[var(--secondary)] shadow-md scale-105"
                      : "bg-[var(--borderThree)] text-[var(--textOne)]"
                  }
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="w-full">{currentTabComponent}</div>
      </div>
    </>
  );
}
