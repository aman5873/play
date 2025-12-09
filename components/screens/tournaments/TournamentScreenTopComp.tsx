"use client";
import React, { useMemo } from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";

export default function TournamentScreenTopComp() {
  const { t: tScreen } = useTranslation("screen");

  const content = useMemo(() => {
    return {
      chip: [
        {
          label: tScreen("tournament.chip"),
          icon: "trophy",
          type: "primary",
        },
      ],
      title: tScreen("tournament.title"),
      highlightTitle: tScreen("tournament.highlightTitle"),
      description: tScreen("tournament.description"),
      backgroundImage: "/images/screens/tournaments_bg.png",
    };
  }, [tScreen]); // 🔥 Rebuilds only when language changes

  return <TopBgComp content={content} />;
}
