"use client";
import React, { useMemo } from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";

export default function GameScreenTopComp() {
  const { t: tScreen } = useTranslation("screen");

  const content = useMemo(() => {
    return {
      chip: [
        {
          label: tScreen("game.chip"),
          icon: "game",
          type: "primary",
        },
      ],
      title: tScreen("game.title"),
      highlightTitle: tScreen("game.highlightTitle"),
      description: tScreen("game.description"),
      button: [
        {
          label: tScreen("game.buttonPrimary"),
          redirect: "/games/create",
          type: "primary",
          icon: "add",
        },
        {
          icon: "game",
          label: tScreen("myGame.labels.myGames"),
          redirect: "/games/my-games",
          type: "secondary",
        },
      ],
      backgroundImage: "/images/screens/games_bg.png",
    };
  }, [tScreen]); // 🔥 recomputes only when language changes

  return <TopBgComp content={content} />;
}
