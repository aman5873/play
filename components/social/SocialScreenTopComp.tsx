"use client";
import React from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";

export default function SocialScreenTopComp() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <TopBgComp
      content={{
        chip: [
          { label: tScreen("social.chip"), icon: "trend", type: "primary" },
        ],
        title: tScreen("social.title"),
        highlightTitle: tScreen("social.highlightTitle"),
        description: tScreen("social.description"),
        button: [
          {
            icon: "trophy",
            label: tScreen("social.buttonPrimary"),
            redirect: "/",
            type: "primary",
          },
          {
            icon: "upload",
            label: tScreen("social.buttonSecondary"),
            redirect: "/tournaments",
            type: "secondary",
          },
        ],
        backgroundImage:
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
      }}
    />
  );
}
