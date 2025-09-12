"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { GameCard } from "@/components/games/GameFeed";
import { gamesData } from "@/constants/gameData";
import ReactSelectInput from "@/components/common/ReactSelectInput";
import { useAuth } from "@/context/AuthContext";
import Pagination, { ShowingResults } from "@/components/common/Pagination";

export default function GamePageFeed() {
  const { headerSearchValue } = useAuth();
  const { t: tCommon } = useTranslation("common");

  // Filters
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Update pageSize responsively
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setPageSize(window.innerWidth < 768 ? 4 : 8);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Extract unique categories & genres
  const categoryOptions = useMemo(() => {
    const unique = [
      ...new Set(gamesData.map((g) => g.category).filter(Boolean)),
    ];
    return [
      { value: "", label: tCommon("filters.all") },
      ...unique.map((c) => ({ value: c, label: c })),
    ];
  }, [tCommon]);

  const genreOptions = useMemo(() => {
    const allGenres = gamesData.map((g) => g.genres || []).flat();
    const unique = [...new Set(allGenres)];
    return [
      { value: "", label: tCommon("filters.all") },
      ...unique.map((g) => ({ value: g, label: g })),
    ];
  }, [tCommon]);

  // Filter games
  const filteredGames = useMemo(() => {
    return gamesData.filter((game) => {
      const matchesSearch =
        !headerSearchValue ||
        game.title?.toLowerCase().includes(headerSearchValue.toLowerCase()) ||
        game.status?.toLowerCase().includes(headerSearchValue.toLowerCase()) ||
        game.category
          ?.toLowerCase()
          .includes(headerSearchValue.toLowerCase()) ||
        game.description
          ?.toLowerCase()
          .includes(headerSearchValue.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        selectedCategory.value === "" ||
        game.category === selectedCategory.value;

      const matchesGenre =
        !selectedGenre ||
        selectedGenre.value === "" ||
        game.genres?.includes(selectedGenre.value);

      return matchesSearch && matchesCategory && matchesGenre;
    });
  }, [selectedCategory, selectedGenre, headerSearchValue]);

  // Safe values
  const totalItems = filteredGames?.length || 0;
  const safePageSize = pageSize || 6;
  const safeCurrentPage = currentPage || 1;

  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));

  // Reset currentPage if it exceeds totalPages
  useEffect(() => {
    if (safeCurrentPage > totalPages) setCurrentPage(1);
  }, [totalPages]);

  // Paginate
  const paginatedGames = useMemo(() => {
    const start = (safeCurrentPage - 1) * safePageSize;
    return filteredGames.slice(start, start + safePageSize);
  }, [filteredGames, safeCurrentPage, safePageSize]);

  return (
    <div className="mx-auto py-10 pb-20 w-full">
      {/* Filters + ShowingResults */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex gap-4">
          <div className="w-[260px] lg:w-[260px]">
            <ReactSelectInput
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categoryOptions}
              placeholder={tCommon("filters.category")}
            />
          </div>
          <div className="w-[260px] lg:w-[260px]">
            <ReactSelectInput
              value={selectedGenre}
              onChange={setSelectedGenre}
              options={genreOptions}
              placeholder={tCommon("filters.genre")}
            />
          </div>
        </div>
        <ShowingResults
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={filteredGames.length}
          className="ml-auto"
          label={tCommon("games")}
        />
      </div>

      {/* Game cards */}
      <div className="flex flex-wrap gap-2">
        {paginatedGames.length > 0 ? (
          paginatedGames.map((game) => (
            <GameCard key={game.id} gameInfo={game} />
          ))
        ) : (
          <p className="text-[var(--textTwo)]">{tCommon("messages.noGames")}</p>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
