"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { GameCard } from "@/components/games/GameFeed";
import ReactSelectInput from "@/components/common/ReactSelectInput";
import { useAuth } from "@/context/AuthContext";
import Pagination, { ShowingResults } from "@/components/common/Pagination";
import { getGameGenres, getGames, getGameStatuses } from "@/lib/game_ops";

export default function GamePageFeed() {
  const { headerSearchValue, isAuthenticated, setLoading } = useAuth();
  const { t: tCommon } = useTranslation("common");

  const [gameData, setGameData] = useState<any>(null);

  const [statusList, setStatusList] = useState([]);
  const [genresList, setGenresList] = useState([]);

  // Filters
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Dynamically adjust per_page based on screen size
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const newSize = window.innerWidth < 768 ? 4 : 8;
        setPageSize(newSize);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Fetch status & genres on mount + refetch games on pageSize change
  useEffect(() => {
    setCurrentPage(1);
    fetchGames({ page: 1, per_page: pageSize });

    getGameStatuses().then((res) => {
      if (res?.success && res?.data) setStatusList(res.data);
    });

    getGameGenres().then((res) => {
      if (res?.success && res?.data) setGenresList(res.data);
    });
  }, [pageSize, isAuthenticated]);

  const fetchGames = useCallback(
    async (params?: any) => {
      setLoading(true);
      try {
        const query: Record<string, any> = {};

        if (params?.per_page ?? pageSize)
          query.per_page = params?.per_page ?? pageSize;
        if (params?.page ?? currentPage)
          query.page = params?.page ?? currentPage;
        if (params?.search ?? headerSearchValue)
          query.search = params?.search ?? headerSearchValue;

        // ✅ Use selected IDs
        if (selectedStatus?.id) query.status_id = selectedStatus.id;
        if (selectedGenre?.id) query.genre_id = selectedGenre.id;

        const res: any = await getGames(query);
        if (res?.success && res?.data) {
          setGameData(res.data);
        }
      } finally {
        setLoading(false);
      }
    },
    [pageSize, currentPage, headerSearchValue, selectedStatus, selectedGenre]
  );

  // Refetch games when filters or search change
  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  useEffect(() => {
    if (headerSearchValue !== undefined) {
      setCurrentPage(1);
      fetchGames({ page: 1 });
    }
  }, [headerSearchValue]);

  return (
    <div className="mx-auto py-10 pb-20 w-full">
      {/* Filters + ShowingResults */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex gap-4">
          {/* Status Filter */}
          <div className="w-[260px] lg:w-[260px]">
            <ReactSelectInput
              value={selectedStatus}
              onChange={(value) => {
                setSelectedStatus(value);
                setCurrentPage(1);
              }}
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
          <div className="w-[260px] lg:w-[260px]">
            <ReactSelectInput
              value={selectedGenre}
              onChange={(value) => {
                setSelectedGenre(value);
                setCurrentPage(1);
              }}
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
        onPageChange={(page) => {
          setCurrentPage(page);
          fetchGames({ page });
        }}
      />
    </div>
  );
}
