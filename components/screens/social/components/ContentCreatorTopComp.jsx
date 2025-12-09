"use client";
import React, { useEffect, useMemo, useState } from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";
import ContentCreateModal from "./ContentCreateModal";
import { useAuth } from "@/context/AuthContext";
import { useAlert } from "@/context/AlertContext";
import { handleApiMessage } from "@/lib/auth_ops";
import { connectTwitch, toggleLiveStream } from "@/lib/content_creator";

export default function ContentCreatorTopComp({ handleRefresh }) {
  const { isAuthenticated, user, setUser, setUserLoading } = useAuth();
  const { t: tScreen } = useTranslation("screen");
  const { showAlert } = useAlert();

  const [showCreateContent, setShowCreateContent] = useState(false);
  const [isLive, setIsLive] = useState(false);

  async function toggleLive(go_live, e) {
    e?.stopPropagation();
    try {
      setUserLoading(true);
      setIsLive(Boolean(go_live));
      const res = await toggleLiveStream({ go_live });
      if (res?.success) {
        setUser({ ...user, is_live: Boolean(go_live) });
      } else {
        handleApiMessage(res?.message, showAlert, "error");
      }
    } catch (err) {
      handleApiMessage(tScreen("Toggle live failed"), showAlert, "error");
    } finally {
      setUserLoading(false);
    }
  }
  async function handleUserAction(isLive, e) {
    e?.stopPropagation();

    if (user && !user?.can_live) {
      try {
        const res = await connectTwitch();
        if (res?.data?.redirect_url) {
          window.location.href = res?.data?.redirect_url;
        }
      } catch (error) {
        console.error(error);
        handleApiMessage("Internal server error", showAlert, "error");
      }
    } else {
      toggleLive(isLive ? 0 : 1, e);
    }
  }

  useEffect(() => {
    setIsLive(user?.is_live);
  }, [user?.is_live]);

  const content = useMemo(() => {
    const userActionLabel =
      user && !user?.can_live
        ? tScreen("contentCreator.stream.linkTwitch")
        : isLive
        ? tScreen("contentCreator.stream.goOffline")
        : tScreen("contentCreator.stream.goLive");

    const userActionIcon =
      user && !user?.can_live ? "link" : isLive ? "offline" : "live";
    return {
      chip: [
        {
          label: tScreen("contentCreator.chip"),
          icon: "trend",
          type: "primary",
        },
      ],
      title: tScreen("contentCreator.title"),
      highlightTitle: tScreen("contentCreator.highlightTitle"),
      description: tScreen("contentCreator.description"),
      button:
        isAuthenticated && !user?.is_guest
          ? [
              {
                icon: "add",
                label: tScreen("contentCreator.buttonPrimary"),
                onClick: () => setShowCreateContent(true),
                type: "primary",
              },
              userActionLabel && {
                icon: userActionIcon,
                label: userActionLabel,
                onClick: (e) => handleUserAction(isLive, e),
                type: "secondary",
              },
              {
                icon: "user",
                label: tScreen("contentCreator.buttonSecondary"),
                redirect: "/social/profile",
                type: "secondary",
              },
            ].filter(Boolean)
          : [],
      backgroundImage: "/images/screens/contentBg.png",
    };
  }, [tScreen, isAuthenticated, user, isLive]);

  return (
    <>
      <ContentCreateModal
        show={showCreateContent}
        onClose={() => setShowCreateContent(false)}
        handleRefresh={handleRefresh}
      />
      <TopBgComp content={content} />
    </>
  );
}
