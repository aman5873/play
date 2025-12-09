"use client";
import React, { useEffect, useState } from "react";

import moment from "moment";
import { iconMap, ProgressBar } from "@/components/common/CardComp";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import { claimStreakQuest } from "@/lib/quest_ops";
import { handleApiMessage } from "@/lib/auth_ops";
import { useAlert } from "@/context/AlertContext";
import { useLanguage } from "@/context/LanguageContext";

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
      {!obj?.time_left && (
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
function useTimeLeft(startDateTime) {
  const [timeLeft, setTimeLeft] = useState("");
  const { t: tScreen } = useTranslation("screen");

  useEffect(() => {
    if (!startDateTime) {
      setTimeLeft("");
      return;
    }

    const updateTime = () => {
      const start = moment(startDateTime);
      const end = start.clone().add(24, "hours"); // next 24 hours from start
      const now = moment();
      const diff = moment.duration(end.diff(now));
      const textLeft = tScreen("quests.labels.left");

      if (diff.asMilliseconds() <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const hours = Math.floor(diff.asHours());
      const minutes = diff.minutes();

      setTimeLeft(`${hours}h ${minutes}m ${textLeft}`);
    };

    updateTime(); // initial calculation
    const interval = setInterval(updateTime, 60000); // update every minute

    return () => clearInterval(interval);
  }, [startDateTime, tScreen]);

  return timeLeft;
}

function QuestAnalyticCard({ obj, children }: any) {
  const Icon = iconMap[obj?.icon];
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
    <div
      className={`gradient-one border p-4   overflow-hidden rounded-xl flex flex-col gap-1  border-[var(--borderThree)] md:flex-1`}
    >
      <div className="flex justify-between mb-2">
        {Icon && (
          <div
            className={`${
              iconBg[obj?.icon]
            } p-2 sm:p-3 w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex justify-center items-center`}
          >
            <Icon />
          </div>
        )}
        <h1 className="text-lg md:text-xl  font-semibold ">
          {!obj?.time_left ? (
            <p className="text-[var(--primary)] flex gap-1">
              <span className="text-[var(--textOne)]">
                {obj?.completed_count}
              </span>
              <span>/</span>
              <span>{obj?.total_count}</span>
            </p>
          ) : (
            obj?.remaining_count ?? ``
          )}
        </h1>
      </div>
      <h1 className="sm:text-md lg:text-lg  text-[var(--textOne)] font-medium">
        {obj?.title}
      </h1>
      <StatusComp obj={obj} />
      <div className="flex justify-between items-center">
        <p className="text-[14px]  text-[var(--textTwo)]">{obj?.description}</p>
        {children}
      </div>
    </div>
  );
}
function QuestAnalyticCardSkeleton() {
  return (
    <div className="border p-4 rounded-xl flex flex-col gap-3 border-[var(--borderThree)] animate-pulse bg-[#1f1f1f]">
      {/* Top row */}
      <div className="flex justify-between items-center">
        <div className="w-10 h-10 rounded-xl bg-[var(--borderThree)]" />
        <div className="w-8 h-6 rounded bg-[var(--borderThree)]" />
      </div>

      {/* Title */}
      <div className="h-4 w-3/4 rounded bg-[var(--borderThree)]" />

      {/* StatusComp placeholder */}
      <div className="h-5 w-full rounded-lg bg-[var(--borderThree)]" />

      {/* Bottom row */}
      <div className="flex justify-between items-center mt-1">
        <div className="w-30 h-4 rounded bg-[var(--borderThree)]" />
      </div>
    </div>
  );
}

export default function QuestAnalyticsComp(props) {
  const { questSummary, fetchQuestSummary } = props;
  const { t: tScreen } = useTranslation("screen");
  const { isAuthenticated, handleProfile } = useAuth();
  const { lang } = useLanguage();
  const { showAlert } = useAlert();

  // 🛑 Prevent duplicate summary fetches
  const lastSummaryFetch = { current: false };
  const [loading, setLoading] = useState(false);

  async function handleClaimStreakBonus(id) {
    try {
      setLoading(true);
      const res = await claimStreakQuest(id);

      if (res?.message) {
        handleApiMessage(
          res?.message,
          showAlert,
          res?.success ? "success" : "error"
        );
      }
      if (res?.success) {
        handleProfile();
        fetchQuestSummary();
      }
    } catch (error) {
      console.error(error);
      handleApiMessage("Internal server error", showAlert, "error");
    } finally {
      setLoading(false);
    }
  }

  // ⛔ STOP DUPLICATE CALLS HERE
  useEffect(() => {
    // If summary already fetched once, do NOT fetch again
    if (lastSummaryFetch.current) return;

    lastSummaryFetch.current = true; // mark as fetched
    fetchQuestSummary();
  }, [isAuthenticated, lang]);

  const time_left = useTimeLeft(questSummary?.daily_challenge?.claimed_at);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 w-full gap-4 mt-4 justify-center">
      {loading || !questSummary ? (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <QuestAnalyticCardSkeleton key={i} />
          ))}
        </>
      ) : (
        <>
          <QuestAnalyticCard
            obj={{
              title: tScreen("quests.labels.totalProgress"),
              description: tScreen("quests.labels.questsCompleted"),
              completed_count: questSummary?.total_progress?.completed_quests,
              total_count: questSummary?.total_progress?.total_quests,
              icon: "mission",
            }}
          />

          <QuestAnalyticCard
            obj={{
              title: tScreen("quests.labels.activeQuests"),
              description: tScreen("quests.labels.inProgress"),
              completed_count: questSummary?.active_quests?.quests_in_progress,
              total_count: questSummary?.active_quests?.available_quests,
              icon: "trend",
            }}
          />

          <QuestAnalyticCard
            obj={{
              title: tScreen("quests.labels.dailyChallenges"),
              description: !questSummary?.daily_challenge
                ?.daily_challenge_claimed
                ? tScreen("quests.labels.timeLimited")
                : tScreen("quests.labels.questsCompleted"),
              completed_count: time_left ? 1 : 0,
              total_count: time_left ? 1 : 0,
              time_left: time_left,
              icon: "calender",
            }}
          />

          {Boolean(questSummary?.current_streak?.attempt_needed) && (
            <QuestAnalyticCard
              obj={{
                title: tScreen("quests.labels.currentStreak"),
                description: tScreen("quests.labels.daily"),
                completed_count: Math.min(
                  questSummary?.current_streak?.attempt_completed || 0,
                  questSummary?.current_streak?.attempt_needed || 0
                ),
                total_count: questSummary?.current_streak?.attempt_needed || 0,
                icon: "flame",
              }}
            >
              {questSummary?.current_streak?.ready_to_claim && (
                <h1
                  className="px-3 py-[1px] cursor-pointer text-sm sm:text-base rounded-xl font-rajdhani font-bold transition-all hover:scale-[1.02] hover:opacity-95 duration-300 shadow-md bg-[var(--primary)] text-[var(--secondary)]"
                  onClick={() => {
                    if (!loading) {
                      handleClaimStreakBonus(
                        questSummary?.current_streak?.quest_id
                      );
                    }
                  }}
                >
                  {tScreen("quests.labels.claim")}
                </h1>
              )}
            </QuestAnalyticCard>
          )}
        </>
      )}
    </div>
  );
}
