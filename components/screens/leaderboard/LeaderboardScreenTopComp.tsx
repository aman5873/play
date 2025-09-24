"use client";
import React from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";

export default function SocialScreenTopComp() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <TopBgComp
      content={{
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
      }}
    />
  );
}
