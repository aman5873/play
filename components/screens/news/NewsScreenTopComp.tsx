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
            label: tScreen("newsSection.chip"),
            icon: "trend",
            type: "primary",
          },
        ],
        title: tScreen("newsSection.title"),
        highlightTitle: tScreen("newsSection.highlightTitle"),
        description: tScreen("newsSection.description"),
        backgroundImage: "/images/screens/news_bg.png",
      }}
    />
  );
}
