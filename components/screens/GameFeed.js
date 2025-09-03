"use client";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Chip from "@components/common/Chip";
import { gamesData } from "@/constants/gameData";
import Image from "next/image";
import ScrollableRowWrapper from "@/components/common/ScrollableRowWrapper";

export function GameCard({
  gameInfo,
  showDesc = false,
  contClass,
  style = {},
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const primaryImage = gameInfo?.images.find((img) => img?.is_primary);

  return (
    <div
      className={`group relative w-80 min-w-[18rem] max-w-xs flex-shrink-0 mx-2 overflow-hidden rounded-xl flex flex-col ${contClass}`}
      style={{
        background: "var(--bg)",
        border: "1px solid var(--subtitle)",
        backgroundColor: "var(--surface)",
        height: showDesc ? "22.8rem" : "18.2rem", // fixed card height

        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image wrapper */}
      <div
        className="relative w-full overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          height: hovered ? "10.4rem" : "13rem", // small change
        }}
      >
        <Image
          src={primaryImage?.image_path}
          alt={gameInfo?.title}
          fill
          className={`object-cover transition-transform duration-500 ease-in-out ${
            hovered ? "scale-105" : "scale-100"
          }`}
        />
        <Chip label={gameInfo?.category} contClass="absolute top-2 right-2" />
      </div>
      {/* Info section */}
      <div className="flex-grow p-3.5 overflow-hidden">
        <h1
          className="font-sans text-lg font-semibold truncate"
          style={{ color: "var(--text)" }}
        >
          {gameInfo?.title}
        </h1>
        <h1
          className="font-sans text-base font-regular truncate"
          style={{ color: "var(--subtitle)" }}
        >
          {gameInfo?.active_players_count} active players
        </h1>
        {/* insert here  */}
        {showDesc && gameInfo?.description && (
          <p
            className="font-sans text-[14px] mt-2"
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

      {/* Button row (always reserved height, button animates) */}
      <button
        onClick={() => router.push(`/games/${gameInfo?.id}`)}
        className={`absolute   cursor-pointer font-semibold bottom-4 left-1/2 -translate-x-1/2 w-[90%] px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transform transition-all duration-500 ease-in-out ${
          hovered
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
        style={{ backgroundColor: "var(--title)", color: "var(--background)" }}
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
    <div className="relative px-10 py-10 pb-20">
      <Chip label="Games" />
      <div className="flex justify-between items-center">
        <h1
          className="font-sans text-2xl md:text-3xl lg:text-4xl font-semibold m-0 mb-5"
          style={{ color: "var(--text)" }}
        >
          Featured Games
        </h1>
        <Link href="/games" className="text-[var(--subtitle)] cursor-pointer">
          See all games
        </Link>
      </div>

      {/* Scroll container */}
      <ScrollableRowWrapper isReady={gameList}>
        {gameList.map((obj) => (
          <GameCard key={obj?.id} gameInfo={obj} />
        ))}
      </ScrollableRowWrapper>
    </div>
  );
}
