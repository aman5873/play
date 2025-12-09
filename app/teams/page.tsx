import React from "react";
import TeamsFeed from "@/components/screens/teams/TeamsFeed";
import TeamsPageFeed from "@/components/screens/teams/TeamsPageFeed";
import TeamsScreenTopComp from "@/components/screens/teams/TeamsScreenTopComp";
import TeamsAnalyticsComp from "@/components/screens/teams/TeamsAnalyticsComp";

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-[2vw] sm:p-[1vw]">
      <TeamsScreenTopComp />
      <TeamsFeed param="following" title={"teams.labels.following"} />
      <TeamsFeed param="my_teams" title={"teams.labels.my_teams"} />
      <TeamsPageFeed />
      <TeamsAnalyticsComp />
    </div>
  );
}
