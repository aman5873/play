"use client";
import React from "react";
import { useTranslation } from "react-i18next";

import { SectionDetails } from "@/components/common/CardComp";
import { socialAnalytics } from "@/constants/data";

export default function SocialAnalyticsComp() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <div className="flex w-full justify-center">
      <SectionDetails
        list={[
          {
            label: socialAnalytics?.video_shared,
            description: tScreen("social.labels.video_shared"),
            color: "var(--primary)",
          },
          {
            label: socialAnalytics?.active_members,
            description: tScreen("social.labels.active_members"),
            color: "var(--textFour)",
          },
          {
            label: socialAnalytics?.verified_creators,
            description: tScreen("social.labels.verified_creators"),
            color: "var(--textThree)",
          },
          {
            label: socialAnalytics?.live_streams,
            description: tScreen("social.labels.live_streams"),
            color: "var(--textFive)",
          },
        ]}
        // TODO: If it to be centered according to TournamentFeaturedCard
        // contClass={"group w-full max-w-[1300px]"}
      />
    </div>
  );
}
