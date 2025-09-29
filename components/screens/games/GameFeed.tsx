"use client";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Image from "next/image";
import ScrollableRowWrapper from "@/components/common/ScrollableRowWrapper";

import { ScreenDetailsComp } from "@/components/TopComp";
import { getGames } from "@/lib/game_ops";
import { CategoryCardComp } from "@/components/common/CardComp";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import Loading from "@/components/common/Loading";

export function GameCard({
  gameInfo,
  contClass = "w-68 min-w-[12rem] max-w-xs",
  style = {},
}) {
  const router = useRouter();
  const { t: tScreen } = useTranslation("screen");

  const primaryImage = gameInfo?.images.find((img: any) => img?.is_primary);
  const genreList = gameInfo?.genres.map((genre: any) => genre?.name) ?? [];

  return (
    <div
      className={`gradient-one border border-[var(--borderThree)] p-4 group relative  flex-shrink-0 overflow-hidden rounded-xl flex flex-col ${contClass}`}
      style={{
        ...style,
      }}
    >
      {/* Image wrapper */}
      <div className="relative w-full  h-[170px]  sm:h-[150px]  lg:h-[197px]  overflow-hidden rounded-lg group">
        {primaryImage?.image_url && (
          <Image
            src={primaryImage?.image_url}
            alt={gameInfo?.title}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        )}
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
        <CategoryCardComp categories={genreList} />
      </div>

      <button
        onClick={() => router.push(`/games/${gameInfo?.id}`)}
        className={`px-4 py-2 mt-4  flex items-center justify-center rounded-[100px] border border-[var(--primary)] cursor-pointer text-sm sm:text-base font-rajdhani font-bold transition-all hover:scale-[1.02] hover:opacity-95 duration-300 shadow-md
                 bg-[var(--primary)] text-[var(--secondary)]`}
      >
        {tScreen("game.labels.view_game")}
      </button>
    </div>
  );
}

export default function GameFeed() {
  const { isAuthenticated, setLoading } = useAuth();
  const [gameData, setGameData] = useState(null);
  const { t: tCommon } = useTranslation("common");

  function fetchGames(param?: any) {
    if (isAuthenticated) {
      setLoading(true);
      getGames(param).then((res: any) => {
        setLoading(false);
        if (res?.success && res?.data) setGameData(res.data);
      });
    }
  }

  useEffect(() => {
    fetchGames();
  }, [isAuthenticated]);

  return (
    <>
      <div className="relative px-1 py-1 pb-20">
        {/* Scroll container */}
        <ScrollableRowWrapper isReady={Boolean(gameData?.data)}>
          {gameData?.data?.map((obj: any) => (
            <GameCard key={obj?.id} gameInfo={obj} />
          ))}
        </ScrollableRowWrapper>
        <div className="flex justify-center items-center mb-5 mt-5 w-full">
          <Link
            href="/games"
            className="px-5 py-2 border rounded-[50px] border-[var(--textOne)] text-[var(--textOne)]  hover:text-[var(--textTwo)] hover:border-[var(--textTwo)]  cursor-pointer "
          >
            {tCommon("common_labels.view_all")}
          </Link>
        </div>
      </div>
    </>
  );
}

export function GameFeedComp() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <div>
      <div className="w-full rounded-lg  p-4 sm:p-8 lg:p-8 flex flex-col items-center gap-4">
        <ScreenDetailsComp
          content={{
            chip: [
              {
                label: tScreen("game.chip"),
                icon: "game",
                type: "secondary",
              },
            ],
            title: tScreen("game.title"),
            highlightTitle: tScreen("game.highlightTitle"),
            description: tScreen("game.description"),
          }}
          isCentered={true}
        />
      </div>
      <GameFeed />
    </div>
  );
}
