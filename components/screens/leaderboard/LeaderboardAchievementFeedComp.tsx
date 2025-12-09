"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { RankSecondaryIcon, CrownIcon } from "@/app/icons";
import { ScreenDetailsComp } from "@/components/TopComp";
import AchievementFeed from "@components/screens/leaderboard/AchievementFeed";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { FullCenterDimensionDiv } from "@/components/FullCenterDimensionDiv";

import { getLeaderboard } from "@/lib/leaderboard_ops";
import { MemberInfoModal } from "./LeaderboardPageFeed";

export function LeaderboardCard({ leaderboardInfo, onClick = null }) {
  if (!leaderboardInfo) return null;

  return (
    <div
      onClick={onClick}
      className={`gradient-one w-full  h-fit border p-4 flex-shrink-0 overflow-hidden rounded-xl flex items-center  gap-3 border-[var(--borderThree)] transition-transform duration-300`}
    >
      <h2 className="text-lg lg:text-xl font-bold truncate text-[var(--textOne)]">
        #{leaderboardInfo?.rank}
      </h2>

      {leaderboardInfo?.avatar_url && (
        <div className="relative w-8 h-8 md:w-10 md:h-10 lg:w-15 lg:h-15 rounded-full overflow-hidden border-2 border-[var(--borderTwo)]">
          <Image
            src={leaderboardInfo?.avatar_url}
            alt="avatar"
            fill
            className="object-cover transition-transform duration-500 ease-in-out hover:scale-110"
          />
        </div>
      )}

      <div className="flex gap-3 flex-1 items-center">
        <div className="flex flex-col ">
          <h2 className="sm:text-lg capitalize md:text-xl lg:text-2xl font-bold truncate text-[var(--textOne)]">
            {leaderboardInfo?.name}
          </h2>
          <h2 className="text-md font-semibold truncate text-[var(--textTwo)]">
            {leaderboardInfo?.country}
          </h2>
        </div>

        {leaderboardInfo?.rank === 1 ? (
          <CrownIcon size={30} color="transparent" />
        ) : leaderboardInfo?.rank === 2 || leaderboardInfo?.rank === 3 ? (
          <RankSecondaryIcon
            size={30}
            color="transparent"
            stroke="var(--textOne)"
          />
        ) : null}
      </div>
      <div className="flex flex-col">
        <h2 className="sm:text-xl md:text-2xl lg:text-3xl font-bold text-[var(--textSeven)]">
          {leaderboardInfo?.total_points}
        </h2>
        <h2 className="text-md font-semibold truncate text-[var(--textSeven)]">
          {leaderboardInfo?.last_points_type === "earn" && "+"}
          {leaderboardInfo?.last_earned_points}
        </h2>
      </div>
    </div>
  );
}
export function TopLeaderboardCard({
  leaderboardInfo,
  contClass = "w-[95%] lg:max-w-[90%]  h-fit min-h-[22vw]",
  onClick = null,
}) {
  const { t: tScreen } = useTranslation("screen");
  if (!leaderboardInfo) return null;
  const isRankOne = leaderboardInfo?.rank === 1;

  return (
    <FullCenterDimensionDiv style={{ height: "100%", width: "100%" }}>
      {({ width, height }: any) => {
        const contSize = Math.min(width, height);
        const iconSize = Math.max(contSize * 0.08, 30);

        return (
          <div
            onClick={onClick}
            className={`${
              isRankOne ? "gradient-three scale-[1.10]" : "gradient-one"
            } 
      ${onClick ? "cursor-pointer" : ""}
       border px-2 py-4 sm:px-4 flex-shrink-0 overflow-hidden rounded-xl flex flex-col justify-center items-center gap-3 border-[var(--borderThree)] transition-transform duration-300 ${contClass}`}
          >
            {/* Rank Icon */}
            {isRankOne ? (
              <CrownIcon size={iconSize} color="transparent" />
            ) : (
              <RankSecondaryIcon
                size={iconSize}
                color="transparent"
                stroke="var(--textOne)"
              />
            )}

            {/* Avatar Image */}

            <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:h-30 xl:w-30  2xl:h-40 2xl:w-40 rounded-full overflow-hidden border-2 border-[var(--borderTwo)]">
              <Image
                src={
                  leaderboardInfo?.avatar_url ?? "/images/defaultUserAvatar.png"
                }
                alt="avatar"
                fill
                className="object-cover transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </div>

            {/* Player Info */}
            <h2 className="line-clamp-2 text-center text-sm sm:text-lg capitalize md:text-xl xl:text-3xl 2xl:text-4xl font-bold text-[var(--textOne)] max-w-full">
              {leaderboardInfo?.name}
            </h2>

            <h2 className="sm:text-xl md:text-2xl  xl:text-4xl  2xl:text-5xl font-bold text-[var(--textSeven)]">
              {leaderboardInfo?.total_points}
            </h2>

            <h2 className="text-sm md:text-md lg:text-lg xl:text-xl  2xl:text-2xl font-semibold truncate text-[var(--textTwo)]">
              {leaderboardInfo?.country}
            </h2>

            <h2 className="text-sm text-lg lg:text-xl xl:text-2xl  2xl:text-3xl font-bold truncate text-[var(--textTwo)]">
              {tScreen("leaderboard.labels.points")}
            </h2>

            <h2 className="text-md lg:text-lg xl:text-xl  2xl:text-2xl font-semibold truncate text-[var(--textSeven)]">
              {leaderboardInfo?.last_points_type === "earn" && "+"}
              {leaderboardInfo?.last_earned_points}
            </h2>
          </div>
        );
      }}
    </FullCenterDimensionDiv>
  );
}

function LeaderboardFeed() {
  const { isAuthenticated, setLoading } = useAuth();

  const [memberToShow, setMemberToShow] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const isFetching = useRef(false);

  const fetchLeaderboard = async (params) => {
    if (isFetching.current) return;
    isFetching.current = true;

    setLoading(true);
    try {
      const res: any = await getLeaderboard(params);
      if (res?.success && res?.data) setLeaderboard(res.data);
    } catch (err) {
      console.error("Error fetching games:", err);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  useEffect(() => {
    fetchLeaderboard({ type: "overall" });
  }, [isAuthenticated]);

  return (
    <div>
      <MemberInfoModal
        show={Boolean(memberToShow)}
        onClose={() => setMemberToShow(null)}
        memberInfo={{ ...memberToShow }}
      />
      <div className="grid grid-cols-3  gap-3 sm:gap-4 justify-center items-center">
        {/* Always render three columns: 2nd, 1st, 3rd */}
        <TopLeaderboardCard
          leaderboardInfo={leaderboard?.data?.data?.[1]}
          onClick={() => setMemberToShow(leaderboard?.data?.data?.[1])}
        />
        <TopLeaderboardCard
          leaderboardInfo={leaderboard?.data?.data?.[0]}
          onClick={() => setMemberToShow(leaderboard?.data?.data?.[0])}
        />
        <TopLeaderboardCard
          leaderboardInfo={leaderboard?.data?.data?.[2]}
          onClick={() => setMemberToShow(leaderboard?.data?.data?.[2])}
        />
      </div>
      <div className="flex flex-col gap-4 mt-10">
        {leaderboard?.data?.data?.map((obj) => {
          return (
            <LeaderboardCard
              key={obj?.user_id}
              leaderboardInfo={obj}
              onClick={() => setMemberToShow(obj)}
            />
          );
        })}
        {/* {isAuthenticated && user ? (
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
        )} */}
      </div>
    </div>
  );
}

export default function LeaderboardAchievementFeed() {
  const { t: tCommon } = useTranslation("common");

  return (
    <div className="relative px-1 py-5 pb-20 w-full max-w-[2000px] mx-auto">
      {/* Stack on small screens, side-by-side on md and larger */}
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Leaderboard Section */}
        <div className="flex-1 md:basis-[70%]">
          <LeaderboardFeed />
        </div>

        {/* Achievement Section */}
        <div className="flex-1 w-full lg:w-fit flex justify-center">
          <AchievementFeed />
        </div>
      </div>

      {/* View All Button */}
      <div className="flex justify-center items-center mb-5 mt-4 w-full">
        <Link
          href="/leaderboard"
          className="px-5 py-2 border rounded-[50px] border-[var(--primary)] text-[var(--primary)] hover:text-[var(--textOne)] hover:border-[var(--textOne)] text-sm md:text-base transition-colors duration-300 cursor-pointer"
        >
          {tCommon("common_labels.view_all")}
        </Link>
      </div>
    </div>
  );
}

export function LeaderboardAchievementFeedComp() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <div>
      <div className="relative w-full rounded-lg  p-6 sm:p-8 lg:p-12 flex flex-col items-center gap-4">
        <ScreenDetailsComp
          content={{
            chip: [
              {
                label: tScreen("leaderboard.chip"),
                icon: "trophy",
                type: "primary",
              },
            ],
            title: tScreen("leaderboard.title"),
            highlightTitle: tScreen("leaderboard.highlightTitle"),
            description: tScreen("leaderboard.description"),
          }}
          isCentered={true}
        />
      </div>
      <LeaderboardAchievementFeed />
    </div>
  );
}
