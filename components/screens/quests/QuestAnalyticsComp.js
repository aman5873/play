"use client";
import React from "react";

import { questAnalytics } from "@/constants/data";
import { iconMap, ProgressBar } from "@/components/common/CardComp";

function StatusComp({ obj }) {
  const iconBg = {
    mission: "#00C950",
    trend: "linear-gradient(135deg,#2B7FFF 0%,#00B8DB 100%)",
    calender: "linear-gradient(135deg,#AD46FF 0%,#F6339A 100%)",
    flame: "linear-gradient(135deg,#FF6900 0%,#FB2C36 100%)",
  };

  const CalIcon = iconMap.clock;
  return (
    <div>
      {obj?.completed_count && obj?.total_count && (
        <ProgressBar
          count={obj?.completed_count}
          maxCount={obj?.total_count}
          showCount={false}
          fillStyle={{ background: iconBg?.[obj?.icon] }}
          contStyle={{ background: "#31415880" }}
        />
      )}
      {obj?.time_left && (
        <div className="flex gap-2 text-[#C27AFF]">
          <CalIcon className={`w-5 h-5`} />
          <span>{obj?.time_left}</span>
        </div>
      )}
    </div>
  );
}

export default function QuestAnalyticsComp() {
  const iconBg = {
    mission: "bg-[#00C950] text-[var(--secondary)]",
    trend:
      "bg-[linear-gradient(135deg,#2B7FFF_0%,#00B8DB_100%)] text-[var(--textOne)]",
    calender:
      "bg-[linear-gradient(135deg,#AD46FF_0%,#F6339A_100%)] text-[var(--textOne)]",
    flame:
      "bg-[linear-gradient(135deg,#FF6900_0%,#FB2C36_100%)] text-[var(--textOne)]",
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 w-full gap-4 mt-4 justify-center">
      {questAnalytics?.map((obj) => {
        const count = obj?.completed_count ? (
          <p className="text-[var(--primary)] flex gap-1">
            <span className="text-[var(--textOne)]">
              {obj?.completed_count}
            </span>
            <span>/</span>
            <span>{obj?.total_count}</span>
          </p>
        ) : (
          obj?.remaining_count ?? ``
        );

        const Icon = iconMap[obj?.icon];
        return (
          <div
            key={obj?.id}
            className={`gradient-one border p-4   overflow-hidden rounded-xl flex flex-col gap-1  border-[var(--borderThree)] md:flex-1`}
          >
            <div className="flex justify-between mb-2">
              {Icon && (
                <div
                  className={`${
                    iconBg[obj?.icon]
                  } p-2 sm:p-3 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex justify-center items-center`}
                >
                  <Icon />
                </div>
              )}
              <h1 className="text-lg md:text-xl  font-semibold ">{count}</h1>
            </div>
            <h1 className="sm:text-md lg:text-lg  text-[var(--textOne)] font-medium">
              {obj?.title}
            </h1>
            <StatusComp obj={obj} />
            <p className="text-[14px]  text-[var(--textTwo)]">
              {obj?.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
