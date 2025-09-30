"use client";

import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

import Loading from "@/components/common/Loading";
import { GameCard } from "@/components/screens/games/GameFeed";
import ReactSelectInput from "@/components/common/ReactSelectInput";
import { useAuth } from "@/context/AuthContext";
import Pagination, { ShowingResults } from "@/components/common/Pagination";
import { getGameGenres, getGames, getGameStatuses } from "@/lib/game_ops";
import { useLanguage } from "@/context/LanguageContext";

export default function GamePageFeed() {
  const { headerSearchValue, isAuthenticated } = useAuth();
  const { t: tCommon } = useTranslation("common");
  const { lang } = useLanguage();
  const [loading, setLoading] = useState(false);

  const [gameData, setGameData] = useState<any>(null);
  const [statusList, setStatusList] = useState<any[]>([]);
  const [genresList, setGenresList] = useState<any[]>([]);

  // Filters
  const [selectedStatus, setSelectedStatus] = useState<any>(null);
  const [selectedGenre, setSelectedGenre] = useState<any>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const initialMount = useRef(true);

  // Fetch filters (statuses & genres)
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchFilters = async () => {
      setLoading(true);
      try {
        const [statusRes, genreRes] = await Promise.all([
          getGameStatuses(),
          getGameGenres(),
        ]);

        if (statusRes?.success && statusRes?.data)
          setStatusList(statusRes.data);
        if (genreRes?.success && genreRes?.data) setGenresList(genreRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Only skip duplicate fetch on initial mount
    if (initialMount.current) {
      initialMount.current = false;
      fetchFilters();
    } else {
      // For subsequent lang changes, always fetch
      fetchFilters();
    }
  }, [isAuthenticated, lang]);

  // Fetch games whenever filters, search, pagination, or language changes
  const fetchGames = async () => {
    if (!isAuthenticated) return;

    const params: Record<string, any> = {
      page: currentPage,
      per_page: pageSize,
    };

    if (headerSearchValue?.trim()) params.search = headerSearchValue.trim();
    if (selectedStatus?.id) params.status_id = selectedStatus.id;
    if (selectedGenre?.id) params.genre_id = selectedGenre.id;

    setLoading(true);
    try {
      const res: any = await getGames(params);
      if (res?.success && res?.data) setGameData(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [
    isAuthenticated,
    currentPage,
    pageSize,
    headerSearchValue,
    selectedStatus,
    selectedGenre,
    lang,
  ]);

  return (
    <>
      <Loading loading={loading} />
      <div className="mx-auto py-10 pb-20 w-full">
        {/* Filters + ShowingResults */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex flex-wrap gap-4 w-full sm:flex-1">
            {/* Status Filter */}
            <div className="flex-1 min-w-[170px] max-w-[260px] sm:w-auto">
              <ReactSelectInput
                value={selectedStatus}
                onChange={setSelectedStatus}
                options={[
                  { id: "", name: tCommon("filters.all") },
                  ...statusList,
                ].map((s) => ({
                  value: s.id,
                  label: s.name,
                  id: s.id,
                }))}
                placeholder={tCommon("filters.status")}
              />
            </div>

            {/* Genre Filter */}
            <div className="flex-1 min-w-[170px] max-w-[260px] sm:w-auto">
              <ReactSelectInput
                value={selectedGenre}
                onChange={setSelectedGenre}
                options={[
                  { id: "", name: tCommon("filters.all") },
                  ...genresList,
                ].map((g) => ({
                  value: g.id,
                  label: g.name,
                  id: g.id,
                }))}
                placeholder={tCommon("filters.genre")}
              />
            </div>
          </div>

          <ShowingResults
            currentPage={gameData?.current_page || 1}
            pageSize={gameData?.per_page || pageSize}
            totalItems={gameData?.total || 0}
            className="ml-auto mt-2 sm:mt-0"
            label={tCommon("games")}
          />
        </div>

        {/* Game Cards */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
          {gameData?.data?.length > 0 ? (
            gameData.data.map((game: any) => (
              <GameCard
                key={game.id}
                gameInfo={game}
                contClass="w-full 
            [@media(min-width:460px)_and_(max-width:619px)]:w-[90%] [@media(min-width:620px)]:w-[18rem]
            "
              />
            ))
          ) : (
            <p className="text-[var(--textTwo)]">
              {tCommon("messages.noGames")}
            </p>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={gameData?.current_page || currentPage}
          totalPages={gameData?.last_page || 1}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
