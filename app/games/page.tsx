import React from "react";
import GamePageFeed from "@/components/screens/games/GamePageFeed";
import GameScreenTopComp from "@/components/screens/games/GameScreenTopComp";

export default function Page() {
  return (
    <div className="flex flex-col gap-2 p-[2vw] sm:p-[1vw]">
      <GameScreenTopComp />
      <GamePageFeed />
    </div>
  );
}
