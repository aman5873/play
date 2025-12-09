"use client";
import GameForm, {
  CreateGameTopComp,
} from "@/components/screens/games/GameForm";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { getMyGames } from "@/lib/game_ops";
import { decodeUUID } from "@/lib/system";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function GameUpdatePageClient() {
  const { isAuthenticated } = useAuth();
  const { lang } = useLanguage();

  const { gameId: encryptedGameId } = useParams();
  const decryptedGameId = decodeUUID(encryptedGameId);

  const [loading, setLoading] = useState(false);
  const [gameInfo, setGameInfo] = useState(null);

  const initialRun = useRef(true);

  const fetchGame = async (id) => {
    if (!id) return;
    setLoading(true);
    const res = await getMyGames(id);
    setLoading(false);
    if (res?.success) setGameInfo(res.data);
  };

  useEffect(() => {
    if (!decryptedGameId) return;

    if (initialRun.current) {
      initialRun.current = false; // block dev duplicate mount
      fetchGame(decryptedGameId);
    }
  }, [decryptedGameId]);

  // ⭐ 2️⃣ Re-run when auth OR lang changes
  const prevAuth = useRef(null);
  const prevLang = useRef(null);

  useEffect(() => {
    if (!decryptedGameId) return;

    const shouldRun =
      (prevAuth.current === false && isAuthenticated === true) ||
      (prevLang.current !== null && prevLang.current !== lang);

    if (shouldRun) {
      fetchGame(decryptedGameId);
    }

    prevAuth.current = isAuthenticated;
    prevLang.current = lang;
  }, [isAuthenticated, lang, decryptedGameId]);

  return (
    <div className="flex flex-col gap-2 p-[1.2vw] sm:p-[1vw]">
      <CreateGameTopComp />
      <GameForm type={"update"} initGameData={gameInfo} />
    </div>
  );
}
