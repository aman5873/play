"use client";

import { createPortal } from "react-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AppModal from "@/components/AppModal";
import { useTranslation } from "react-i18next";
import { useAlert } from "@/context/AlertContext";
import { useAuth } from "@/context/AuthContext";
import { getFollowList, toggleFollowAccount } from "@/lib/content_creator";

import { BadgeIcon } from "@/app/icons";
import { handleApiMessage } from "@/lib/auth_ops";
import SearchInput from "@/components/common/Searchinput";
import { encodeUUID } from "@/lib/system";
import { useLanguage } from "@/context/LanguageContext";

function MotionCard({ children, position, open }) {
  return (
    <AnimatePresence>
      {open && position && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -6 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              duration: 0.18,
              ease: "easeOut",
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: -6,
            transition: {
              duration: 0.12,
              ease: "easeIn",
            },
          }}
          style={{
            position: "fixed",
            top: position.top,
            left: position.left,
            zIndex: 99999,
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HoverPortal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Ensure global portal container
    let el = document.getElementById("hover-root");
    if (!el) {
      el = document.createElement("div");
      el.id = "hover-root";
      el.style.position = "relative";
      document.body.appendChild(el);
    }
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.getElementById("hover-root"));
}

export function FollowUserInfoCard({
  profile,
  is_self,
  handleToggleFollow,
  showBio = true,
}) {
  const { t: tScreen } = useTranslation("screen");
  return (
    <>
      {/* Avatar + Name */}
      <div className="flex items-center gap-3">
        <img
          src={profile?.avatar_url ?? "/images/defaultUserAvatar.png"}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <div className="flex gap-1">
            <p className="font-medium text-base text-[var(--textOne)] line-clamp-1">
              {profile?.name}
            </p>

            {Boolean(profile?.is_verified) && (
              <BadgeIcon className="text-[var(--primary)]" size={18} />
            )}
          </div>

          {profile?.username && (
            <p className="text-sm text-[var(--textTwo)] line-clamp-1">
              {profile.username}
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between text-center">
        <div>
          <p className="font-bold text-[var(--textOne)]">
            {profile?.posts_count || 0}
          </p>
          <p className="text-xs text-[var(--textTwo)]">
            {tScreen("contentCreator.profile.posts")}
          </p>
        </div>
        <div>
          <p className="font-bold text-[var(--textOne)]">
            {profile?.followers_count || 0}
          </p>
          <p className="text-xs text-[var(--textTwo)]">
            {tScreen("contentCreator.profile.followers")}
          </p>
        </div>
        <div>
          <p className="font-bold text-[var(--textOne)]">
            {profile.following_count || 0}
          </p>
          <p className="text-xs text-[var(--textTwo)]">
            {tScreen("contentCreator.profile.following")}
          </p>
        </div>
      </div>

      {/* Bio */}
      {profile.bio && showBio && (
        <p className="text-sm text-[var(--textOne)] line-clamp-3">
          {profile.bio}
        </p>
      )}

      {/* Follow Button */}
      {!is_self && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFollow(profile, e);
          }}
          className={`cursor-pointer w-full rounded-lg py-2 text-sm font-semibold ${
            profile.is_followed
              ? "bg-[var(--bg)] text-[var(--textOne)]"
              : "bg-[var(--primary)] text-[var(--secondary)]"
          }`}
        >
          {profile.is_followed
            ? tScreen("contentCreator.profile.unfollow")
            : tScreen("contentCreator.profile.follow")}
        </button>
      )}
    </>
  );
}

function ProfileHoverCard({ profile, handleToggleFollow, children, is_self }) {
  const [open, setOpen] = useState(false);
  const [hoveredPos, setHoveredPos] = useState(null);

  const childRef = useRef(null);
  const cardRef = useRef(null);

  const longPressTimer = useRef(null);
  const touchMoved = useRef(false);
  const openTimer = useRef(null);
  const closeTimer = useRef(null);

  const { t: tScreen } = useTranslation("screen");

  /** Close on outside click */
  useEffect(() => {
    function handler(e) {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  /** Accurate anchor position (fixed) */
  function calculatePosition() {
    if (!childRef.current) return;

    const rect = childRef.current.getBoundingClientRect();
    const popupWidth = 260;
    const padding = 6;

    // Real height if card already rendered before
    const realHeight = cardRef.current?.offsetHeight || 180;

    const left = Math.min(
      rect.left + window.scrollX,
      window.innerWidth - popupWidth - padding
    );

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    let top;

    if (spaceBelow < realHeight && spaceAbove > realHeight) {
      // Place ABOVE (tighter gap)
      top = rect.top + window.scrollY - realHeight - 2;
    } else {
      // Place BELOW (minimal gap)
      top = rect.top + window.scrollY + rect.height + 2;
    }

    setHoveredPos({ top, left });
  }

  /** Desktop hover */
  /** Smooth Delayed OPEN */
  const delayedOpen = () => {
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => {
      calculatePosition();
      setOpen(true);
    }, 120);
  };

  /** Smooth Delayed CLOSE */
  const delayedClose = () => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpen(false);
    }, 120);
  };

  /** Mobile long press */
  const handleTouchStart = () => {
    calculatePosition();
    touchMoved.current = false;

    longPressTimer.current = setTimeout(() => {
      if (!touchMoved.current) {
        setOpen(true);
      }
    }, 450);
  };
  const handleTouchMove = () => (touchMoved.current = true);
  const handleTouchEnd = () => clearTimeout(longPressTimer.current);

  return (
    <>
      <div
        ref={childRef}
        className="relative"
        onMouseEnter={delayedOpen}
        onMouseLeave={(e) => {
          const to = e.relatedTarget;
          if (
            cardRef.current &&
            to instanceof Node &&
            cardRef.current.contains(to)
          ) {
            return;
          }
          delayedClose();
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>

      {open && profile && hoveredPos && (
        <HoverPortal>
          <MotionCard open={open} position={hoveredPos}>
            <div
              ref={cardRef}
              className="fixed z-[99999] w-64  p-4 rounded-[16px] gradient-three border-[1px] border-[var(--borderThree)] shadow-xl animate-fadeIn flex flex-col gap-3"
              style={{
                top: hoveredPos.top,
                left: hoveredPos.left,
              }}
              onMouseEnter={() => {
                clearTimeout(closeTimer.current);
                setOpen(true);
              }}
              onMouseLeave={(e) => {
                const to = e.relatedTarget;
                if (
                  childRef.current &&
                  to instanceof Node &&
                  childRef.current.contains(to)
                ) {
                  return;
                }
                delayedClose();
              }}
            >
              <FollowUserInfoCard
                profile={profile}
                is_self={is_self}
                handleToggleFollow={handleToggleFollow}
              />
            </div>
          </MotionCard>
        </HoverPortal>
      )}
    </>
  );
}

function FollowUserCard({ user, is_self, handleRefreshUpdateUser }) {
  const { t: tScreen } = useTranslation("screen");
  const { t: tCommon } = useTranslation("common");
  const { showAlert } = useAlert();
  const { isAuthenticated, setLoginOpen } = useAuth();
  const { lang } = useLanguage();
  const encryptedUserId = encodeUUID(user?.id);

  async function handleToggleFollow(user, e) {
    e.stopPropagation();
    try {
      if (!isAuthenticated) {
        showAlert(tCommon("errorMessage.loginToFollow"), "info");
        setLoginOpen(true);
        return;
      }
      const res = await toggleFollowAccount(user?.id);
      handleRefreshUpdateUser({
        ...user,
        ...res?.data,
        is_followed: !user?.is_followed,
        followers_count: res?.data?.follower_count ?? user?.followers_count,
        // followings_count: res?.data?.follower_count ?? user?.followers_count,
      });
      if (!res?.success) {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      handleApiMessage(
        tScreen("contentCreator.profile.profileUpdateFailed"),
        showAlert,
        "error"
      );
    }
  }

  return (
    <div
      className="flex items-center gap-3 justify-between pb-2"
      onClick={(e) => e.stopPropagation()}
    >
      <ProfileHoverCard
        profile={user}
        handleToggleFollow={handleToggleFollow}
        is_self={is_self}
      >
        <a
          className="cursor-pointer flex items-center gap-3"
          href={`/social/profile/${encryptedUserId}?lang=${lang}`}
        >
          <img
            src={user?.avatar_url ?? "/images/defaultUserAvatar.png"}
            alt={user.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex gap-1">
              <p className="font-medium text-[var(--textOne)]">{user?.name}</p>
              {Boolean(user?.is_verified) && (
                <BadgeIcon className="text-[var(--primary)]" size={18} />
              )}
            </div>
            {user?.username && (
              <p className="text-sm text-[var(--textTwo)]">@{user.username}</p>
            )}
          </div>
        </a>
      </ProfileHoverCard>

      {!is_self && (
        <span
          onClick={(e) => handleToggleFollow(user, e)}
          className={`text-sm font-semibold cursor-pointer transition-all ${
            user?.is_followed
              ? "text-[var(--textTwo)] hover:text-[var(--textOne)]"
              : "text-[var(--bgBlue)] hover:opacity-90"
          }`}
        >
          {user?.is_followed
            ? tScreen("contentCreator.profile.unfollow")
            : tScreen("contentCreator.profile.follow")}
        </span>
      )}
    </div>
  );
}

function FollowerUserSkeleton() {
  return (
    <div className="flex w-full items-center gap-3 animate-pulse pb-2">
      <div className="h-10 w-10 rounded-full bg-[var(--bgThree)]" />
      <div className="flex-1 space-y-1">
        <div className="h-3 w-1/2 bg-[var(--bgThree)] rounded" />
        <div className="h-2 w-1/4 bg-[var(--bgThree)] rounded" />
      </div>
      <div className="h-4 w-15 bg-[var(--bgThree)] rounded-md" />
    </div>
  );
}

export default function FollowListModal(props) {
  const { followType, show, onClose } = props;
  const [headerSearchValue, setHeaderSearchValue] = useState("");
  const { t: tScreen } = useTranslation("screen");

  const searchLabel = tScreen("contentCreator.profile.searchUser");
  const modalTitle =
    followType === "followers"
      ? tScreen("contentCreator.profile.followers")
      : followType === "following"
      ? tScreen("contentCreator.profile.following")
      : followType === "mutual"
      ? tScreen("contentCreator.profile.mutualUsers")
      : followType === "suggested"
      ? tScreen("contentCreator.profile.suggestions")
      : tScreen("contentCreator.profile.users");

  const header = useMemo(
    () => (
      <div className="flex-1 min-w-[170px] sm:max-w-[full] sm:w-auto mt-5">
        <SearchInput
          type="secondary"
          value={headerSearchValue}
          onChange={setHeaderSearchValue} // Will trigger after debounce
          placeholder={searchLabel}
        />
      </div>
    ),
    [headerSearchValue, searchLabel]
  );

  return (
    <AppModal
      open={show}
      onClose={onClose}
      title={modalTitle}
      titleClass="font-rajdhani"
      contClass="w-[95%] sm:w-md max-w-lg"
      closeIconClass="top-7 right-4"
      header={header}
    >
      <FollowList {...props} headerSearchValue={headerSearchValue} />
    </AppModal>
  );
}
export function FollowList({
  followType,
  show = false,
  isPaginated = true,
  isMutual = false,
  userId = null,
  headerSearchValue = null,
}) {
  const { t: tScreen } = useTranslation("screen");
  const { showAlert } = useAlert();
  const { isAuthenticated, user: loggedUser } = useAuth();

  const PAGE_SIZE = 10;
  const prevAuth = useRef(false);

  const [list, setList] = useState([]);
  const [meta, setMeta] = useState({
    current_page: 1,
    per_page: PAGE_SIZE, // 🔥 ADDED (correct initial per_page)
    last_page: 1,
  });

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);
  const fetchLock = useRef(false);

  function handleRefreshUpdateUser(updatedUser) {
    if (!updatedUser?.id) return;

    setList((prevList) =>
      (prevList || []).map((obj) => {
        if (obj?.id === updatedUser?.id) {
          return {
            ...obj,
            ...updatedUser,
          };
        }
        return obj;
      })
    );
  }

  // ✅ Fetch paginated
  const fetchPaginated = async (page = 1) => {
    if (fetchLock.current || loading || !hasMore || !isAuthenticated) return;

    try {
      fetchLock.current = true;
      setLoading(true);

      const params = {
        page,
        per_page: PAGE_SIZE,
        ...(userId ? { user_id: userId } : {}),
        ...(headerSearchValue ? { search: headerSearchValue } : {}), // 🔥 ADDED
      };

      const res = await getFollowList(params, followType);

      const users = Array.isArray(res?.data?.data)
        ? res?.data?.data
        : Array.isArray(res?.data)
        ? res?.data
        : [];
      const pagination = { ...res?.data };

      if (users?.length > 0) {
        setList((prev) => {
          const existing = new Set(prev.map((u) => u.id));
          return [...prev, ...users.filter((u) => !existing.has(u.id))];
        });
      }

      if (pagination.current_page >= pagination.last_page) {
        setHasMore(false);
      } else {
        setMeta({
          current_page: pagination.current_page + 1,
          last_page: pagination.last_page,
          per_page: pagination.per_page, // 🔥 ADDED (ensures infinite scroll works)
        });
      }
    } catch (err) {
      console.error("fetchPaginated error", err);
      showAlert("Failed to load user list", "error");
    } finally {
      setLoading(false);
      setTimeout(() => (fetchLock.current = false), 200);
    }
  };

  // ❌ fetchAll kept same (no change needed)
  const fetchAll = async () => {
    if (fetchLock.current || loading || !isAuthenticated) return;

    try {
      fetchLock.current = true;
      setLoading(true);

      const params = {
        ...(userId ? { user_id: userId } : {}),
        ...(headerSearchValue ? { search: headerSearchValue } : {}), // 🔥 ADDED
      };

      const res = await getFollowList(params, followType);
      const users = res?.data ?? [];

      setList(users);
      setHasMore(false);
    } catch (err) {
      console.error("fetchAll error", err);
      showAlert("Failed to load user list", "error");
    } finally {
      setLoading(false);
      fetchLock.current = false;
    }
  };

  useEffect(() => {
    if (show && isMutual) {
      // 🔥 auth changed from false → true
      const authJustActivated = !prevAuth.current && isAuthenticated;

      // update ref
      prevAuth.current = isAuthenticated;

      if (authJustActivated) {
        // reset state
        setList([]);
        setMeta({
          current_page: 1,
          per_page: PAGE_SIZE,
          last_page: 1,
        });
        setHasMore(true);
        fetchLock.current = false;

        fetchAll(); // 🔥 only runs ONCE when auth becomes true
      }
    }
  }, [show, isAuthenticated]);

  // Infinite Scroll
  useEffect(() => {
    if (!isPaginated || !show || !isAuthenticated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !fetchLock.current && !loading && hasMore) {
          fetchPaginated(meta.current_page);
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
  }, [
    isPaginated,
    show,
    hasMore,
    loading,
    meta.current_page,
    isAuthenticated,
    userId,
    headerSearchValue,
  ]);

  return (
    <>
      <div className="max-h-[60vh] min-h-[250px] overflow-auto px-3 py-2 space-y-3 mt-4">
        {list?.map((user) => (
          <FollowUserCard
            key={user.id}
            user={user}
            is_self={loggedUser?.id === user?.id}
            handleRefreshUpdateUser={handleRefreshUpdateUser}
          />
        ))}

        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <FollowerUserSkeleton key={`s-${i}`} />
          ))}

        {isPaginated && hasMore && !loading && (
          <div ref={observerRef} className="h-10 w-full" />
        )}

        {!loading && list.length === 0 && (
          <p className="text-center text-sm text-[var(--textTwo)] mt-4">
            {tScreen("contentCreator.profile.noUsersFound")}
          </p>
        )}
      </div>
    </>
  );
}

export function SuggestionList() {
  const { user, userLoading } = useAuth();
  const { t: tScreen } = useTranslation("screen");
  const [headerSearchValue, setHeaderSearchValue] = useState("");

  const header = useMemo(
    () => (
      <div className="flex-1 min-w-[170px] sm:max-w-[full] sm:w-auto mt-5">
        <SearchInput
          type="secondary"
          value={headerSearchValue}
          onChange={setHeaderSearchValue} // Will trigger after debounce
          placeholder={tScreen("contentCreator.profile.searchUser")}
        />
      </div>
    ),
    [headerSearchValue, tScreen]
  );

  if (!user && !userLoading) return null;

  return (
    <>
      <aside
        className="
    hidden
    min-[1290px]:flex
    min-w-[280px]
    max-w-[400px]
    flex-col
    flex-shrink-0
    flex-grow-0
  "
      >
        <div className="sticky top-6">
          <p className="text-lg font-semibold text-[var(--textOne)]">
            {tScreen("contentCreator.profile.suggestedForYou")}
          </p>

          {header}

          <div className="max-h-[90vh] overflow-y-auto pr-1 scroll-smooth scrollbar-hide">
            <FollowList
              show={true}
              followType="suggested"
              isPaginated={true}
              headerSearchValue={headerSearchValue}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
