"use client";
import React from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";

export default function ContentCreatorTopComp() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <TopBgComp
      content={{
        chip: [
          {
            label: tScreen("contentCreator.chip"),
            icon: "trend",
            type: "primary",
          },
        ],
        title: tScreen("contentCreator.title"),
        highlightTitle: tScreen("contentCreator.highlightTitle"),
        description: tScreen("contentCreator.description"),
        button: [
          {
            icon: "add",
            label: tScreen("contentCreator.buttonPrimary"),
            redirect: "",
            type: "primary",
          },
          {
            icon: "user",
            label: tScreen("contentCreator.buttonSecondary"),
            redirect: "",
            type: "secondary",
          },
        ],
        backgroundImage: "/images/screens/contentBg.png",
      }}
    />
  );
}
