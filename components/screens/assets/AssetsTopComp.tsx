"use client";
import React, { useMemo } from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";

export default function QuestsTopComp() {
  const { t: tScreen } = useTranslation("screen");

  const content = useMemo(() => {
    return {
      title: tScreen("assets.title"),
      highlightTitle: tScreen("assets.highlightTitle"),
      description: tScreen("assets.description"),
      backgroundImage: "/images/screens/news_bg.png",
    };
  }, [tScreen]); // 🔥 recompute only on language change

  return <TopBgComp content={content} />;
}
