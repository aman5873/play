"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { AppButton, TopBgComp } from "@/components/TopComp";
import { useAuth } from "@/context/AuthContext";
import { teamsData, manageTeamData } from "@/constants/data";
import { useTranslation } from "react-i18next";
import { TeamScreenDetailsComp } from "@/components/screens/teams/TeamsScreenTopComp";
import { CardChip, iconMap } from "@/components/common/CardComp";
import Image from "next/image";

const initData = {
  is_private_team: false,
  description:
    "Join millions of players worldwide as you build your village, raise a clan, and compete in epic Clan Wars! Clash of Clans is an epic combat strategy game where you build your village, train your troops, and battle with millions of other players online!",
  max_team_member: 8,
  victory_count: 130,
  founded_in: "2025-11-30 00:00:00",
  tournaments_played: 12,
  trophies_count: 4,
  main_game: { name: "VR Basketball" },

  team_members: [
    {
      avatar_url: "/images/home/user1Avatar.png",
      name: "FuturePlay",
      role: "Captain",
      points: 8760,
    },
    {
      avatar_url: "/images/home/user2Avatar.png",
      name: "NeuroFusion",
      role: "Co-Captain",
      points: 10230,
    },
    {
      avatar_url: "/images/home/user1Avatar.png",
      name: "HoloDash",
      role: "Player",
      points: 12450,
    },
    {
      avatar_url: "/images/home/user2Avatar.png",
      name: "VirtuaSports",
      role: "Player",
      points: 11450,
    },
    {
      avatar_url: "/images/home/user1Avatar.png",
      name: "CyberArena",
      role: "Player",
      points: 11450,
    },
    {
      avatar_url: "/images/home/user1Avatar.png",
      name: "EchoGame",
      role: "Player",
      points: 10450,
    },
  ],
  primary_games: [],
  region: [],
  settings: {},
};

function ActivityFeed({ activityList }) {
  const iconBg = {
    trophy: "bg-yellow-500", // instead of #F5B528
    play: "bg-violet-500", // instead of #8B5CF6
    users: "bg-blue-500", // instead of #3B82F6
    news: "bg-gray-500", // instead of #6B7280
  };
  return (
    <div className="flex flex-col gap-4">
      {activityList.map((obj: any) => {
        const Icon = iconMap[obj?.icon];

        return (
          <div
            key={obj?.id}
            className={`gradient-one border p-4 overflow-hidden rounded-[16px] flex  justify-between gap-4 border-[var(--borderThree)]`}
          >
            {Icon && (
              <div
                className={`${iconBg[obj?.icon]} p-3 w-12 h-12 rounded-[100px]`}
              >
                <Icon size={25} />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-base sm:text-lg xl:text-xl font-bold text-[var(--textOne)]">
                {obj.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base xl:text-lg text-[var(--textTwo)]">
                {obj.description}
              </p>
              <div className="flex gap-4 mt-2">
                <p className="text-xs sm:text-sm md:text-base xl:text-md text-[var(--textTwo)]">
                  {obj.date_time}
                </p>
                {obj?.views_count && (
                  <p className="text-xs sm:text-sm md:text-base xl:text-md text-[var(--textTwo)]">
                    {obj?.views_count}
                  </p>
                )}
                {obj?.chip && (
                  <CardChip
                    label={obj?.chip?.label}
                    style={{
                      background: "var(--primary)",
                      color: "var(--secondary)",
                      fontWeight: 600,
                    }}
                  />
                )}
              </div>
            </div>
            <CardChip
              label={obj?.action}
              style={{ padding: "5px 16px", height: "fit-content" }}
            />
          </div>
        );
      })}
    </div>
  );
}
function Invites({ invitesList }) {
  const { t: tScreen } = useTranslation("screen");

  const status = {
    pending: "bg-yellow-500 text-[var(--secondary)]",
    resend:
      "bg-black-500 border-1 border-[var(--borderThree)] text-[var(--textOne)]",
    accepted: "bg-[#00C851] text-[var(--secondary)]",
    declined: "bg-red-400 text-[var(--textOne)]",
  };

  const Chip = ({ label, value }) => (
    <div
      className={`${status[value]} flex items-center h-fit w-fit px-3 py-1 cursor-pointer rounded-[100px] font-semibold`}
    >
      {label}
    </div>
  );

  return (
    <div>
      <div className="pt-3 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg sm:text-md md:text-xl lg:text-2xl font-semibold text-[var(--textOne)]">
            {tScreen("teams.manage.teamInvitations")}
          </h1>
          <p className="text-xs sm:text-sm md:text-base xl:text-lg text-[var(--textTwo)]">
            {tScreen("teams.manage.teamInvitationsDesc")}
          </p>
        </div>
        <AppButton
          onClick={() => {}}
          type={"primary"}
          icon="add"
          label={tScreen("teams.manage.sendInvite")}
        />
      </div>

      <div className="flex flex-col gap-4">
        {invitesList.map((obj: any) => {
          return (
            <div
              key={obj?.id}
              className={`gradient-one border p-4 overflow-hidden rounded-[16px] flex flex-col sm:flex-row  justify-between gap-4 border-[var(--borderThree)]`}
            >
              <div className="flex items-center gap-3">
                {obj.avatar_url && (
                  <div className="relative w-17 h-17 rounded-full overflow-hidden border-2 border-[var(--borderTwo)]">
                    <Image
                      src={obj.avatar_url}
                      alt={obj.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col w-[10rem] gap-1">
                  <span className="font-bold text-[var(--textOne)] truncate">
                    {obj.name}
                  </span>
                  <div className="flex gap-4">
                    <span className="text-sm text-[var(--textTwo)]">
                      {obj.userName}
                    </span>
                    <span className="text-sm text-[var(--textOne)]">
                      {obj.role}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-sm text-[var(--textThree)] font-semibold">
                      {obj.rating} rating
                    </span>
                    <span className="text-sm text-[var(--textTwo)]">
                      {obj.date_time}
                    </span>
                  </div>
                </div>
              </div>
              {obj?.status?.value === "pending" ? (
                <div className="flex gap-2 items-center">
                  <Chip value={obj?.status?.value} label={obj?.status?.label} />
                  <Chip
                    value={"resend"}
                    label={tScreen("teams.manage.resend")}
                  />
                </div>
              ) : (
                <Chip value={obj?.status?.value} label={obj?.status?.label} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
function Notes({ notesList }) {
  const { t: tScreen } = useTranslation("screen");
  return (
    <>
      <div className="pt-3 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg sm:text-md md:text-xl lg:text-2xl font-semibold text-[var(--textOne)]">
            {tScreen("teams.manage.teamNotes")}
          </h1>
          <p className="text-xs sm:text-sm md:text-base xl:text-lg text-[var(--textTwo)]">
            {tScreen("teams.manage.teamNotesDesc")}
          </p>
        </div>
        <AppButton
          onClick={() => {}}
          type={"primary"}
          icon="add"
          label={tScreen("teams.manage.addNote")}
        />
      </div>

      <div className="flex flex-col gap-4">
        {notesList.map((obj: any) => {
          return (
            <div
              key={obj?.id}
              className={`gradient-one border p-4 overflow-hidden rounded-[16px] flex flex-col sm:flex-row  justify-between gap-4 border-[var(--borderThree)]`}
            >
              <div className="flex flex-col  gap-2">
                <h3 className="text-base sm:text-lg xl:text-xl font-bold text-[var(--textOne)]">
                  {obj?.title}
                </h3>
                <div className="flex gap-4 items-center">
                  <span className="text-md font-medium text-[var(--textTwo)]">
                    by :{" "}
                    <span className="text-[var(--textOne)]">
                      {obj.created_by}
                    </span>
                  </span>
                  <span className="text-md text-[var(--textTwo)]">
                    {obj.date_time}
                  </span>
                  <CardChip
                    label={obj?.category?.label}
                    style={{
                      padding: "5px 16px",
                      height: "fit-content",
                      color: "var(--textTwo)",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
function WalletSplits({ walletSplitList }) {
  const { t: tScreen } = useTranslation("screen");

  const status = {
    pending: "bg-[#3D2A1A] text-[#FFB366] border-1 border-[#FFB366]",
    active:
      "bg-[var(--bgTwo)] border border-[var(--borderTwo)] text-[var(--textTwo)]",
  };
  return (
    <>
      <div className="pt-3 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg sm:text-md md:text-xl lg:text-2xl font-semibold text-[var(--textOne)]">
            {tScreen("teams.manage.walletSplits")}
          </h1>
          <p className="text-xs sm:text-sm md:text-base xl:text-lg text-[var(--textTwo)]">
            {tScreen("teams.manage.walletSplitsDesc")}
          </p>
        </div>
        <AppButton
          onClick={() => {}}
          type={"primary"}
          icon="add"
          label={tScreen("teams.manage.configureSplits")}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
        {walletSplitList.members?.map((obj: any) => {
          return (
            <div
              key={obj?.id}
              className="gradient-one border p-4  overflow-hidden rounded-[16px] flex 
              flex-col sm:flex-row
               justify-between gap-4 border-[var(--borderThree)]"
            >
              {/* Left: Avatar + Name/Role */}
              <div className="flex  justify-center sm:justify-start items-center sm:items-start gap-3 flex-1">
                {obj.avatar_url && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--borderTwo)] flex-shrink-0">
                    <Image
                      src={obj.avatar_url}
                      alt={obj.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1 text-center sm:text-left">
                  <div className="font-bold text-[var(--textOne)] truncate">
                    {obj?.name}
                  </div>
                  <div className="text-sm text-[var(--textOne)]">
                    {obj?.role}
                  </div>
                </div>
              </div>

              {/* Right: Stats / Status */}
              <div className="flex justify-center sm:justify-start items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                <span className="font-bold text-[var(--textOne)] truncate">
                  {obj?.per}
                </span>
                <span className="text-sm text-[var(--textOne)]">
                  {obj?.amount}
                </span>
                {obj?.status && (
                  <div
                    className={`${
                      status[obj?.status]
                    } flex items-center h-fit w-fit px-3 py-1 rounded-full font-semibold text-sm`}
                  >
                    {obj?.status}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
function RosterLock() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <>
      <div className="pt-3 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg sm:text-md md:text-xl lg:text-2xl font-semibold text-[var(--textOne)]">
            {tScreen("teams.manage.rosterLockSettings")}
          </h1>
          <p className="text-xs sm:text-sm md:text-base xl:text-lg text-[var(--textTwo)]">
            {tScreen("teams.manage.rosterLockDesc")}
          </p>
        </div>
      </div>
    </>
  );
}
function Disputes() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <>
      <div className="pt-3 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg sm:text-md md:text-xl lg:text-2xl font-semibold text-[var(--textOne)]">
            {tScreen("teams.manage.teamDisputes")}
          </h1>
          <p className="text-xs sm:text-sm md:text-base xl:text-lg text-[var(--textTwo)]">
            {tScreen("teams.manage.teamDisputesDesc")}
          </p>
        </div>
        <AppButton
          onClick={() => {}}
          type={"primary"}
          label={tScreen("teams.manage.reportIssue")}
        />
      </div>
    </>
  );
}

function TeamTabFeed({ manageTeamData }) {
  const { t: tScreen } = useTranslation("screen");
  const [activeTab, setActiveTab] = useState("wallet");

  const teamTabs = [
    {
      key: "activity",
      label: tScreen("teams.manage.activityFeed"),
      component: (
        <ActivityFeed activityList={manageTeamData?.activityFeed || []} />
      ),
    },
    {
      key: "invites",
      label: tScreen("teams.manage.invites"),
      component: <Invites invitesList={manageTeamData?.invites || []} />,
    },
    {
      key: "notes",
      label: tScreen("teams.manage.notes"),
      component: <Notes notesList={manageTeamData?.notes || []} />,
    },
    {
      key: "wallet",
      label: tScreen("teams.manage.walletSplits"),
      component: (
        <WalletSplits walletSplitList={manageTeamData?.wallet_splits || []} />
      ),
    },
    {
      key: "roster",
      label: tScreen("teams.manage.rosterLock"),
      component: <RosterLock />,
    },
    {
      key: "disputes",
      label: tScreen("teams.manage.disputes"),
      component: <Disputes />,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs Header */}
      <div
        className="
          flex gap-3 sm:gap-4 
          overflow-x-auto sm:overflow-x-visible
          scrollbar-hide
          pb-2 sm:pb-0
        "
      >
        {teamTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              cursor-pointer flex-shrink-0 px-4 py-2 
              font-medium font-semibold rounded-3xl 
              transition-colors transition-transform duration-300 ease-in-out
              ${
                activeTab === tab.key
                  ? "bg-[var(--primary)] text-[var(--secondary)] shadow-md scale-105"
                  : "text-[var(--textTwo)] hover:text-[var(--textOne)]"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="w-full">
        {teamTabs.find((tab) => tab.key === activeTab)?.component}
      </div>
    </div>
  );
}

export default function ManageTeamPage() {
  const { t: tScreen } = useTranslation("screen");
  const { isAuthenticated, setLoading } = useAuth();
  const { teamId } = useParams();
  const [teamInfo, setTeamInfo] = useState(null);

  const fetchTeams = (id: any) => {
    if (!id || !isAuthenticated) return;
    setLoading(true);
    const data = teamsData.find((obj) => String(obj?.id) === String(teamId));
    setTeamInfo({
      ...data,
      ...initData,
    });
  };

  useEffect(() => {
    if (teamId && isAuthenticated) {
      fetchTeams(teamId);
    }
  }, [teamId, isAuthenticated]);

  return (
    <div className="flex flex-col gap-4 p-4 pb-20">
      <TopBgComp
        content={{
          chip: [
            {
              label: `${tScreen("teams.labels.rank")} # ${teamInfo?.rank}`,
              type: "primary",
            },
          ],
          title: teamInfo?.title,
          backgroundImage: teamInfo?.logo,
          button: [
            {
              label: tScreen("teams.manage.viewPublicProfile"),
              redirect: "",
              type: "primary",
              icon: "eye",
            },
            {
              label: tScreen("teams.manage.teamSettings"),
              redirect: "",
              type: "secondary",
              icon: "settings",
            },
          ],
        }}
      >
        <TeamScreenDetailsComp teamInfo={teamInfo} />
      </TopBgComp>

      <TeamTabFeed manageTeamData={manageTeamData} />
    </div>
  );
}
