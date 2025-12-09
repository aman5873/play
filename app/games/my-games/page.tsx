import React from "react";
// import MyGameScreenTopComp from "@/components/screens/games/MyGameScreenTopComp";
import MyGamePageFeed from "@/components/screens/games/MyGamePageFeed";
import GameScreenTopComp from "@/components/screens/games/GameScreenTopComp";

export default function Page() {
  return (
    <div className="flex flex-col gap-2 p-[2vw] sm:p-[1vw]">
      <GameScreenTopComp />
      <MyGamePageFeed />
    </div>
  );
}
