"use client";
import React from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";

export default function QuestsTopComp() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <TopBgComp
      content={{
        title: tScreen("assets.title"),
        highlightTitle: tScreen("assets.highlightTitle"),
        description: tScreen("assets.description"),
        backgroundImage: "/images/screens/news_bg.png",
      }}
    />
  );
}
