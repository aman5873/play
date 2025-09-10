"use client";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { gamesData } from "@/constants/gameData";
import Image from "next/image";
import ScrollableRowWrapper from "@/components/common/ScrollableRowWrapper";
import { CategoryCardComp } from "../common/CardComp";
import { ScreenDetailsComp } from "@/components/TopComp";

const gameSection = {
  chip: [
    {
      label: "Game Library",
      icon: "game",
      type: "secondary",
    },
  ],
  title: "Discover",
  highlightTitle: "AMAZING GAMES",
  description:
    "Explore our vast collection of premium games across all genres. Find your next gaming obsession.",
};

export function GameCard({
  gameInfo,
  showDesc = false,
  contClass,
  style = {},
}) {
  const router = useRouter();
  const primaryImage = gameInfo?.images.find((img) => img?.is_primary);

  return (
    <div
      className={`gradient-one border border-[var(--borderThree)] p-4 group relative w-68 min-w-[12rem] max-w-xs flex-shrink-0 mx-2 overflow-hidden rounded-xl flex flex-col ${contClass}`}
      style={{
        ...style,
      }}
    >
      {/* Image wrapper */}
      <div className="relative w-full  h-[170px]  sm:h-[150px]  lg:h-[197px]  overflow-hidden rounded-lg group">
        <Image
          src={primaryImage?.image_path}
          alt={gameInfo?.title}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </div>

      {/* Info section */}
      <div className=" gap-2 flex flex-col overflow-hidden mt-3">
        <h2 className="sm:text-lg md:text-xl lg:text2xl font-bold truncate text-[var(--textOne)]">
          {gameInfo?.title}
        </h2>
        <h2 className=" text-base font-regular truncate text-[var(--textTwo)] ">
          {gameInfo?.active_players_count} active players
        </h2>

        {/* genres */}
        <CategoryCardComp categories={gameInfo?.genres} />

        {/* insert here  */}
        {showDesc && gameInfo?.description && (
          <p
            className=" text-[14px] mt-2"
            style={{
              color: "var(--subtitle)",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {gameInfo?.description}
          </p>
        )}
      </div>

      <button
        onClick={() => router.push(`/games/${gameInfo?.id}`)}
        className={`px-4 py-2 mt-4  flex items-center justify-center rounded-[100px] border border-[var(--primary)] cursor-pointer text-sm sm:text-base font-rajdhani font-bold transition-all hover:scale-[1.02] hover:opacity-95 duration-300 shadow-md
                 bg-[var(--primary)] text-[var(--secondary)]`}
      >
        View Game
      </button>
    </div>
  );
}

export default function GameFeed() {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    setGameList(gamesData);
  }, []);

  return (
    <div className="relative px-1 py-1 pb-20">
      {/* Scroll container */}
      <ScrollableRowWrapper isReady={gameList}>
        {gameList.map((obj) => (
          <GameCard key={obj?.id} gameInfo={obj} />
        ))}
      </ScrollableRowWrapper>
      <div className="flex justify-center items-center mb-5 mt-5 w-full">
        <Link
          href="/games"
          className="px-5 py-2 border rounded-[50px] border-[var(--textOne)] text-[var(--textOne)]  hover:text-[var(--textTwo)] hover:border-[var(--textTwo)]  cursor-pointer "
        >
          View All
        </Link>
      </div>
    </div>
  );
}

export function GameFeedComp() {
  return (
    <div>
      <div className="w-full rounded-lg  p-4 sm:p-8 lg:p-8 flex flex-col items-center gap-4">
        <ScreenDetailsComp content={gameSection} isCentered={true} />
      </div>
      <GameFeed />
    </div>
  );
}
