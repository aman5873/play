"use client";
import React, { useMemo } from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";

export default function NewsScreenTopComp() {
  const { t: tScreen } = useTranslation("screen");

  const content = useMemo(() => {
    return {
      chip: [
        {
          label: tScreen("newsSection.chip"),
          icon: "trend",
          type: "primary",
        },
      ],
      title: tScreen("newsSection.title"),
      highlightTitle: tScreen("newsSection.highlightTitle"),
      description: tScreen("newsSection.description"),
      backgroundImage: "/images/screens/news_bg.png",
    };
  }, [tScreen]); // 🔥 re-run only when language changes

  return <TopBgComp content={content} />;
}
