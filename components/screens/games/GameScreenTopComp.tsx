"use client";
import React from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";

export default function GameScreenTopComp() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <TopBgComp
      content={{
        chip: [{ label: tScreen("game.chip"), icon: "game", type: "primary" }],
        title: tScreen("game.title"),
        highlightTitle: tScreen("game.highlightTitle"),
        description: tScreen("game.description"),

        backgroundImage: "/images/screens/games_bg.png",
        // "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=2078&auto=format&fit=crop",
      }}
    />
  );
}
