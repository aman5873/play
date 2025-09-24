import React from "react";

import TournamentPageFeed from "@/components/screens/tournaments/TournamentPageFeed";
import TournamentScreenTopComp from "@/components/screens/tournaments/TournamentScreenTopComp";

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <TournamentScreenTopComp />
      <TournamentPageFeed />
    </div>
  );
}
