import TeamsPageFeed from "@/components/screens/teams/TeamsPageFeed";
import TeamsScreenTopComp from "@/components/screens/teams/TeamsScreenTopComp";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <TeamsScreenTopComp />
      <TeamsPageFeed />
    </div>
  );
}
