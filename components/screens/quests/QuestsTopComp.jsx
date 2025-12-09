"use client";
import React, { useMemo } from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";

export default function QuestsTopComp() {
  const { t: tScreen } = useTranslation("screen");

  const content = useMemo(() => {
    return {
      chip: [
        {
          label: tScreen("quests.chip"),
          icon: "mission",
          type: "primary",
        },
      ],
      title: tScreen("quests.title"),
      highlightTitle: tScreen("quests.highlightTitle"),
      description: tScreen("quests.description"),
      backgroundImage: "/images/screens/quest_bg.png",
    };
  }, [tScreen]); // 🔥 only regenerates content when language changes

  return <TopBgComp content={content} />;
}
