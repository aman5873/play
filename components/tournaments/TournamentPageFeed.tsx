"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import ReactSelectInput from "@/components/common/ReactSelectInput";
import { TournamentCard } from "@/components/tournaments/TournamentFeed";
import { tournamentsData } from "@/constants/gameData";
import { useAuth } from "@/context/AuthContext";
import Pagination, { ShowingResults } from "@/components/common/Pagination";

export default function TournamentPageFeed() {
  const { headerSearchValue } = useAuth();
  const { t: tCommon } = useTranslation("common");

  // Dropdown filter
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Tournament list
  const [tournamentList, setTournamentList] = useState([]);

  useEffect(() => {
    setTournamentList(tournamentsData?.tournaments);
  }, []);

  // Update pageSize responsively
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setPageSize(window.innerWidth < 768 ? 4 : 6);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Extract unique categories for dropdown
  const categoryOptions = useMemo(() => {
    const uniqueCategories = [
      ...new Set(tournamentList.map((g) => g.categories).filter(Boolean)),
    ];
    return [
      { value: "", label: tCommon("filters.all") },
      ...uniqueCategories.map((c) => ({ value: c, label: c })),
    ];
  }, [tournamentList, tCommon]);

  // Filtered tournaments
  const filteredTournaments = useMemo(() => {
    return tournamentList.filter((t) => {
      const matchesSearch =
        !headerSearchValue ||
        t.title?.toLowerCase().includes(headerSearchValue.toLowerCase()) ||
        t.status?.toLowerCase().includes(headerSearchValue.toLowerCase()) ||
        t.category?.toLowerCase().includes(headerSearchValue.toLowerCase()) ||
        t.description
          ?.toLowerCase()
          .includes(headerSearchValue.toLowerCase()) ||
        t.category?.toLowerCase().includes(headerSearchValue.toLowerCase()) ||
        t.game?.title?.toLowerCase().includes(headerSearchValue.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        selectedCategory.value === "" ||
        t.categories === selectedCategory.value;

      return matchesSearch && matchesCategory;
    });
  }, [tournamentList, headerSearchValue, selectedCategory]);

  // Pagination logic
  const totalItems = filteredTournaments.length;
  const safePageSize = pageSize || 6;
  const safeCurrentPage = currentPage || 1;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));

  // Reset currentPage if it exceeds totalPages
  useEffect(() => {
    if (safeCurrentPage > totalPages) setCurrentPage(1);
  }, [totalPages]);

  const paginatedTournaments = useMemo(() => {
    const start = (safeCurrentPage - 1) * safePageSize;
    return filteredTournaments.slice(start, start + safePageSize);
  }, [filteredTournaments, safeCurrentPage, safePageSize]);

  return (
    <>
      <TournamentCard
        tournamentInfo={tournamentList?.[0]}
        isFeatured={true}
        style={{ marginTop: 20 }}
      />
      <div className="mx-auto pb-20 w-full">
        {/* Filter + ShowingResults */}
        <div className="flex flex-col   sm:flex-row items-center justify-between gap-4 mb-8 ">
          <div className="w-[260px] lg:w-[260px]">
            <ReactSelectInput
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categoryOptions}
              placeholder={tCommon("filters.category")}
            />
          </div>
          <ShowingResults
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            className="ml-auto"
            label={tCommon("labels.games")}
          />
        </div>

        {/* Tournament cards */}
        <div className="flex flex-wrap gap-2 scroll-smooth scrollbar-hide mx-auto">
          {paginatedTournaments.length > 0 ? (
            paginatedTournaments.map((t) => (
              <TournamentCard
                key={t.id}
                tournamentInfo={t}
                showDesc
                style={{ maxWidth: "23rem" }}
              />
            ))
          ) : (
            <p style={{ color: "var(--textTwo)" }}>
              {tCommon("messages.noTournaments")}
            </p>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
