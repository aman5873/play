"use client";
import React, { useMemo } from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";

export default function MyGameScreenTopComp() {
  const { t: tScreen } = useTranslation("screen");

  const content = useMemo(() => {
    return {
      title: tScreen("myGame.title"),
      highlightTitle: tScreen("myGame.highlightTitle"),
      description: tScreen("myGame.description"),
      backgroundImage: "/images/screens/news_bg.png",
    };
  }, [tScreen]); // 🔥 recalculates only when language changes

  return <TopBgComp content={content} />;
}
