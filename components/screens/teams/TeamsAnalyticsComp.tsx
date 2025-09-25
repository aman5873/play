"use client";
import React from "react";
import { useTranslation } from "react-i18next";

import { SectionDetails } from "@/components/common/CardComp";
import { teamsAnalytics } from "@/constants/data";

export default function TeamsAnalyticsComp() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <div className="flex w-full justify-center">
      <SectionDetails
        list={[
          {
            label: teamsAnalytics?.active_teams,
            description: tScreen("teams.labels.active_teams"),
            color: "var(--primary)",
          },
          {
            label: teamsAnalytics?.verified_teams,
            description: tScreen("teams.labels.verified_teams"),
            color: "var(--textFour)",
          },
          {
            label: teamsAnalytics?.active_members,
            description: tScreen("teams.labels.active_members"),
            color: "var(--textFive)",
          },
        ]}
      />
    </div>
  );
}
