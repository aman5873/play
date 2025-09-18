"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { CoinIcon } from "@/app/icons";

import { challengesData } from "@/constants/data";
import Image from "next/image";
import ScrollableRowWrapper from "@/components/common/ScrollableRowWrapper";
import {
  SectionDetails,
  ProgressBar,
  CardChip,
} from "@/components/common/CardComp";
import { ScreenDetailsComp } from "@/components/TopComp";

const challengeSection = {
  chip: [
    {
      label: "Daily Missions",
      icon: "mission",
      type: "secondary",
    },
  ],
  title: "Complete",
  highlightTitle: "EPIC CHALLENGES",
  description:
    "Take on exciting missions, earn exclusive rewards, and prove your gaming mastery across multiple challenges.",
};

export function ChallengeCard(props) {
  const { challengeInfo, contClass = "", isFeatured = false } = props;
  const router = useRouter();

  const isClaimed = challengeInfo?.status === "Claimed";
  const statusColor =
    challengeInfo?.status === "Active"
      ? "var(--textFour)"
      : isClaimed
      ? "var(--primary)"
      : "var(--textTwo)";

  if (challengeInfo)
    return (
      <div
        className={`gradient-one  w-69 min-w-[12rem] max-w-xs border p-4 flex-shrink-0 overflow-hidden rounded-xl flex flex-col ${contClass} ${
          isClaimed ? "border-[var(--primary)]" : "border-[var(--borderThree)]"
        }`}
      >
        {challengeInfo?.image_path && (
          <div
            className={`relative overflow-hidden rounded-lg group w-full h-[170px] sm:h-[150px] lg:h-[197px]`}
          >
            <Image
              src={challengeInfo?.image_path}
              alt={challengeInfo?.title}
              fill
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>
        )}

        <div
          className={`flex flex-col gap-2 mt-3 "w-full ${
            isClaimed ? "text-[var(--primary)]" : "text-[var(--textOne)]"
          }`}
        >
          <h1 className="sm:text-md  lg:text-lg font-bold truncate my-1">
            {challengeInfo?.title}
          </h1>
          <p className="text-[14px] mt-2 text-[var(--textTwo)]">
            {challengeInfo?.description}
          </p>
          <ProgressBar
            label="Progress"
            count={challengeInfo?.completed_count}
            maxCount={challengeInfo?.total_count}
          />
          <div className="flex justify-between my-2">
            {challengeInfo?.points && (
              <CardChip
                label={
                  <div className="flex items-center gap-1">
                    +{challengeInfo.points}
                    <CoinIcon size={20} />
                  </div>
                }
              />
            )}

            {challengeInfo?.status && (
              <div
                className="flex items-center gap-2 text-[var(--textTwo)]"
                style={{ color: statusColor }}
              >
                <span>{challengeInfo.status}</span>
              </div>
            )}
          </div>

          <button
            onClick={() => router.push(`/challenges/${challengeInfo?.id}`)}
            className="px-4 py-2 flex items-center justify-center rounded-full border border-[var(--primary)] cursor-pointer text-sm sm:text-base font-rajdhani font-bold transition-all hover:scale-[1.02] hover:opacity-95 duration-300 shadow-md bg-[var(--primary)] text-[var(--secondary)]"
          >
            View Challenge
          </button>
        </div>
      </div>
    );
}

export default function EpicChallengeFeed() {
  const [challengeList, setChallengeList] = useState([]);

  useEffect(() => {
    setChallengeList(challengesData?.challenges);
  }, []);

  return (
    <div className="relative px-1 py-5 pb-20">
      {/* Scroll container */}

      <ScrollableRowWrapper isReady={Boolean(challengeList)}>
        {challengeList?.map((obj, index) => {
          return (
            <ChallengeCard
              key={`challenge-${obj?.id}-${index}`}
              challengeInfo={obj}
            />
          );
        })}
      </ScrollableRowWrapper>

      <div className="flex justify-center items-center mb-5 mt-4 w-full">
        <Link
          href="/challenges"
          className=" px-5 py-2 border rounded-[50px] border-[var(--primary)] text-[var(--primary)] hover:text-[var(--textOne)] hover:border-[var(--textOne)]   text-sm md:text-base transition-colors duration-300 cursor-pointer text-sm md:text-base transition-colors duration-300"
        >
          View All
        </Link>
      </div>
      <div className="flex w-full justify-center">
        <SectionDetails
          list={[
            {
              label: challengesData?.completed_today,
              description: "Completed Today",
              color: "var(--primary)",
            },
            {
              label: challengesData?.in_progress,
              description: "In Progress",
              color: "var(--textFour)",
            },
            {
              label: challengesData?.total_earned,
              description: "Total Earned",
              color: "var(--textFive)",
            },
          ]}
        />
      </div>
    </div>
  );
}

export function EpicChallengeFeedComp() {
  return (
    <div>
      <div className="relative w-full rounded-lg  p-6 sm:p-8 lg:p-12 flex flex-col items-center gap-4">
        <ScreenDetailsComp content={challengeSection} isCentered={true} />
      </div>
      <EpicChallengeFeed />
    </div>
  );
}
