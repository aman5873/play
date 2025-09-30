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
import { CardChip } from "@/components/common/CardComp";
import AppModal from "@/components/AppModal";

const initData = {
  total_points: "10,800",
  game_played: 756,
  win_ratio: "85%",
  avg_score: "2720",
  total_paly_time: "23h 18m",
  recent_activities: [
    {
      id: 1,
      title: "Victory vs CyberNinja",
      date_time: "2 hours ago",
      points: "+125",
    },
    {
      id: 1,
      title: "Achievement Unlocked",
      date_time: "5 hours ago",
      points: "+25",
    },
    {
      id: 1,
      title: "Ranked Match Win",
      date_time: "1 day ago",
      points: "+100",
    },
  ],
};

function PlayerStats({ memberInfo }) {
  const Card = ({ value, label, color = "text-[var(--textOne)]" }: any) => {
    return (
      <div className="flex flex-col justify-center items-center">
        <span className={`text-lg font-bold ${color}`}>{value}</span>
        <span className="text-sm text-[var(--textTwo)]">{label}</span>
      </div>
    );
  };
  const Row = ({ value, label, color = "text-[var(--textOne)]" }: any) => {
    return (
      <div className="flex flex-row justify-between items-center">
        <span className="text-sm text-[var(--textTwo)] font-medium">
          {label}
        </span>
        <span className={`text-md font-semibold ${color}`}>{value}</span>
      </div>
    );
  };

  return (
    <div
      className={`gradient-modal-card border border-[var(--borderThree)] rounded-lg p-2 h-fit`}
    >
      <span className="text-xl font-bold text-[var(--textOne)] truncate">
        Player Stats
      </span>
      <div className="grid grid-cols-2 gap-2 py-2">
        <Card
          value={memberInfo?.total_points}
          label="Total Points"
          color="text-[var(--textThree)]"
        />
        <Card value={memberInfo?.game_played} label="Games Played" />
        <Card value={memberInfo?.win_ratio} label="Win Rate" />
        <Card value={memberInfo?.avg_score} label="Avg Score" />
      </div>
      <div className="bg-[var(--bgFive)] border-[1px] border-[var(--borderFive)] rounded-lg flex flex-col gap-2 p-2">
        <Row value={memberInfo?.total_paly_time} label="Total Play Time" />
        <Row value={memberInfo?.equipment} label="Equipment" />
        <Row value={memberInfo?.main_game} label="Main Game" />
      </div>
    </div>
  );
}

function PlayerActivity({ memberInfo }) {
  const Row = ({ title, subTitle, value, color = "" }: any) => {
    return (
      <div className="flex flex-row justify-between items-between bg-[var(--bgFive)] border-[1px] border-[var(--borderFive)] rounded-lg p-3 h-fit">
        <div className="flex flex-col gap-1">
          <span className={`text-md font-semibold text-[var(--textOne)]`}>
            {title}
          </span>
          <span className="text-sm text-[var(--textTwo)] font-semibold">
            {subTitle}
          </span>
        </div>
        <span className={`text-md font-semibold ${color}`}>{value}</span>
      </div>
    );
  };
  return (
    <div
      className={`gradient-modal-card border border-[var(--borderThree)] rounded-lg p-2`}
    >
      <p className="text-xl font-bold text-[var(--textOne)] truncate mb-2">
        Recent Activity
      </p>
      <div className="flex flex-col gap-2">
        {memberInfo?.recent_activities?.map((obj, index) => {
          return (
            <Row
              key={`Activity-row-${obj?.id}-${index}`}
              title={obj?.title}
              subTitle={obj?.date_time}
              value={obj?.points}
              color="text-[var(--textThree)]"
            />
          );
        })}
      </div>
    </div>
  );
}

function MemberInfoModal({ show, onClose, memberInfo }) {
  return (
    <AppModal
      open={show}
      onClose={onClose}
      closeOnBackdropClick={false}
      contClass="w-96 sm:w-[600px] max-w-2xl"
    >
      <div>
        <div className="flex items-center gap-3">
          {memberInfo.avatar_url && (
            <div className="relative w-18 h-18 rounded-full overflow-hidden border-2 border-[var(--borderTwo)]">
              <Image
                src={memberInfo.avatar_url}
                alt={memberInfo.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col ">
            <span className="text-xl font-bold text-[var(--textOne)] truncate">
              {memberInfo.name}
            </span>
            <div className="flex gap-4">
              <span className="text-md font-semibold lg:text-lg text-[var(--textTwo)]">
                Rank #{memberInfo.rank}
              </span>
              <span className="text-md font-semibold lg:text-lg text-[var(--textTwo)]">
                {memberInfo.country}
              </span>
              <CardChip label={memberInfo.achievement} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <PlayerStats memberInfo={memberInfo} />
          <PlayerActivity memberInfo={memberInfo} />
        </div>
      </div>
    </AppModal>
  );
}

function LeaderBoardTable({ paginatedSocial, onClickRow }) {
  return (
    <GenericTable
      data={paginatedSocial}
      onClickRow={onClickRow}
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
          label: "Achievement",
          render: (row: any) => <CardChip label={row?.achievement} />,
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
            <span className="font-bold text-[var(--textSeven)]">
              {row.points}
            </span>
          ),
        },
      ]}
    />
  );
}

function Top3Leaderboard({ leaderboardData, onClick }) {
  return (
    <div className="grid grid-cols-3   lg:gap-6 justify-center items-center place-items-center mb-[8vw] sm:mb-[3vw]">
      <TopLeaderboardCard
        leaderboardInfo={leaderboardData?.[1]}
        contClass="min-h-[25vw] max-w-[88%] lg:max-w-[80%] xl:max-w-[85%] w-full "
        onClick={() => onClick(leaderboardData?.[1])}
      />
      <TopLeaderboardCard
        leaderboardInfo={leaderboardData?.[0]}
        contClass="min-h-[25vw] max-w-[88%] lg:max-w-[80%] xl:max-w-[85%] w-full"
        onClick={() => onClick(leaderboardData?.[1])}
      />
      <TopLeaderboardCard
        leaderboardInfo={leaderboardData?.[2]}
        contClass="min-h-[25vw] max-w-[88%] lg:max-w-[80%] xl:max-w-[85%] w-full"
        onClick={() => onClick(leaderboardData?.[1])}
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
  const [memberToShow, setMemberToShow] = useState(null);

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
      <MemberInfoModal
        show={Boolean(memberToShow)}
        onClose={() => setMemberToShow(null)}
        memberInfo={{ ...memberToShow, ...initData }}
      />
      <Top3Leaderboard
        leaderboardData={leaderboardData.leaderboard}
        onClick={setMemberToShow}
      />
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
          className="ml-2"
          label={tCommon("socials")}
        />
      </div>
      <LeaderBoardTable
        paginatedSocial={paginatedSocial}
        onClickRow={setMemberToShow}
      />
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
