"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Circle } from "lucide-react";

import { AppButton, TopBgComp } from "@/components/TopComp";
import { useAuth } from "@/context/AuthContext";
import { teamsData, manageTeamData } from "@/constants/data";
import { useTranslation } from "react-i18next";
import { TeamScreenDetailsComp } from "@/components/screens/teams/TeamsScreenTopComp";
import { CardChip, iconMap, CardSection } from "@/components/common/CardComp";
import Image from "next/image";
import { SwitchInput } from "@/components/Form/GenericInputComp";

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

  const SubSection = ({ obj, contClass = "", children = null }) => (
    <div className={`flex gap-4 mt-2 ${contClass}  items-center`}>
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
      {children}
    </div>
  );
  return (
    <div className="flex flex-col gap-4">
      {activityList.map((obj: any) => {
        const Icon = iconMap[obj?.icon];

        return (
          <div
            key={obj?.id}
            className={`gradient-one border p-4  sm:p-2 overflow-hidden rounded-[16px] flex flex-col border-[var(--borderThree)]`}
          >
            <div className="flex  justify-between gap-4 sm:gap-2">
              {Icon && (
                <div
                  className={`${
                    iconBg[obj?.icon]
                  } p-2 sm:p-3 w-10 h-10 sm:w-12 sm:h-12 rounded-full`}
                >
                  <Icon />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-base sm:text-lg xl:text-xl font-bold text-[var(--textOne)]">
                  {obj.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base xl:text-lg text-[var(--textTwo)]">
                  {obj.description}
                </p>
                <SubSection obj={obj} contClass="hidden sm:block" />
              </div>
              <CardChip
                label={obj?.action}
                style={{ padding: "5px 16px", height: "fit-content" }}
                contClass="hidden sm:block"
              />
            </div>
            <SubSection obj={obj} contClass="block sm:hidden ">
              <CardChip
                label={obj?.action}
                contClass="ml-auto"
                style={{ padding: "5px 16px", height: "fit-content" }}
              />
            </SubSection>
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
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-4">
        {walletSplitList.members?.map((obj: any) => {
          return (
            <div
              key={obj?.id}
              className="gradient-one border p-2 sm:p-4  overflow-hidden rounded-[16px] flex 
              flex-col sm:flex-row
               justify-between gap-4 border-[var(--borderThree)]"
            >
              {/* Left: Avatar + Name/Role */}
              <div className="flex  justify-center sm:justify-start items-center sm:items-start gap-2 sm:gap-3 flex-1">
                {obj.avatar_url && (
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[var(--borderTwo)] flex-shrink-0">
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

function RosterSubstitution({ rosterInfo, tScreen }) {
  return (
    <CardSection label={tScreen("teams.manage.substitutionIntents")}>
      {rosterInfo?.substitutions_requests?.length > 0 ? (
        rosterInfo?.substitutions_requests?.map((obj: any) => {
          return (
            <div
              key={obj?.id}
              className="flex flex-col rounded-lg border border-[var(--borderOne)] bg-[var(--bgOne)] p-3"
            >
              <div className="flex gap-2 items-center">
                <span className="text-md lg:text-lg mb-1 font-medium text-[var(--textOne)]">
                  {obj?.player?.name}
                </span>
                {"-"}
                <span className="text-md lg:text-lg mb-1 font-medium text-[var(--textYellow)]">
                  {obj?.title}
                </span>
              </div>
              <p className="text-sm lg:text-md  font-medium  text-[var(--textTwo)]">
                {obj?.description}
              </p>
              <div className="flex flex-wrap gap-2 my-2">
                <AppButton
                  onClick={() => {}}
                  type={"primary"}
                  label={tScreen("teams.manage.approveRequest")}
                  style={{ borderRadius: 10 }}
                  contClass="w-full  sm:w-fit"
                />
                <AppButton
                  onClick={() => {}}
                  type={"secondaryTwo"}
                  label={tScreen("teams.manage.denyRequest")}
                  style={{ borderRadius: 10 }}
                  contClass="w-full  sm:w-fit"
                />
                <AppButton
                  onClick={() => {}}
                  type={"outline"}
                  label={tScreen("teams.manage.contactPlayer")}
                  style={{ borderRadius: 10 }}
                  contClass="w-full  sm:w-fit"
                />
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-[var(--textTwo)]">
          {tScreen("teams.manage.noSubstitutionMsg")}
        </p>
      )}
    </CardSection>
  );
}

function RosterLockStatus({ rosterInfo, tScreen }) {
  return (
    <CardSection label={tScreen("teams.manage.rosterLockStatus")}>
      <div className="flex flex-col rounded-lg border border-[var(--borderOne)] bg-[var(--bgOne)] p-3">
        <div className="flex justify-between">
          <h3 className="text-md lg:text-lg mb-1 font-medium text-[var(--textOne)] flex items-center gap-2">
            <Circle className="shrink-0 w-2 h-2 bg-[var(--primary)] rounded-2xl" />
            {tScreen("teams.manage.currentStatus")}
          </h3>
          <h3 className="text-md lg:text-lg mb-1 font-semibold text-[var(--primary)]">
            {rosterInfo?.lock_statuses?.current_status?.label}
          </h3>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--borderOne)] bg-[var(--bgOne)] p-3">
        <div className="flex flex-col gap-1 mb-2 sm:flex-row sm:justify-between">
          <h3 className="text-md lg:text-lg  font-medium text-[var(--textOne)] flex items-center gap-2">
            {tScreen("teams.manage.nextTournament")}
          </h3>
          <h3 className="text-md lg:text-lg font-medium text-[var(--textYellow)] flex items-center gap-2">
            {rosterInfo?.lock_statuses?.next_tournament?.title}
          </h3>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
          <p className="text-sm lg:text-md  font-medium  text-[var(--textTwo)]">
            {tScreen("teams.manage.lockDate")}
          </p>
          <p className="text-sm lg:text-md font-medium  sm:text-right text-[var(--textOne)]">
            {rosterInfo?.lock_statuses?.next_tournament?.lock_date}
          </p>
        </div>
      </div>
    </CardSection>
  );
}
function RosterLock({ rosterInfo }) {
  const { t: tScreen } = useTranslation("screen");
  const [autoLockTournamentRoster, setAutoLockTournamentRoster] =
    useState(false);
  const [allowEmergencySubstitutions, setAllowEmergencySubstitutions] =
    useState(false);

  const ToggleStatusComp = ({ title, description, checked, onToggle }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between ">
      <div>
        <h1 className="text-md lg:text-lg mb-1 font-medium text-[var(--textOne)]">
          {title}
        </h1>
        <p className="text-xs md:text-sm lg:text-md font-medium  text-[var(--textTwo)]">
          {description}
        </p>
      </div>
      <SwitchInput checked={checked} onChange={onToggle} />
    </div>
  );

  useEffect(() => {
    setAutoLockTournamentRoster(rosterInfo?.auto_lock_tournaments_roster);
    setAllowEmergencySubstitutions(rosterInfo?.allow_emergency_substitutions);
  }, [rosterInfo]);
  return (
    <div className="flex flex-col gap-4">
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

      <CardSection label={tScreen("teams.manage.tournamentRosterLock")}>
        <ToggleStatusComp
          title={tScreen("teams.manage.AutoLockTournamentRoster")}
          description={tScreen("teams.manage.AutoLockTournamentRosterDesc")}
          checked={autoLockTournamentRoster}
          onToggle={setAutoLockTournamentRoster}
        />
        <ToggleStatusComp
          title={tScreen("teams.manage.allowEmergencySubstitutions")}
          description={tScreen("teams.manage.allowEmergencySubstitutionsDesc")}
          checked={allowEmergencySubstitutions}
          onToggle={setAllowEmergencySubstitutions}
        />
      </CardSection>

      <RosterSubstitution rosterInfo={rosterInfo} tScreen={tScreen} />
      <RosterLockStatus rosterInfo={rosterInfo} tScreen={tScreen} />
      <CardSection label={tScreen("teams.manage.recentActivity")}>
        {rosterInfo?.recent_activities?.length > 0 ? (
          rosterInfo?.recent_activities?.map((obj: any) => {
            return (
              <div
                key={obj?.id}
                className="flex flex-col rounded-lg border border-[var(--borderOne)] bg-[var(--bgOne)] p-3"
              >
                <div className="flex flex-col gap-1  sm:flex-row sm:justify-between">
                  <h3 className="text-md lg:text-lg font-medium text-[var(--textOne)] flex items-center gap-2">
                    <Circle className="shrink-0 w-2 h-2 bg-[var(--primary)] rounded-2xl" />
                    {obj?.title}
                  </h3>
                  <h3 className="text-md lg:text-lg  font-medium text-[var(--textTwo)]">
                    {obj?.date_time}
                  </h3>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-[var(--textTwo)]">No Recent Activities</p>
        )}
      </CardSection>
    </div>
  );
}
function Disputes({ disputesList }) {
  const { t: tScreen } = useTranslation("screen");
  const chip = {
    investigating: {
      background: "var(--bgYellow)",
      fontWeight: "bold",
    },
    medium: {
      background: "var(--bgYellow)",
      fontWeight: "bold",
      // color: "var(--secondary)",
    },
    high: {
      background: "var(--bgFour)",
      fontWeight: "bold",
    },
    open: {
      background: "var(--bgFour)",
      fontWeight: "bold",
    },
    startInvestigate: {},
    view: {
      background: "black",
    },
  };

  const ChipButton = ({ label, contClass = "", onClick }) => (
    <div
      onClick={onClick}
      className={`rounded-[20px] px-4 py-2 cursor-pointer  text-center font-medium  text-sm  text-[var(--textOne)] w-fit capitalize flex items-center justify-center transition-all hover:scale-[1.02] hover:opacity-95 duration-300 shadow-md ${contClass}`}
    >
      {label}
    </div>
  );
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
      <div className="flex flex-col gap-4">
        {disputesList?.map((obj: any) => {
          return (
            <div
              key={obj?.id}
              className={`gradient-one border p-2 sm:p-4  gap-2 overflow-hidden rounded-[16px] flex flex-col  border-[var(--borderThree)] `}
            >
              <div className="flex justify-between">
                <h1 className="text-lg lg:text-xl font-semibold text-[var(--textOne)]">
                  {obj?.title}
                </h1>
                <CardChip
                  label={obj?.status?.label}
                  style={chip?.[obj?.status?.value]}
                />
              </div>
              <CardChip
                label={obj?.category?.label}
                style={chip?.[obj?.category?.value]}
              />
              <p className="text-sm lg:text-md  font-medium  text-[var(--textTwo)]">
                {obj?.description}
              </p>
              <div className="flex gap-2 items-center">
                <span className="text-md font-medium text-[var(--textTwo)]">
                  Reported by{" "}
                  <span className="text-[var(--textOne)]">
                    {obj.reported_by}
                  </span>
                </span>
                <span>:</span>
                <span className="text-md text-[var(--textTwo)]">
                  {obj.date_time}
                </span>
              </div>

              <div className="flex gap-2">
                <ChipButton
                  onClick={() => {}}
                  label={tScreen("teams.manage.viewDetails")}
                  contClass={`bg-["black"] border border-[var(--borderTwo)]`}
                />
                <ChipButton
                  onClick={() => {}}
                  label={tScreen("teams.manage.startInvestigation")}
                  contClass={`bg-[var(--bgBlue)]`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function TeamTabFeed({ manageTeamData }) {
  const { t: tScreen } = useTranslation("screen");
  const [activeTab, setActiveTab] = useState("activity");

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
      component: <RosterLock rosterInfo={manageTeamData?.roster} />,
    },
    {
      key: "disputes",
      label: tScreen("teams.manage.disputes"),
      component: <Disputes disputesList={manageTeamData?.disputes || []} />,
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
          p-[5px]
          // pb-2 sm:pb-0
          
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
