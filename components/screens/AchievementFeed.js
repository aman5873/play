"use client";
import React, { useEffect, useState } from "react";

import { leaderboardData } from "@/constants/gameData";

import { Trophy, TrendingUp, Crown, Star } from "lucide-react";
import { CardChip, ProgressBar } from "@/components/common/CardComp";

const categoryIconMap = {
  Common: { icon: Trophy, color: "var(--textCommon)" },
  Rare: { icon: TrendingUp, color: "var(--textRare)" },
  Epic: { icon: Crown, color: "var(--textOne)" },
  Legendry: { icon: Star, color: "var(--textLegendary)" },
};

export function AchievementCard({ achievementInfo, contClass = "" }) {
  const category = categoryIconMap[achievementInfo?.category];
  const Icon = category?.icon;

  if (!achievementInfo) return null;

  return (
    <div
      className={`gradient-one w-full max-w-full border p-4 flex-shrink-0 mx-2 overflow-hidden rounded-[16px] flex flex-col ${contClass} border-[var(--borderThree)]`}
    >
      <div className="flex gap-2">
        {Icon && (
          <div className="rounded-[50px] w-fit h-fit bg-[var(--bgThree)] p-3 flex items-center justify-center">
            <Icon
              className="w-6 h-6"
              style={{ color: category.color || "var(--textOne)" }}
            />
          </div>
        )}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 justify-between w-full">
            <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold text-[var(--textOne)]">
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
          <p className="text-sm text-[var(--textTwo)]">
            {achievementInfo?.description}
          </p>
          <ProgressBar
            label="Progress"
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

export default function AchievementFeed() {
  const [achievementList, setAchievementList] = useState([]);

  useEffect(() => {
    setAchievementList(leaderboardData?.achievements);
  }, []);

  return (
    <div className="gradient-one p-5 w-full max-w-[400px] rounded-[16px] border border-[var(--borderThree)]">
      <div className="flex gap-2 items-center mb-5">
        <Star />
        <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[var(--textOne)]">
          Achievements
        </h1>
      </div>

      <div className="flex flex-col gap-3">
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
