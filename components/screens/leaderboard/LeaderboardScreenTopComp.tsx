"use client";
import React, { useMemo } from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";

export default function LeaderboardScreenTopComp() {
  const { t: tScreen } = useTranslation("screen");

  const content = useMemo(() => {
    return {
      chip: [
        {
          label: tScreen("leaderboard.chip"),
          icon: "trophy",
          type: "primary",
        },
      ],
      title: tScreen("leaderboard.title"),
      highlightTitle: tScreen("leaderboard.highlightTitle"),
      description: tScreen("leaderboard.description"),
      backgroundImage: "/images/screens/news_bg.png",
    };
  }, [tScreen]); // 🔥 Only updates on language change

  return <TopBgComp content={content} />;
}
