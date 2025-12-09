"use client";
import React, { useMemo } from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";

export default function SocialScreenTopComp() {
  const { t: tScreen } = useTranslation("screen");

  const content = useMemo(() => {
    return {
      chip: [{ label: tScreen("social.chip"), icon: "trend", type: "primary" }],
      title: tScreen("social.title"),
      highlightTitle: tScreen("social.highlightTitle"),
      description: tScreen("social.description"),
      button: [
        {
          icon: "trophy",
          label: tScreen("social.buttonPrimary"),
          redirect: "/social",
          type: "primary",
        },
        {
          icon: "upload",
          label: tScreen("social.buttonSecondary"),
          redirect: "",
          type: "secondary",
        },
      ],
      backgroundImage: "/images/screens/contentBg.png",
    };
  }, [tScreen]);

  return <TopBgComp content={content} />;
}
