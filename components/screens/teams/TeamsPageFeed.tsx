"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";

import ReactSelectInput from "@/components/common/ReactSelectInput";
import Pagination, { ShowingResults } from "@/components/common/Pagination";

import { teamsData } from "@/constants/data";
import Image from "next/image";
import { CrownIcon, RankSecondaryIcon } from "@/app/icons";
import GenericTable from "@/components/common/GenericTable";
import { CardChip } from "@/components/common/CardComp";

function TeamsTable(props: any) {
  const { paginatedTeams } = props;
  const { t: tScreen } = useTranslation("screen");
  return (
    <GenericTable
      data={paginatedTeams}
      columns={[
        {
          key: "rank",
          label: tScreen("teams.labels.rank"),
          render: (row: any) => (
            <span className="font-bold text-[var(--textOne)]">#{row.rank}</span>
          ),
        },
        {
          key: "title",
          label: tScreen("teams.labels.team"),
          render: (row: any) => (
            <div className="flex items-center gap-3">
              {row.logo && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--borderTwo)]">
                  <Image
                    src={row?.logo}
                    alt={row?.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col w-[7rem] max-w-full">
                <span className="font-bold text-[var(--textOne)] truncate">
                  {row?.title}
                </span>
                <span className="text-xs text-[var(--textTwo)]">
                  {row?.country}
                </span>
              </div>
              {row?.rank === 1 ? (
                <CrownIcon size={30} color="transparent" />
              ) : row?.rank === 2 || row?.rank === 3 ? (
                <RankSecondaryIcon
                  size={30}
                  color="transparent"
                  stroke="var(--textOne)"
                />
              ) : null}
            </div>
          ),
        },
        {
          key: "achievement",
          label: tScreen("teams.labels.achievement"),
          render: (row: any) => <CardChip label={row?.achievement} />,
        },
        {
          key: "success_rate",
          label: tScreen("teams.labels.success_rate"),
          className: "hidden sm:table-cell",
        },

        {
          key: "points",
          label: tScreen("teams.labels.points"),
          render: (row: any) => (
            <span className="font-bold text-[var(--textSeven)]">
              {row?.points}
            </span>
          ),
        },
      ]}
    />
  );
}

export default function TeamsPageFeed() {
  const { headerSearchValue, setLoading } = useAuth();
  const { t: tCommon } = useTranslation("common");

  // Filters
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  // Category options
  const categoryOptions = useMemo(() => {
    const unique = [
      ...new Set(teamsData.map((s) => s.country).filter(Boolean)),
    ];
    return [
      { value: "", label: tCommon("filters.all") },
      ...unique.map((c) => ({ value: c, label: c })),
    ];
  }, [tCommon]);

  const filteredTeams = useMemo(() => {
    return teamsData.filter((item) => {
      const matchesSearch =
        !headerSearchValue ||
        item.title.toLowerCase().includes(headerSearchValue.toLowerCase()) ||
        item.country.toLowerCase().includes(headerSearchValue.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        selectedCategory.value === "" ||
        item.country === selectedCategory.value;

      return matchesSearch && matchesCategory;
    });
  }, [selectedCategory, headerSearchValue]);

  const totalItems = filteredTeams.length;
  const safePageSize = pageSize || 6;
  const safeCurrentPage = currentPage || 1;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));

  // Reset currentPage if exceeds totalPages
  useEffect(() => {
    if (safeCurrentPage > totalPages) setCurrentPage(1);
  }, [totalPages]);

  // Paginate
  const paginatedTeams = useMemo(() => {
    const start = (safeCurrentPage - 1) * safePageSize;
    return filteredTeams.slice(start, start + safePageSize);
  }, [filteredTeams, safeCurrentPage, safePageSize]);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  return (
    <div className="mx-auto py-10 w-full">
      {/* Filter + ShowingResults */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex-1 min-w-[170px] max-w-[260px] sm:w-auto">
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
          label={tCommon("teams")}
        />
      </div>

      <TeamsTable paginatedTeams={paginatedTeams} />
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
