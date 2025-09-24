"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { RankSecondaryIcon, CrownIcon } from "@/app/icons";

import { useAuth } from "@/context/AuthContext";
import ReactSelectInput from "@/components/common/ReactSelectInput";
import Pagination, { ShowingResults } from "@/components/common/Pagination";
import { leaderboardData } from "@/constants/data";
import GenericTable from "@/components/common/GenericTable";
import { TopLeaderboardCard } from "./LeaderboardAchievementFeedComp";
import { AchievementCard } from "@/components/screens/leaderboard/AchievementFeed";

function LeaderBoardTable({ paginatedSocial }) {
  return (
    <GenericTable
      data={paginatedSocial}
      columns={[
        {
          key: "rank",
          label: "Rank",
          render: (row) => (
            <span className="font-bold text-[var(--textOne)]">#{row.rank}</span>
          ),
        },
        {
          key: "player",
          label: "Player",
          render: (row) => (
            <div className="flex items-center gap-3">
              {row.avatar_url && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--borderTwo)]">
                  <Image
                    src={row.avatar_url}
                    alt={row.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col w-[5rem]">
                <span className="font-bold text-[var(--textOne)] truncate">
                  {row.name}
                </span>
                <span className="text-xs text-[var(--textTwo)]">
                  {row.country}
                </span>
              </div>
              {row?.rank === 1 ? (
                <CrownIcon size={30} color="transparent" />
              ) : row?.rank === 2 || row?.rank === 3 ? (
                <RankSecondaryIcon size={30} color="transparent" />
              ) : null}
            </div>
          ),
        },
        {
          key: "achievement",
          label: "Achievement",
          className: "hidden sm:table-cell", // hide below sm
        },
        {
          key: "equipment",
          label: "Equipment",
          className: "hidden sm:table-cell",
        },
        {
          key: "main_game",
          label: "Main Game",
          className: "hidden sm:table-cell",
        },
        {
          key: "points",
          label: "Points",
          render: (row) => (
            <span className="font-semibold text-[var(--textSeven)]">
              {row.points}
            </span>
          ),
        },
      ]}
    />
  );
}

function Top3Leaderboard({ leaderboardData }) {
  return (
    <div className="grid grid-cols-3   lg:gap-6 justify-center items-center place-items-center mb-[8vw] sm:mb-[3vw]">
      <TopLeaderboardCard
        leaderboardInfo={leaderboardData?.[1]}
        contClass="min-h-[25vw] max-w-[88%] lg:max-w-[80%] xl:max-w-[85%] w-full "
      />
      <TopLeaderboardCard
        leaderboardInfo={leaderboardData?.[0]}
        contClass="min-h-[25vw] max-w-[88%] lg:max-w-[80%] xl:max-w-[85%] w-full"
      />
      <TopLeaderboardCard
        leaderboardInfo={leaderboardData?.[2]}
        contClass="min-h-[25vw] max-w-[88%] lg:max-w-[80%] xl:max-w-[85%] w-full"
      />
    </div>
  );
}

function AchievementFeed() {
  const [achievementList, setAchievementList] = useState([]);

  useEffect(() => {
    setAchievementList(leaderboardData?.achievements);
  }, []);

  return (
    <div className="gradient-one p-3 w-full mt-8 h-full rounded-[16px] border border-[var(--borderThree)]">
      <div className="flex gap-2 items-center mb-5">
        <Star />
        <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[var(--textOne)]">
          Achievements
        </h1>
      </div>

      <div
        className="
    grid gap-4 justify-center
    grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
  "
      >
        {achievementList?.map((obj, index) => (
          <AchievementCard
            key={`achievement-${obj?.id}-${index}`}
            achievementInfo={obj}
          />
        ))}
      </div>
    </div>
  );
}

export default function SocialPageFeed() {
  const { headerSearchValue } = useAuth();
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
      ...new Set(
        leaderboardData.leaderboard.map((s) => s.country).filter(Boolean)
      ),
    ];
    return [
      { value: "", label: tCommon("filters.all") },
      ...unique.map((c) => ({ value: c, label: c })),
    ];
  }, [tCommon]);

  // Filter social posts
  const filteredSocial = useMemo(() => {
    return leaderboardData.leaderboard.filter((item) => {
      const matchesSearch =
        !headerSearchValue ||
        item.name.toLowerCase().includes(headerSearchValue.toLowerCase()) ||
        item.country.toLowerCase().includes(headerSearchValue.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        selectedCategory.value === "" ||
        item.country === selectedCategory.value;
      return matchesSearch && matchesCategory;
    });
  }, [selectedCategory, headerSearchValue]);

  const totalItems = filteredSocial.length;
  const safePageSize = pageSize || 6;
  const safeCurrentPage = currentPage || 1;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));

  // Reset currentPage if exceeds totalPages
  useEffect(() => {
    if (safeCurrentPage > totalPages) setCurrentPage(1);
  }, [totalPages]);

  // Paginate
  const paginatedSocial = useMemo(() => {
    const start = (safeCurrentPage - 1) * safePageSize;
    return filteredSocial.slice(start, start + safePageSize);
  }, [filteredSocial, safeCurrentPage, safePageSize]);

  return (
    <div className="mx-auto py-10 pb-10 w-full">
      <Top3Leaderboard leaderboardData={leaderboardData.leaderboard} />
      {/* Filter + ShowingResults */}
      <div className="flex flex-row max-[460px]:flex-col items-center max-[460px]:items-start justify-between gap-4 mb-8">
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
          className="ml-2"
          label={tCommon("socials")}
        />
      </div>
      <LeaderBoardTable paginatedSocial={paginatedSocial} />
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      <AchievementFeed />
    </div>
  );
}
