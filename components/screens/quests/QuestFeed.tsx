"use client";
import { InstagramIcon, MediaIcon, SocialIcon, XIcon } from "@/app/icons";
import { iconMap, ProgressBar } from "@/components/common/CardComp";
import { questData } from "@/constants/data";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Star } from "lucide-react";
import { AppButton } from "@/components/TopComp";

function QuestTabFeedList({ list }) {
  const { t: tScreen } = useTranslation("screen");

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 w-full gap-4 mt-4 justify-center">
        {list?.map((obj: any) => {
          const Icon = iconMap[obj?.icon];
          const isComplete = obj?.completed_count === obj?.total_count;
          return (
            <div
              key={obj?.id}
              className="rounded-xl gradient-one border border-[var(--borderThree)] p-4 flex flex-col gap-2"
            >
              <div className="flex gap-2">
                <div className="bg-[var(--borderThree)] p-2 w-10 h-10  rounded-xl  items-center">
                  {Icon ? (
                    <Icon />
                  ) : obj?.icon === "xIcon" ? (
                    <XIcon size={24} />
                  ) : obj?.icon === "instagram" ? (
                    <InstagramIcon color="white" size={24} />
                  ) : obj?.icon === "social" ? (
                    <SocialIcon color="white" size={24} />
                  ) : obj?.icon === "media" ? (
                    <MediaIcon color="white" size={24} />
                  ) : null}
                </div>

                <div>
                  <h1 className="text-md truncate font-bold">{obj?.title}</h1>
                  <p className="text-[14px] text-[var(--textTwo)]">
                    {obj?.description}
                  </p>
                </div>
              </div>
              <ProgressBar
                label={tScreen("quests.labels.progress")}
                count={obj?.completed_count}
                maxCount={obj?.total_count}
              />
              <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                  <Star size={19} color="var(--textYellow)" />
                  <span className="text-[var(--textOne)] text-md font-medium">
                    {obj?.points}
                  </span>
                  <span className="text-sm text-[var(--textTwo)]">XP</span>
                </div>
                {obj?.is_verify ? (
                  <AppButton
                    onClick={() => {}}
                    type={"secondary"}
                    label={tScreen("quests.labels.verify")}
                  />
                ) : (
                  <>
                    {isComplete ? (
                      <AppButton
                        onClick={() => {}}
                        type={"secondaryTwo"}
                        style={{
                          background: "var(--borderOne)",
                          color: "var(--primary)",
                          border: "none",
                        }}
                        label={tScreen("quests.labels.completed")}
                      />
                    ) : (
                      <AppButton
                        onClick={() => {}}
                        type={"primary"}
                        label={tScreen("quests.labels.start")}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function QuestTabFeed({ questData }) {
  const { t: tScreen } = useTranslation("screen");
  const [activeTab, setActiveTab] = useState("allQuest");

  const socialData = questData?.filter(
    (obj: any) => obj?.category.label === "Social Media"
  );
  const dailyChallengeData = questData?.filter(
    (obj: any) => obj?.category.label === "Daily Challenge"
  );
  const engagementData = questData?.filter(
    (obj: any) => obj?.category.label === "Engagement"
  );
  const communityData = questData?.filter(
    (obj: any) => obj?.category.label === "Community"
  );
  const gameplayData = questData?.filter(
    (obj: any) => obj?.category.label === "Gameplay"
  );

  const questTabs = [
    {
      key: "allQuest",
      label: tScreen("quests.labels.allQuest"),
      component: <QuestTabFeedList list={questData || []} />,
    },
    {
      icon: "globe",
      key: "socialMedia",
      label: tScreen("quests.labels.socialMedia"),
      component: <QuestTabFeedList list={socialData || []} />,
    },
    {
      key: "engagement",
      icon: "heart",
      label: tScreen("quests.labels.engagement"),
      component: <QuestTabFeedList list={engagementData || []} />,
    },
    {
      icon: "calender",
      key: "dailyChallenge",
      label: tScreen("quests.labels.dailyChallenge"),
      component: <QuestTabFeedList list={dailyChallengeData || []} />,
    },
    {
      icon: "users",
      key: "community",
      label: tScreen("quests.labels.community"),
      component: <QuestTabFeedList list={communityData || []} />,
    },
    {
      icon: "game",
      key: "gameplay",
      label: tScreen("quests.labels.gameplay"),
      component: <QuestTabFeedList list={gameplayData || []} />,
    },
  ];

  return (
    <div className="flex flex-col gap-4 mt-5">
      {/* Tabs Header */}
      <div
        className="
          flex gap-3 sm:gap-4 
          overflow-x-auto 
          scrollbar-hide
          p-[5px]
          // pb-2 sm:pb-0
          
        "
      >
        {questTabs.map((tab) => {
          const Icon = iconMap?.[tab?.icon];
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
              cursor-pointer flex gap-1 flex-shrink-0 px-4 py-2 
              font-medium font-semibold rounded-3xl 
              transition-colors transition-transform duration-300 ease-in-out
              hover:scale-105
              ${
                activeTab === tab.key
                  ? "bg-[var(--primary)] text-[var(--secondary)] shadow-md scale-105"
                  : "bg-[var(--borderThree)] text-[var(--textOne)] "
              }
            `}
            >
              {Icon && (
                <span>
                  <Icon />
                </span>
              )}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Active Tab Content  */}
      <div className="w-full">
        {questTabs.find((tab) => tab.key === activeTab)?.component}
      </div>
    </div>
  );
}

export default function QuestFeed() {
  return (
    <div className="w-full">
      <QuestTabFeed questData={questData} />
    </div>
  );
}
