"use client";

import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

import { GameCard } from "@/components/games/GameFeed";
import ReactSelectInput from "@/components/common/ReactSelectInput";
import { useAuth } from "@/context/AuthContext";
import Pagination, { ShowingResults } from "@/components/common/Pagination";
import { getGameGenres, getGames, getGameStatuses } from "@/lib/game_ops";

export default function GamePageFeed() {
  const { headerSearchValue, isAuthenticated, setLoading } = useAuth();
  const { t: tCommon } = useTranslation("common");

  const initialLoad = useRef(true);
  const [gameData, setGameData] = useState<any>(null);

  const [statusList, setStatusList] = useState([]);
  const [genresList, setGenresList] = useState([]);

  // Filters
  const [selectedStatus, setSelectedStatus] = useState<any>(null);
  const [selectedGenre, setSelectedGenre] = useState<any>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Dynamically adjust per_page based on screen size
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const handleResize = () => {
  //       const newSize = window.innerWidth < 768 ? 4 : 8;
  //       setPageSize(newSize);
  //     };

  //     handleResize();
  //     window.addEventListener("resize", handleResize);
  //     return () => window.removeEventListener("resize", handleResize);
  //   }
  // }, []);

  // Fetch status & genres on mount
  useEffect(() => {
    if (!isAuthenticated) return;

    getGameStatuses().then((res) => {
      if (res?.success && res?.data) setStatusList(res.data);
    });

    getGameGenres().then((res) => {
      if (res?.success && res?.data) setGenresList(res.data);
    });
  }, [isAuthenticated]);

  // Fetch games whenever filters, search, pagination, or pageSize changes
  useEffect(() => {
    if (!isAuthenticated) return;

    // Skip first search-triggered fetch
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }

    const params: Record<string, any> = {
      page: currentPage,
      per_page: pageSize,
    };
    // Only add search if it’s not empty
    if (headerSearchValue?.trim()) {
      params.search = headerSearchValue.trim();
    }

    if (selectedStatus?.id) params.status_id = selectedStatus.id;
    if (selectedGenre?.id) params.genre_id = selectedGenre.id;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res: any = await getGames(params);
        if (res?.success && res?.data) setGameData(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    isAuthenticated,
    currentPage,
    pageSize,
    headerSearchValue,
    selectedStatus,
    selectedGenre,
  ]);

  return (
    <div className="mx-auto py-10 pb-20 w-full">
      {/* Filters + ShowingResults */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex  gap-4">
          {/* Status Filter */}
          <div className="w-full sm:w-full md:w-[260px] lg:w-[260px] ">
            <ReactSelectInput
              value={selectedStatus}
              onChange={(value) => setSelectedStatus(value)}
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
          <div className="w-full sm:w-full md:w-[260px] lg:w-[260px] ">
            <ReactSelectInput
              value={selectedGenre}
              onChange={(value) => setSelectedGenre(value)}
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
          className="ml-auto"
          label={tCommon("games")}
        />
      </div>

      {/* Game Cards */}
      <div className="flex flex-wrap gap-4 justify-center">
        {gameData?.data?.length > 0 ? (
          gameData.data.map((game: any) => (
            <GameCard key={game.id} gameInfo={game} />
          ))
        ) : (
          <p className="text-[var(--textTwo)]">{tCommon("messages.noGames")}</p>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={gameData?.current_page || currentPage}
        totalPages={gameData?.last_page || 1}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
