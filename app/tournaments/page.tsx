import React from "react";

import TournamentPageFeed from "@/components/tournaments/TournamentPageFeed";
import TournamentScreenTopComp from "@/components/tournaments/TournamentScreenTopComp";

const content = {
  chip: [{ label: "Live Gaming Tournaments", icon: "trophy", type: "primary" }],
  title: "Mobile & PC Gaming",
  highlightTitle: "Championships",
  description:
    "Join elite gaming tournaments across mobile and PC platforms. Showcase your skills in your favorite games and compete for massive prize pools.",
  backgroundImage:
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop",
};

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <TournamentScreenTopComp />
      <TournamentPageFeed />
    </div>
  );
}
