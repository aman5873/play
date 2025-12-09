"use client";

import React, { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";
import { useAlert } from "@/context/AlertContext";
import { useAuth } from "@/context/AuthContext";
import { getFollowList, toggleFollowAccount } from "@/lib/content_creator";

import { handleApiMessage } from "@/lib/auth_ops";
import FollowListModal, { FollowUserInfoCard } from "./FollowListModal";

export function MobileSuggestionList() {
  const { t: tCommon } = useTranslation("common");
  const { t: tScreen } = useTranslation("screen");
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);

  const { isAuthenticated } = useAuth();

  return (
    <>
      <FollowListModal
        show={showSuggestionModal}
        onClose={() => setShowSuggestionModal(false)}
        followType="suggested"
        isPaginated={true}
      />

      <div
        className={`block min-[1290px]:hidden ${isAuthenticated ? "px-3" : ""}`}
      >
        {isAuthenticated && (
          <div className="mb-2 flex justify-between pr-4">
            <p className="text-lg font-semibold text-[var(--textOne)]">
              {tScreen("contentCreator.profile.suggestedForYou")}
            </p>
            <p
              onClick={() => setShowSuggestionModal(true)}
              className="text-base font-medium text-[var(--textOne)] cursor-pointer hover:text-[var(--primary)]"
            >
              {tCommon("common_labels.view_all")}
            </p>
          </div>
        )}

        <HorizontalFollowList followType="suggested" />
      </div>
    </>
  );
}

export function FollowUserInfoCardSkeleton() {
  return (
    <div className=" gradient-one border  rounded-xl border-[var(--borderThree)] p-4 min-w-60 w-62 h-fit bg-[var(--bgCard)] rounded-xl p-3 shadow-sm flex flex-col gap-1">
      {/* Avatar + Name */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-[var(--bgTwo)] animate-pulse" />

        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 rounded bg-[var(--bgTwo)] animate-pulse" />
          <div className="w-24 h-3 rounded bg-[var(--bgTwo)] animate-pulse" />
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between text-center mt-3">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-8 h-4 rounded bg-[var(--bgTwo)] animate-pulse" />
            <div className="w-10 h-3 rounded bg-[var(--bgTwo)] animate-pulse" />
          </div>
        ))}
      </div>

      {/* Bio — optional (skip for skeleton in mobile) */}

      {/* Follow Button */}
      <div className="w-full h-9 rounded-lg bg-[var(--bgTwo)] animate-pulse mt-3" />
    </div>
  );
}

export function HorizontalFollowList({ followType }) {
  const { isAuthenticated, user: loggedUser, setLoginOpen } = useAuth();
  const { t: tScreen } = useTranslation("screen");
  const { t: tCommon } = useTranslation("common");
  const { showAlert } = useAlert();

  const PAGE_SIZE = 4;

  const [list, setList] = useState([]);
  const [meta, setMeta] = useState({
    current_page: 1,
    per_page: PAGE_SIZE,
    last_page: 1,
  });

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);
  const fetchLock = useRef(false);

  function handleRefreshUpdateUser(updatedUser) {
    if (!updatedUser?.id) return;

    setList((prevList) =>
      prevList.map((obj) =>
        obj.id === updatedUser.id ? { ...obj, ...updatedUser } : obj
      )
    );
  }

  async function handleToggleFollow(user, e) {
    e.stopPropagation();

    if (!isAuthenticated) {
      showAlert(tCommon("errorMessage.loginToFollow"), "info");
      setLoginOpen(true);
      return;
    }

    try {
      const res = await toggleFollowAccount(user?.id);

      handleRefreshUpdateUser({
        ...user,
        ...res?.data,
        is_followed: !user?.is_followed,
        followers_count: res?.data?.follower_count ?? user?.followers_count,
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

  // 🔥 EXACT SAME LOGIC AS FOLLOWLIST (paginated)
  const fetchPaginated = async (page = 1) => {
    if (fetchLock.current || loading || !hasMore || !isAuthenticated) return;

    try {
      fetchLock.current = true;
      setLoading(true);

      const params = {
        page,
        per_page: PAGE_SIZE,
      };

      const res = await getFollowList(params, followType);

      const users = Array.isArray(res?.data?.data)
        ? res.data.data
        : Array.isArray(res?.data)
        ? res.data
        : [];

      const pagination = { ...res?.data };

      // 🔥 Prevent duplicates
      if (users.length > 0) {
        setList((prev) => {
          const seen = new Set(prev.map((u) => u.id));
          return [...prev, ...users.filter((u) => !seen.has(u.id))];
        });
      }

      // 🔥 Pagination meta logic fully copied from FollowList
      if (pagination.current_page >= pagination.last_page) {
        setHasMore(false);
      } else {
        setMeta({
          current_page: pagination.current_page + 1,
          last_page: pagination.last_page,
          per_page: pagination.per_page,
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

  // Load first page
  useEffect(() => {
    fetchPaginated(1);
  }, []);

  // 🔥 Horizontal infinite scroll
  useEffect(() => {
    if (!hasMore || !isAuthenticated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !fetchLock.current && !loading) {
          fetchPaginated(meta.current_page);
        }
      },
      { rootMargin: "300px" }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [meta.current_page, hasMore, loading, isAuthenticated]);

  return (
    <div className="overflow-x-auto flex gap-3 pr-2 pb-3  scrollbar-hide scroll-smooth">
      {list.map((user) => {
        const is_self = loggedUser?.id === user?.id;

        return (
          <div
            key={user.id}
            className=" gradient-one border  rounded-xl border-[var(--borderThree)] p-4 min-w-60 w-60 h-fit bg-[var(--bgCard)] rounded-xl p-3 shadow-sm flex flex-col gap-3"
          >
            <FollowUserInfoCard
              profile={user}
              is_self={is_self}
              handleToggleFollow={handleToggleFollow}
              showBio={false}
            />
          </div>
        );
      })}
      {/* ⭐ Skeletons (while loading) */}
      {loading &&
        Array.from({ length: 3 }).map((_, i) => (
          <FollowUserInfoCardSkeleton key={`hs-${i}`} />
        ))}
      {/* Loader trigger */}
      {hasMore && (
        <div
          ref={loaderRef}
          className="min-w-[40px] flex items-center justify-center"
        />
      )}
    </div>
  );
}

export default function MobileSuggestionComp() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShow(true);
        obs.disconnect(); // only load once
      }
    });

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full">
      {show && <MobileSuggestionList />}
    </div>
  );
}
