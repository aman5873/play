import React from "react";
import { TopBgComp } from "@/components/TopComp";
import GamePageFeed from "@/components/games/GamePageFeed";

const content = {
  chip: [{ label: "Game Library", icon: "game", type: "primary" }],
  title: "Discover",
  highlightTitle: "AMAZING GAMES",
  description:
    "Explore our vast collection of premium games across all genres. Find your next gaming obsession.",
  backgroundImage:
    "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=2078&auto=format&fit=crop",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <TopBgComp content={content} />
      <GamePageFeed />
    </div>
  );
}
