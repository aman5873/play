"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import TopComp from "@/components/TopComp";
import { gamesData } from "@/constants/gameData";
import ScrollableRowWrapper from "@/components/common/ScrollableRowWrapper";
import Image from "next/image";

// change
export default function GamePage() {
  const { gameId } = useParams();
  const [gameInfo, setGameInfo] = useState(null);

  // Fetch from local data
  useEffect(() => {
    if (gameId) {
      const game = gamesData.find((g) => g.id === Number(gameId));
      setGameInfo(game || null);
    }
  }, [gameId]);

  const backgroundImage = gameInfo?.images?.find(
    (img) => img?.is_primary
  )?.image_path;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TopComp
        content={{
          chip: "Game",
          title: gameInfo?.title,
          description: gameInfo?.description,
          backgroundImage,
          button: [
            { label: " Download game", redirect: "", type: "primary" },
            {
              label: " Watch tournaments",
              redirect: "",
              type: "secondary",
            },
          ],
        }}
      />

      <h1
        className="font-sans text-2xl md:text-3xl  font-semibold m-0"
        style={{ color: "var(--text)" }}
      >
        Gallery
      </h1>
      <ScrollableRowWrapper isReady={gameInfo?.images}>
        {gameInfo?.images?.map((obj, index) => {
          return (
            <div
              key={`${obj?.id}-${index + 1}`}
              className="relative h-[15rem] min-w-[24rem] max-w-sm rounded-lg mx-3 overflow-hidden transition-all duration-500 ease-in-out"
            >
              <Image
                src={obj?.image_path}
                alt={"image"}
                fill
                className="object-cover w-full transition-transform duration-500 ease-in-out"
              />
            </div>
          );
        })}
      </ScrollableRowWrapper>
    </div>
  );
}
