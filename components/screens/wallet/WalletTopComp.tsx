"use client";
import React from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";

export default function WalletTopComp() {
  const { t: tScreen } = useTranslation("screen");

  return (
    <>
      <TopBgComp
        content={{
          chip: [
            {
              label: tScreen("wallet.chip"),
              icon: "mission",
              type: "primary",
            },
          ],
          title: tScreen("wallet.title"),
          highlightTitle: tScreen("wallet.highlightTitle"),
          description: tScreen("wallet.description"),
          backgroundImage: "/images/screens/team_avatar.png",
        }}
      />
    </>
  );
}
