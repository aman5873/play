"use client";
import React from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";

export default function TeamsScreenTopComp() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <TopBgComp
      content={{
        chip: [
          {
            label: tScreen("teams.chip"),
            icon: "users",
            type: "primary",
          },
        ],
        title: tScreen("teams.title"),
        highlightTitle: tScreen("teams.highlightTitle"),
        description: tScreen("teams.description"),
        backgroundImage: "/images/screens/news_bg.png",
        button: [
          {
            label: tScreen("teams.buttonPrimary"),
            redirect: "",
            type: "primary",
            icon: "add",
          },
        ],
      }}
    />
  );
}
