"use client";
import { BadgeIcon } from "@/app/icons";
import Avatar from "@/components/auth/Avatar";
import { CardChip } from "@/components/common/CardComp";
import { AppButton } from "@/components/TopComp";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Heart, MessageCircle, Copy } from "lucide-react";
import { PostDetailCard } from "./ContentCreatorFeed";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  getSelfPost,
  getUserPost,
  toggleFollowAccount,
} from "@/lib/content_creator";
import { handleApiMessage } from "@/lib/auth_ops";
import { useAlert } from "@/context/AlertContext";
import ContentCreatorTopComp from "../components/ContentCreatorTopComp";
import FollowListModal from "../components/FollowListModal";
import { useLanguage } from "@/context/LanguageContext";
import { encodeUUID } from "@/lib/system";

export function ProfileCard({
  profileInfo,
  is_self = null,
  is_followed = null,
  isLoading = false, // 🆕 add this flag from parent while fetching
  setRefreshPosts = null,
}) {
  const { lang } = useLanguage();
  const { t: tScreen } = useTranslation("screen");
  const router = useRouter();
  const { user, isAuthenticated, userLoading } = useAuth();
  const { showAlert } = useAlert();

  const encryptedUserId = encodeUUID(profileInfo?.id);

  const [isFollowed, setIsFollowed] = useState(false);
  const [followType, setFollowType] = useState(null);

  const handleShare = () => {
    const postUrl = `${window.location.origin}/social/profile/${encryptedUserId}?lang=${lang}`;
    if (navigator.share) {
      navigator
        .share({
          title: profileInfo?.name,
          text: profileInfo?.bio ?? tScreen("contentCreator.post.checkoutPost"),
          url: postUrl,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(postUrl);
      showAlert(tScreen("contentCreator.post.linkCopiedToClipboard"), "info");
    }
  };

  async function handleToggleFollow(id) {
    if (isAuthenticated) {
      try {
        setIsFollowed((prev) => !prev);
        const res = await toggleFollowAccount(id);
        if (res?.success) {
          if (setRefreshPosts) {
            setRefreshPosts(true);
          }
        } else {
          handleApiMessage(res?.message, showAlert, "error");
          setIsFollowed((prev) => !prev);
        }
      } catch (err) {
        const errMessage = tScreen(
          "contentCreator.profile.profileUpdateFailed"
        );
        console.error(errMessage, err);
        handleApiMessage(errMessage, showAlert, "error");
      }
    } else {
      showAlert(tScreen("contentCreator.profile.loginRequired"), "info");
    }
  }

  useEffect(() => {
    setIsFollowed(is_followed);
  }, [is_followed]);

  // 🦴 Skeleton UI (light shimmer placeholders)
  if (isLoading || userLoading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="w-full aspect-[10/2] rounded-md bg-[var(--bgTwo)]" />
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex gap-2 flex-1">
            <div className="w-[45px] h-[45px] rounded-full bg-[var(--bgTwo)]" />
            <div className="flex flex-col gap-3 flex-1">
              <div className="h-4 w-1/3 bg-[var(--bgTwo)] rounded"></div>
              <div className="h-3 w-1/4 bg-[var(--bgTwo)] rounded"></div>
              <div className="flex gap-6 mt-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col gap-1 items-center">
                    <div className="h-3 w-6 bg-[var(--bgTwo)] rounded"></div>
                    <div className="h-2 w-10 bg-[var(--bgTwo)] rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex gap-2">
            <div className="h-7 w-20 bg-[var(--bgTwo)] rounded"></div>
            <div className="h-7 w-24 bg-[var(--bgTwo)] rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // 💎 Real profile card (same as before)
  const InsightRow = ({ list, color = "var(--textOne)" }) => (
    <div className="flex gap-4">
      {list?.map((obj, index) => (
        <div
          onClick={() => {
            obj?.onClick && obj?.onClick();
          }}
          key={`insight-${index}`}
          className={`flex flex-col text-[var(--textTwo)] text-md items-center ${
            obj?.onClick ? "cursor-pointer" : ""
          }`}
        >
          <span className={`text-[${color}] font-semibold`}>{obj?.value}</span>
          <span>{obj?.label}</span>
        </div>
      ))}
    </div>
  );

  const UserDetails = ({ profileInfo, contClass = "" }) => (
    <div className={contClass}>
      <p className="text-[15px] text-[var(--textOne)] mb-2">
        {profileInfo?.bio}
      </p>
      <InsightRow
        list={[
          {
            label: tScreen("contentCreator.profile.posts"),
            value: profileInfo?.posts_count ?? "N/A",
          },
          {
            label: tScreen("contentCreator.profile.followers"),
            value: profileInfo?.followers_count ?? "N/A",
            onClick: () => {
              console.log("clicked--");
              setFollowType("followers");
            },
          },
          {
            label: tScreen("contentCreator.profile.following"),
            value: profileInfo?.following_count ?? "N/A",
            onClick: () => setFollowType("following"),
          },
          {
            label: tScreen("contentCreator.profile.mainGame"),
            value: profileInfo?.main_game ?? "N/A",
          },
        ]}
      />
    </div>
  );

  const ActionButtons = ({ contClass = "" }) => (
    <div className={`flex gap-2 ${contClass}`}>
      {user?.id === profileInfo?.id && (
        <AppButton
          onClick={() => router.push("/social/edit-profile")}
          label={tScreen("contentCreator.profile.editProfile")}
          style={{ height: "fit-content" }}
        />
      )}
      <AppButton
        type="secondary"
        onClick={handleShare}
        label={tScreen("contentCreator.profile.shareProfile")}
        style={{ height: "fit-content" }}
      />
    </div>
  );

  return (
    <>
      <FollowListModal
        show={Boolean(followType)}
        onClose={() => setFollowType(null)}
        followType={followType}
        userId={is_self ? null : profileInfo?.id}
        isPaginated={true}
      />

      {profileInfo && (
        <div className="flex flex-col gap-4">
          <div className="w-full aspect-[10/2] overflow-hidden rounded-md relative">
            {profileInfo?.cover_url ? (
              <Image
                src={profileInfo.cover_url}
                alt="cover"
                fill
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#1c2b4a]">
                {/* Pattern overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
                    backgroundSize: "14px 14px",
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex gap-2 flex-1">
              <div>
                <Avatar
                  user={{ avatar_url: profileInfo?.avatar_url }}
                  size={45}
                />
              </div>

              <div className="flex gap-4 w-full">
                <div className="flex flex-col flex-1">
                  <div className="flex gap-2 items-center">
                    <h1 className="text-lg font-semibold text-[var(--textOne)]">
                      {profileInfo?.name}
                    </h1>
                    {Boolean(profileInfo?.is_verified) && (
                      <BadgeIcon className="text-[var(--primary)]" size={20} />
                    )}

                    {/* <CardChip
                      label={profileInfo?.level}
                      style={{
                        background: "var(--textFive)",
                        fontWeight: 600,
                        padding: "1px 8px",
                        fontSize: 14,
                        height: "fit-content",
                      }}
                    /> */}
                    {isFollowed !== null && !is_self && (
                      <span
                        onClick={() => handleToggleFollow(profileInfo?.id)}
                        className={`text-sm font-semibold cursor-pointer transition-all duration-200 ${
                          isFollowed
                            ? "text-[var(--textTwo)] hover:text-[var(--textOne)]"
                            : "text-[var(--bgBlue)] hover:opacity-90"
                        }`}
                      >
                        {isFollowed
                          ? tScreen("contentCreator.profile.unfollow")
                          : tScreen("contentCreator.profile.follow")}
                      </span>
                    )}
                  </div>

                  <p className="text-[14px] text-[var(--textTwo)]">
                    {profileInfo?.username}
                  </p>

                  <UserDetails
                    profileInfo={profileInfo}
                    contClass="hidden md:block"
                  />
                </div>

                <ActionButtons contClass="hidden md:flex" />
              </div>
            </div>
          </div>

          <UserDetails profileInfo={profileInfo} contClass="block md:hidden" />
          <ActionButtons contClass="flex md:hidden" />
        </div>
      )}
    </>
  );
}

function PostFeed({
  posts,
  setRefreshPosts,
  handleRefreshUpdatePost,
  handleRefreshDeletedPost,
  handleRefreshOnFollow,
  isAuthenticated = false,
}) {
  const { t: tScreen } = useTranslation("screen");
  const [showComments, setShowComments] = useState(null);
  function handleRedirectPosts(obj) {
    setShowComments(obj);
  }

  function handleRefresh() {
    setShowComments(null);
    setRefreshPosts(true);
  }

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
        handleRefreshOnFollow={handleRefreshOnFollow}
      />

      <div className="grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2">
        {posts?.map((obj, index) => {
          const firstMedia = obj?.media?.[0];
          const hasMedia = obj?.media?.length > 0;
          const hasMultipleImages = obj?.media?.length > 1;
          const isVideo = firstMedia?.type === "video";
          const isImage = firstMedia?.type === "image";

          return (
            <div
              onClick={() => handleRedirectPosts(obj)}
              key={`${obj?.id}-${index}`}
              className="group relative aspect-square w-full overflow-hidden cursor-pointer bg-black rounded-md"
            >
              {/* IMAGE PREVIEW */}
              {isImage && (
                <Image
                  src={firstMedia?.url}
                  alt={`post-${index}`}
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              )}

              {/* VIDEO PREVIEW */}
              {isVideo && (
                <video
                  src={firstMedia?.url}
                  className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-all duration-300"
                  muted
                  preload="metadata"
                />
              )}

              {/* NO MEDIA → SHOW DESCRIPTION */}
              {!hasMedia && (
                <div className="flex items-center justify-center h-full p-3">
                  <p className="text-center text-sm sm:text-base font-medium text-[var(--textOne)] line-clamp-5 leading-snug whitespace-pre-line">
                    {obj?.description}
                  </p>
                </div>
              )}

              {/* Multiple Images Icon */}
              {hasMultipleImages && (
                <div className="absolute top-2 right-2 text-white opacity-80">
                  <Copy className="w-4 h-4" />
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                <div className="flex items-center gap-6 text-sm sm:text-base font-semibold">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{obj?.like || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{obj?.comment || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!isAuthenticated && posts?.length === 0 && (
        <span>{tScreen("contentCreator.profile.loginToViewPosts")}</span>
      )}
    </>
  );
}
function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-[var(--textTwo)]  rounded-md ${className}`}
    />
  );
}
export function ProfileTabFeed({
  refreshPosts,
  setRefreshPosts,
  userId = null,
  handleRefreshOnFollow = null,
}) {
  const { t: tScreen } = useTranslation("screen");
  const { isAuthenticated } = useAuth();
  const { showAlert } = useAlert();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState("posts");
  const [postList, setPostList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [meta, setMeta] = useState({ current_page: 1, per_page: 10 });
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const didFetchRef = useRef(false);
  const didInitialLoad = useRef(false);
  const isFirstRun = useRef(true);
  const didAuthReset = useRef(false);

  const PAGE_SIZE = 10;

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

  // ✅ Unified fetch (self or other user)
  const fetchContentPosts = useCallback(
    async (page = meta.current_page) => {
      if (loading || !hasMore || !isAuthenticated) return;

      try {
        setLoading(true);

        const res = userId
          ? await getUserPost({
              id: userId,
              params: { page, per_page: PAGE_SIZE },
            })
          : await getSelfPost({
              page,
              per_page: PAGE_SIZE,
            });

        if (res?.success) {
          const newPosts = res?.data?.data || [];

          setPostList((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const filtered = newPosts.filter((p) => !existingIds.has(p.id));
            return [...prev, ...filtered];
          });

          if (newPosts.length < PAGE_SIZE) {
            setHasMore(false);
          } else {
            setMeta((prev) => ({
              ...prev,
              current_page: prev.current_page + 1,
            }));
          }
        } else {
          handleApiMessage(res?.message, showAlert, "error");
        }
      } catch (err) {
        console.error("❌ get post failed", err);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, isAuthenticated, userId, showAlert]
  );

  // 🔹 Reset on tab/route/user change
  useEffect(() => {
    setPostList([]);
    setMeta({ current_page: 1, per_page: PAGE_SIZE });
    setHasMore(true);
    didFetchRef.current = false;
    didInitialLoad.current = false;
  }, [pathname, userId]); // add activeTab when feed fetched on tabs

  // 🔹 Initial fetch - once after auth ready
  useEffect(() => {
    if (!isAuthenticated || didFetchRef.current || didAuthReset.current) return;

    const timeout = setTimeout(() => {
      didFetchRef.current = true;
      fetchContentPosts(1);
      didInitialLoad.current = true;
    }, 150);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, userId]); // add activeTab when feed fetched on tabs

  // 🔹 Infinite scroll - no trigger during initial load
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (
          first.isIntersecting &&
          hasMore &&
          !loading &&
          didInitialLoad.current
        ) {
          fetchContentPosts();
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
  }, [fetchContentPosts, hasMore, loading, userId]);

  // 🔹 Handle refresh trigger
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (refreshPosts) {
      (async () => {
        setLoading(true);
        setPostList([]);
        setMeta({ current_page: 1, per_page: PAGE_SIZE });
        setHasMore(true);
        didFetchRef.current = false;

        await fetchContentPosts(1);
        setLoading(false);
        setRefreshPosts(false);
      })();
    }
  }, [refreshPosts, userId]);

  // 🔥 Reset everything when user logs out or logs in again
  useEffect(() => {
    if (!isAuthenticated) {
      // logout resets
      setPostList([]);
      setMeta({ current_page: 1, per_page: PAGE_SIZE });
      setHasMore(true);
      didFetchRef.current = false;
      didInitialLoad.current = false;
      didAuthReset.current = true; // mark that next login is fresh
      return;
    }

    // login → ONLY reset fetch should run
    if (didAuthReset.current) {
      didAuthReset.current = false;

      setPostList([]);
      setMeta({ current_page: 1, per_page: PAGE_SIZE });
      setHasMore(true);
      didFetchRef.current = false;
      didInitialLoad.current = false;

      setTimeout(() => {
        fetchContentPosts(1);
        didFetchRef.current = true;
        didInitialLoad.current = true;
      }, 50);
    }
  }, [isAuthenticated]);

  const tabs = [
    {
      key: "posts",
      label: tScreen("contentCreator.profile.posts"),
      component: (
        <PostFeed
          posts={postList}
          setRefreshPosts={setRefreshPosts}
          handleRefreshOnFollow={handleRefreshOnFollow}
          handleRefreshUpdatePost={handleRefreshUpdatePost}
          handleRefreshDeletedPost={handleRefreshDeletedPost}
          isAuthenticated={isAuthenticated}
        />
      ),
    },
    {
      key: "liked",
      label: tScreen("contentCreator.profile.liked"),
      // component: (
      //   <PostFeed
      //     posts={postList}
      //     setRefreshPosts={setRefreshPosts}
      //     handleRefreshOnFollow={handleRefreshOnFollow}
      //     handleRefreshUpdatePost={handleRefreshUpdatePost}
      //     handleRefreshDeletedPost={handleRefreshDeletedPost}
      //   />
      // ),
      component: <span>{tScreen("contentCreator.profile.comingSoon")}</span>,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide p-[5px]">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`cursor-pointer px-4 py-2 font-semibold transition-all ${
              activeTab === tab.key
                ? "border-b-2 border-[var(--primary)] text-[var(--primary)] scale-105"
                : "text-[var(--textTwo)] hover:text-[var(--textOne)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Feed */}
      <div>{tabs.find((tab) => tab.key === activeTab)?.component}</div>

      {/* Sentinel */}
      {hasMore && !loading && <div ref={observerRef} className="h-8" />}

      {/* Skeleton Loader */}
      {loading && (
        <div className="grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 mt-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-md" />
          ))}
        </div>
      )}
    </div>
  );
}
export default function ContentProfileFeed() {
  const { user, userLoading, handleProfile } = useAuth();
  const [refreshPosts, setRefreshPosts] = useState(false);
  const [renderAllowed, setRenderAllowed] = useState(false);
  const router = useRouter();

  // 🔥 Run handleProfile once, avoid duplicate fetches
  const didFetchRef = useRef(false);
  useEffect(() => {
    if (!didFetchRef.current) {
      handleProfile();
      didFetchRef.current = true;
    }
  }, []);

  // 🔥 Prevent UI flash on logout & unauth
  useEffect(() => {
    if (!userLoading && user) {
      setRenderAllowed(true); // safe to show content
    }
    if (!userLoading && !user) {
      setRenderAllowed(false); // hide instantly
      router.replace("/404");
    }
  }, [userLoading, user]);

  // ⛔ Do NOT render any UI until allowed
  if (!renderAllowed && !userLoading) return null;

  return (
    <div>
      <ContentCreatorTopComp handleRefresh={() => setRefreshPosts(true)} />
      <div className="gradient-one border p-4 w-full overflow-hidden rounded-xl flex flex-col gap-3 border-[var(--borderThree)]">
        <ProfileCard profileInfo={user} is_self={true} is_followed={null} />
        <ProfileTabFeed
          refreshPosts={refreshPosts}
          setRefreshPosts={setRefreshPosts}
        />
      </div>
    </div>
  );
}
