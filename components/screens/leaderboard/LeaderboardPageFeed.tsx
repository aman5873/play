"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { RankSecondaryIcon, CrownIcon } from "@/app/icons";

import { useAuth } from "@/context/AuthContext";
import Pagination, { ShowingResults } from "@/components/common/Pagination";

import GenericTable from "@/components/common/GenericTable";
import { TopLeaderboardCard } from "./LeaderboardAchievementFeedComp";
import AchievementFeed from "@/components/screens/leaderboard/AchievementFeed";
import { CardChip } from "@/components/common/CardComp";
import AppModal from "@/components/AppModal";
import { getLeaderboard } from "@/lib/leaderboard_ops";
import CountryPicker from "@/components/Form/CountryPicker";
import Loading from "@/components/common/Loading";

function PlayerStats({ memberInfo }) {
  const { t: tScreen } = useTranslation("screen");
  const Card = ({ value, label, color = "text-[var(--textOne)]" }: any) => {
    return (
      <div className="flex flex-col justify-center items-center">
        <span className={`text-lg font-bold ${color}`}>{value ?? "N/A"}</span>
        <span className="text-sm text-[var(--textTwo)]">{label}</span>
      </div>
    );
  };
  // const Row = ({ value, label, color = "text-[var(--textOne)]" }: any) => {
  //   return (
  //     <div className="flex flex-row justify-between items-center">
  //       <span className="text-sm text-[var(--textTwo)] font-medium">
  //         {label}
  //       </span>
  //       <span className={`text-md font-semibold ${color}`}>{value}</span>
  //     </div>
  //   );
  // };

  return (
    <div
      className={`gradient-modal-card border border-[var(--borderThree)] rounded-lg p-2 h-fit`}
    >
      <span className="text-xl font-bold text-[var(--textOne)] truncate">
        {tScreen("leaderboard.labels.playerStats")}
      </span>
      <div className="grid grid-cols-2 gap-2 py-2">
        <Card
          value={memberInfo?.total_points}
          label={tScreen("leaderboard.labels.totalPoints")}
          color="text-[var(--textThree)]"
        />
        <Card
          value={memberInfo?.game_played}
          label={tScreen("leaderboard.labels.gamesPlayed")}
        />
        <Card
          value={memberInfo?.win_ratio ?? "0%"}
          label={tScreen("leaderboard.labels.winRate")}
        />
        <Card
          value={memberInfo?.avg_score}
          label={tScreen("leaderboard.labels.avgScore")}
        />
      </div>
      {/* <div className="bg-[var(--bgFive)] border-[1px] border-[var(--borderFive)] rounded-lg flex flex-col gap-2 p-2">
        <Row
          value={memberInfo?.total_paly_time ?? "N/A"}
          label={tScreen("leaderboard.labels.totalPlayTime")}
        />
        <Row
          value={memberInfo?.equipment ?? "N/A"}
          label={tScreen("leaderboard.labels.equipment")}
        />
        <Row
          value={memberInfo?.main_game ?? "N/A"}
          label={tScreen("leaderboard.labels.mainGame")}
        />
      </div> */}
    </div>
  );
}

function PlayerActivity({ memberInfo }) {
  const { t: tScreen } = useTranslation("screen");

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
        {tScreen("leaderboard.labels.recentActivity")}
      </p>
      {memberInfo?.recent_activities?.length > 0 ? (
        <div className="flex flex-col gap-2">
          {memberInfo?.recent_activities?.map((obj, index) => (
            <Row
              key={`Activity-row-${obj?.id || index}`}
              title={obj?.title}
              subTitle={obj?.date_time}
              value={obj?.points}
              color="text-[var(--textThree)]"
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-6 text-[var(--textTwo)] text-sm font-semibold italic opacity-80">
          {tScreen("leaderboard.labels.featureWillAvailableSoon")}
        </div>
      )}
    </div>
  );
}

export function MemberInfoModal({ show, onClose, memberInfo }) {
  return (
    <AppModal
      open={show}
      onClose={onClose}
      closeOnBackdropClick={false}
      contClass="w-96 sm:w-[600px] max-w-2xl"
    >
      <div>
        <div className="flex items-center gap-3">
          <div className="relative w-18 h-18 rounded-full overflow-hidden border-2 border-[var(--borderTwo)]">
            <Image
              src={memberInfo.avatar_url ?? "/images/defaultUserAvatar.png"}
              alt={memberInfo.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col ">
            <span className="text-xl font-bold text-[var(--textOne)] truncate">
              {memberInfo.name}
            </span>
            <div className="flex gap-4">
              <span className="text-md font-semibold lg:text-lg text-[var(--textTwo)]">
                Rank #{memberInfo.rank}
              </span>
              <span className="text-md font-semibold lg:text-lg text-[var(--textTwo)]">
                {memberInfo?.country}
              </span>
              <CardChip label={memberInfo?.achievement} />
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

function LeaderBoardTable({ paginatedSocial = [], onClickRow }) {
  const { t: tScreen } = useTranslation("screen");
  if (paginatedSocial?.length > 0)
    return (
      <GenericTable
        showNoDataMessage={false}
        data={paginatedSocial}
        onClickRow={onClickRow}
        columns={[
          {
            key: "rank",
            label: tScreen("leaderboard.labels.rank"),
            render: (row) => (
              <span className="font-bold text-[var(--textOne)]">
                #{row.rank}
              </span>
            ),
          },
          {
            key: "player",
            label: tScreen("leaderboard.labels.player"),
            render: (row) => (
              <div className="flex items-center gap-3  w-fit">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--borderTwo)]">
                  <Image
                    src={row.avatar_url ?? "/images/defaultUserAvatar.png"}
                    alt={row.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col w-[6rem]">
                  <span className="font-bold capitalize text-[var(--textOne)] truncate">
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
            label: tScreen("leaderboard.labels.achievement"),
            render: (row: any) =>
              row?.achievement ? (
                <CardChip label={row?.achievement} />
              ) : (
                "Coming Soon"
              ),
          },
          {
            key: "equipment",
            label: tScreen("leaderboard.labels.equipment"),
            className: "hidden sm:table-cell",
            render: (row: any) => row?.equipment ?? "Coming Soon",
          },
          {
            key: "main_game",
            label: tScreen("leaderboard.labels.mainGame"),
            className: "hidden sm:table-cell",
            render: (row: any) => row?.main_game ?? "Coming Soon",
          },
          {
            key: "last_earned_points",
            label: tScreen("leaderboard.labels.points"),
            render: (row) => (
              <div className="flex flex-col">
                <h2 className="sm:text-xl md:text-2xl lg:text-3xl font-bold text-[var(--textSeven)]">
                  {row?.total_points}
                </h2>
                <h2 className="text-md font-semibold truncate text-[var(--textSeven)]">
                  {row?.last_points_type === "earn" && "+"}
                  {row?.last_earned_points}
                </h2>
              </div>
            ),
          },
        ]}
      />
    );
}

export function Top3Leaderboard({ leaderboardData = [], onClick }) {
  const cards = leaderboardData.filter(Boolean);
  const count = cards.length;

  // podium order: [2, 1, 3] if 3 cards, [2, 1] if 2, [1] if 1
  const podiumOrder =
    count >= 3
      ? [cards[1], cards[0], cards[2]]
      : count === 2
      ? [cards[1], cards[0]]
      : [cards[0]];

  return (
    <div className="flex justify-center items-center gap-[3vw] mb-[8vw] sm:mb-[3vw]">
      {podiumOrder.map((card, index) => (
        <div
          key={index}
          className={`
            flex justify-center
            ${
              count === 1
                ? "max-w-[80%] sm:max-w-[50%] md:max-w-[45%] xl:max-w-[35%]"
                : ""
            }
            ${
              count === 2
                ? "max-w-[50%] sm:max-w-[45%] md:max-w-[35%] xl:max-w-[30%]"
                : ""
            }
            ${
              count === 3
                ? "max-w-[32%] sm:max-w-[30%] md:max-w-[28%] xl:max-w-[26%]"
                : ""
            }
            w-full
          `}
        >
          <TopLeaderboardCard
            leaderboardInfo={card}
            contClass="min-h-[25vw] w-full"
            onClick={() => onClick(card)}
          />
        </div>
      ))}
    </div>
  );
}

export default function LeaderboardPageFeed() {
  const { isAuthenticated } = useAuth();
  const { t: tCommon } = useTranslation("common");
  const { t: tScreen } = useTranslation("screen");

  const [leaderboard, setLeaderboard] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const isFetching = useRef(false);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [memberToShow, setMemberToShow] = useState(null);
  const [activeTab, setActiveTab] = useState("overall");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const leaderboardTabs = [
    {
      key: "overall",
      label: tScreen("leaderboard.labels.allTime"),
      desc: tScreen("leaderboard.labels.allTimeDesc"),
    },
    {
      key: "weekly",
      label: tScreen("leaderboard.labels.weekly"),
      desc: tScreen("leaderboard.labels.weeklyDesc"),
    },
    {
      key: "daily",
      label: tScreen("leaderboard.labels.daily"),
      desc: tScreen("leaderboard.labels.dailyDesc"),
    },
  ];

  const fetchLeaderboard = async () => {
    if (isFetching.current) return;
    isFetching.current = true;

    const params: Record<string, any> = {
      page: currentPage,
      per_page: pageSize,
    };

    if (activeTab) {
      params.type = activeTab;
      params.page = 1;
    }
    if (selectedCategory) {
      params.country = selectedCategory;
      params.page = 1;
    }

    setLoading(true);
    try {
      const res: any = await getLeaderboard(params);
      if (res?.success && res?.data) setLeaderboard(res?.data);
    } catch (err) {
      console.error("Error fetching games:", err);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [isAuthenticated, activeTab, selectedCategory, currentPage, pageSize]);

  // Update pageSize responsively
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setPageSize(window.innerWidth < 768 ? 4 : 8);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <>
      <Loading loading={loading} />
      <div className="mx-auto py-10 pb-10 w-full">
        <MemberInfoModal
          show={Boolean(memberToShow)}
          onClose={() => setMemberToShow(null)}
          memberInfo={{ ...memberToShow }}
        />
        <Top3Leaderboard
          leaderboardData={leaderboard?.data?.data}
          onClick={setMemberToShow}
        />
        {/* Filter + ShowingResults */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 flex-wrap">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto flex-wrap">
            <div className="flex-1 min-w-[170px] sm:max-w-[260px] sm:w-auto">
              <CountryPicker
                value={selectedCategory ?? ""}
                onChange={(country: any) => setSelectedCategory(country)}
                placeholder={tCommon("filters.category")}
                isAllCountry={true}
              />
            </div>

            {/* filter Tabs */}
            <div className="flex gap-3 sm:gap-4 overflow-x-auto sm:overflow-x-visible scrollbar-hide p-[5px]">
              {leaderboardTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`
              cursor-pointer flex-shrink-0 px-4 py-2 
              font-medium font-semibold rounded-xl 
              transition-colors transition-transform duration-300 ease-in-out hover:scale-105
              ${
                activeTab === tab.key
                  ? "bg-[var(--primary)] text-[var(--secondary)] shadow-md scale-105"
                  : "bg-[var(--borderThree)] text-[var(--textOne)]"
              }
            `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <ShowingResults
            currentPage={leaderboard?.data?.current_page || 1}
            pageSize={leaderboard?.data?.per_page || pageSize}
            totalItems={leaderboard?.data?.total ?? 0}
            className="ml-2"
            label={tScreen("leaderboard.labels.leaderboard")}
          />
        </div>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center mb-5 text-[var(--textTwo)] text-sm font-semibold italic opacity-80 text-center"
        >
          {leaderboardTabs.find((obj) => obj.key === activeTab)?.desc}
        </motion.div>

        <LeaderBoardTable
          paginatedSocial={leaderboard?.data?.data}
          onClickRow={setMemberToShow}
        />
        {/* Pagination */}

        <Pagination
          currentPage={leaderboard?.data?.current_page || currentPage}
          totalPages={leaderboard?.data?.last_page || 1}
          onPageChange={setCurrentPage}
        />

        <AchievementFeed contClass="h-full mt-8" />
      </div>
    </>
  );
}
