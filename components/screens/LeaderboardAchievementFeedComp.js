"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { RankSecondaryIcon, CrownIcon } from "@/app/icons";
import { leaderboardData } from "@/constants/gameData";
import { ScreenDetailsComp } from "@/components/TopComp";
import AchievementFeed from "./AchievementFeed";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const leaderboardSection = {
  chip: [
    {
      label: "Global Ranking",
      icon: "trophy",
      type: "primary",
    },
  ],
  title: "Elite",
  highlightTitle: "Leaderboard",
  description:
    "Witness the rise of gaming legends. Compete against the best players worldwide and claim your spot among the elite.",
};

function LeaderboardCard({ leaderboardInfo }) {
  if (!leaderboardInfo) return null;

  return (
    <div
      className={`gradient-one w-full h-fit border p-4 flex-shrink-0 overflow-hidden rounded-xl flex items-center  gap-3 border-[var(--borderThree)] transition-transform duration-300`}
    >
      <h2 className="text-lg lg:text-xl font-bold truncate text-[var(--textOne)]">
        #{leaderboardInfo?.rank}
      </h2>

      <div className="relative w-8 h-8 md:w-10 md:h-10 lg:w-15 lg:h-15 rounded-full overflow-hidden border-2 border-[var(--borderTwo)]">
        <Image
          src={leaderboardInfo?.avatar_url}
          alt="avatar"
          fill
          className="object-cover transition-transform duration-500 ease-in-out hover:scale-110"
        />
      </div>

      <div className="flex flex-col flex-1">
        <h2 className="sm:text-lg md:text-xl lg:text-2xl font-bold truncate text-[var(--textOne)]">
          {leaderboardInfo?.name}
        </h2>
        <h2 className="text-md font-semibold truncate text-[var(--textTwo)]">
          {leaderboardInfo?.country}
        </h2>
      </div>
      <div className="flex flex-col">
        <h2 className="sm:text-xl md:text-2xl lg:text-3xl font-bold text-[var(--textSeven)]">
          {leaderboardInfo?.score}
        </h2>
        <h2 className="text-md font-semibold truncate text-[var(--textSeven)]">
          {leaderboardInfo?.points}
        </h2>
      </div>
    </div>
  );
}
function TopLeaderboardCard({ leaderboardInfo }) {
  if (!leaderboardInfo) return null;
  const isRankOne = leaderboardInfo?.rank === 1;

  return (
    <div
      className={`${
        isRankOne ? "gradient-three scale-[1.10]" : "gradient-one"
      } w-[95%] h-fit border p-4 flex-shrink-0 overflow-hidden rounded-xl flex flex-col justify-center items-center gap-3 border-[var(--borderThree)] transition-transform duration-300`}
    >
      {/* Rank Icon */}
      {isRankOne ? (
        <CrownIcon size={30} color="transparent" />
      ) : (
        <RankSecondaryIcon size={30} color="transparent" />
      )}

      {/* Avatar Image */}
      <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-[var(--borderTwo)]">
        <Image
          src={leaderboardInfo?.avatar_url}
          alt="avatar"
          fill
          className="object-cover transition-transform duration-500 ease-in-out hover:scale-110"
        />
      </div>

      {/* Player Info */}
      <h2 className="sm:text-lg md:text-xl lg:text-2xl font-bold truncate text-[var(--textOne)]">
        {leaderboardInfo?.name}
      </h2>

      <h2 className="sm:text-xl md:text-2xl lg:text-3xl font-bold text-[var(--textSeven)]">
        {leaderboardInfo?.score}
      </h2>

      <h2 className="text-md font-semibold truncate text-[var(--textTwo)]">
        {leaderboardInfo?.country}
      </h2>

      <h2 className="text-lg lg:text-xl font-bold truncate text-[var(--textTwo)]">
        Points
      </h2>

      <h2 className="text-md font-semibold truncate text-[var(--textSeven)]">
        {leaderboardInfo?.points}
      </h2>
    </div>
  );
}

function LeaderboardFeed() {
  const [leaderboardList, setLeaderboardList] = useState({
    topThree: [],
    rest: [],
  });
  const { user, isAuthenticated, setLoginOpen } = useAuth();
  const { t: tAuth } = useTranslation("auth");

  useEffect(() => {
    if (leaderboardData?.leaderboard?.length > 3) {
      const topThree = leaderboardData.leaderboard.slice(0, 3);
      const rest = leaderboardData.leaderboard.slice(3);
      setLeaderboardList({ topThree, rest });
    } else {
      setLeaderboardList({
        topThree: leaderboardData?.leaderboard || [],
        rest: [],
      });
    }
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        {/* Always render three columns: 2nd, 1st, 3rd */}
        <TopLeaderboardCard leaderboardInfo={leaderboardList.topThree[1]} />
        <TopLeaderboardCard leaderboardInfo={leaderboardList.topThree[0]} />
        <TopLeaderboardCard leaderboardInfo={leaderboardList.topThree[2]} />
      </div>
      <div className="flex flex-col gap-4 mt-10">
        {leaderboardList?.rest?.map((obj) => {
          return <LeaderboardCard key={obj?.id} leaderboardInfo={obj} />;
        })}
        {isAuthenticated && user ? (
          <LeaderboardCard
            leaderboardInfo={{
              ...leaderboardData?.selfRanking,
              name: user?.name,
              avatar_url: user?.avatar_url,
            }}
          />
        ) : (
          <div
            className={`gradient-one w-full h-fit border p-4 py-6 flex-shrink-0 overflow-hidden rounded-xl flex items-center justify-between  gap-3 border-[var(--primary)] transition-transform duration-300`}
          >
            <span className="sm:text-lg md:text-xl lg:text-2xl font-bold truncate text-[var(--textOne)]">
              Login to see your ranking
            </span>
            <button
              onClick={() => setLoginOpen(true)}
              className="cursor-pointer px-6 py-1 rounded-[100px] bg-[var(--primary)] text-[var(--secondary)]  transition-colors font-rajdhani font-bold transition-all duration-200 ease-in-out hover:scale-105"
            >
              {tAuth("login")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LeaderboardAchievementFeed() {
  return (
    <div className="relative px-1 py-5 pb-20">
      {/* Stack on small screens, side-by-side on md and larger */}
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Leaderboard Section */}
        <div className="flex-1 md:basis-[70%]">
          <LeaderboardFeed />
        </div>

        {/* Achievement Section */}
        <div className="flex-1 md:basis-[30%] flex justify-center">
          <AchievementFeed />
        </div>
      </div>

      {/* View All Button */}
      <div className="flex justify-center items-center mb-5 mt-4 w-full">
        <Link
          href="/leaderboard"
          className="px-5 py-2 border rounded-[50px] border-[var(--primary)] text-[var(--primary)] hover:text-[var(--textOne)] hover:border-[var(--textOne)] text-sm md:text-base transition-colors duration-300 cursor-pointer"
        >
          View All
        </Link>
      </div>
    </div>
  );
}

export function LeaderboardAchievementFeedComp() {
  return (
    <div>
      <div className="relative w-full rounded-lg  p-6 sm:p-8 lg:p-12 flex flex-col items-center gap-4">
        <ScreenDetailsComp content={leaderboardSection} isCentered={true} />
      </div>
      <LeaderboardAchievementFeed />
    </div>
  );
}
