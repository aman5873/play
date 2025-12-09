"use client";
import React from "react";
import { Trophy, TrendingUp, Crown, Star } from "lucide-react";
import { CardChip, ProgressBar } from "@/components/common/CardComp";
import { useTranslation } from "react-i18next";

const categoryIconMap = {
  Common: { icon: Trophy, color: "var(--textCommon)" },
  Rare: { icon: TrendingUp, color: "var(--textRare)" },
  Epic: { icon: Crown, color: "var(--textOne)" },
  Legendry: { icon: Star, color: "var(--textLegendary)" },
};

export function AchievementCard({ achievementInfo }) {
  const { t: tScreen } = useTranslation("screen");
  const category = categoryIconMap[achievementInfo?.category];
  const Icon = category?.icon;

  if (!achievementInfo) return null;

  return (
    <div
      className={`gradient-one border p-4 overflow-hidden rounded-[16px] flex flex-col border-[var(--borderThree)]`}
    >
      <div className="flex flex-col gap-3 w-full">
        {Icon && (
          <div className="rounded-full w-fit h-fit bg-[var(--bgThree)] p-3 flex items-center justify-center">
            <Icon
              className="w-6 h-6"
              style={{ color: category.color || "var(--textOne)" }}
            />
          </div>
        )}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 justify-between w-full">
            <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold text-[var(--textOne)] truncate">
              {achievementInfo?.title}
            </h2>
            <CardChip
              label={achievementInfo?.category}
              style={{
                color: category.color || "var(--textOne)",
                fontWeight: "bold",
                padding: "0 10px",
              }}
            />
          </div>
          <p className="text-sm text-[var(--textTwo)] truncate">
            {achievementInfo?.description}
          </p>
          <ProgressBar
            label={tScreen("leaderboard.labels.progress")}
            count={achievementInfo?.progress}
            maxCount={achievementInfo?.total_progress}
            showPercent={true}
            fillStyle={{ background: category?.color }}
          />
        </div>
      </div>
    </div>
  );
}

export default function AchievementFeed({
  contClass = "lg:h-fit lg:max-w-[500px]",
}) {
  const { t: tScreen } = useTranslation("screen");
  const achievementList = [
    {
      id: 1,
      title: tScreen("leaderboard.labels.firstVictory"),
      description: tScreen("leaderboard.labels.firstVictoryDesc"),
      category: "Common",
      progress: 0,
      total_progress: 100,
    },
    {
      id: 2,
      title: tScreen("leaderboard.labels.winningStreak"),
      description: tScreen("leaderboard.labels.winningStreakDesc"),
      category: "Rare",
      progress: 0,
      total_progress: 100,
    },
    {
      id: 3,
      title: tScreen("leaderboard.labels.champion"),
      description: tScreen("leaderboard.labels.championDesc"),
      category: "Epic",
      progress: 0,
      total_progress: 100,
    },
    {
      id: 4,
      title: tScreen("leaderboard.labels.legend"),
      description: tScreen("leaderboard.labels.legendDesc"),
      category: "Legendry",
      progress: 0,
      total_progress: 100,
    },
  ];

  return (
    <div
      className={`gradient-one p-3 w-full rounded-[16px] border border-[var(--borderThree)] ${contClass}`}
    >
      <div className="flex gap-2 items-center mb-5">
        <Star />
        <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[var(--textOne)]">
          {tScreen("leaderboard.labels.achievements")}
        </h1>
      </div>

      <div
        className="
          grid gap-4 justify-center
          grid-cols-[repeat(auto-fit,minmax(277px,1fr))]
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
