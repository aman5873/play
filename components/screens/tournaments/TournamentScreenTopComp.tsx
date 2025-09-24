"use client";
import React from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";

export default function TournamentScreenTopComp() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <TopBgComp
      content={{
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
        // "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop",
      }}
    />
  );
}
