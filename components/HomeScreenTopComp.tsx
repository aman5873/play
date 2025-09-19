"use client";
import React from "react";
import homeThumbnail from "@/public/images/home/homePlay.png";
import TopComp from "@/components/TopComp";
import { useTranslation } from "react-i18next";

export default function HomeScreenTopComp() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <TopComp
      content={{
        chip: [
          {
            label: tScreen("home.chip"),
            type: "primary-gradient",
          },
        ],
        title: tScreen("home.title"),
        highlightTitle: tScreen("home.highlightTitle"),
        description: tScreen("home.description"),
        details: [
          {
            icon: "users",
            label: "50K+",
            description: tScreen("home.activePlayers"),
          },
          {
            icon: "trophy",
            label: "$2.5M+",
            description: tScreen("home.prizePool"),
          },
          {
            icon: "medal",
            label: "150+",
            description: tScreen("home.tournaments"),
          },
        ],

        thumbnail: homeThumbnail,
        button: [
          {
            icon: "play",
            label: tScreen("home.buttonPrimary"),
            redirect: "/",
            type: "primary",
          },
          {
            icon: "trophy",
            label: tScreen("home.buttonSecondary"),
            redirect: "/tournaments",
            type: "secondary",
          },
        ],
      }}
    />
  );
}
