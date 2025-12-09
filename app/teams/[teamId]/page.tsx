"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { TopBgComp } from "@/components/TopComp";

import { iconMap, SectionDetails } from "@/components/common/CardComp";
import { useAuth } from "@/context/AuthContext";
import moment from "moment";
import { teamsData, team_tournaments } from "@/constants/data";
import { RankSecondaryIcon } from "@/app/icons";
import GenericTable from "@/components/common/GenericTable";
import Image from "next/image";
import { useTranslation } from "react-i18next";

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

type TeamIconLabelInfoProps = {
  icon?: keyof typeof iconMap;
  label: string | number;
  value: string | number;
  labelStyle?: React.CSSProperties;
  contStyle?: React.CSSProperties;
  IconComp?: () => React.ReactNode;
};

function TeamIconLabelInfo({
  icon,
  value,
  label,
  labelStyle = {},
  contStyle = {},
  IconComp,
}: TeamIconLabelInfoProps) {
  const Icon = iconMap[icon || ""];

  return (
    <div
      className="flex  flex-col justify-center items-center "
      style={contStyle}
    >
      {Icon && <Icon className="w-5 h-5 text-[var(--primary)]" />}
      {IconComp && IconComp()}
      <h3 className="text-md font-bold mt-1" style={labelStyle}>
        {value}
      </h3>
      <h3
        className="text-md font-regular text-[var(--textTwo)]"
        style={labelStyle}
      >
        {label}
      </h3>
    </div>
  );
}

function TeamAnalyticsComp({ teamInfo }) {
  const { t: tScreen } = useTranslation("screen");
  return (
    <div className="flex w-full justify-center">
      <SectionDetails
        list={[
          {
            label: teamInfo?.rank,
            description: tScreen("teams.labels.globalRanking"),
            color: "var(--primary)",
          },
          {
            label: teamInfo?.trophies_count,
            description: tScreen("teams.labels.trophies"),
            color: "var(--textFour)",
          },
          {
            label: teamInfo?.tournaments_played,
            description: tScreen("teams.labels.tournaments"),
            color: "var(--textThree)",
          },
          {
            label: teamInfo?.main_game?.name,
            description: tScreen("teams.labels.mainGame"),
            color: "var(--textFive)",
          },
        ]}
      />
    </div>
  );
}

function TeamScreenDetailsComp({ teamInfo }) {
  const { t: tScreen } = useTranslation("screen");
  const founded_in = moment(teamInfo?.founded_in).format("Do MMM");
  const members = `${teamInfo?.max_team_member}/ ${teamInfo?.member_count}`;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-2 ">
        <TeamIconLabelInfo
          icon="trophy"
          value={teamInfo?.victory_count}
          label={tScreen("teams.labels.victories")}
        />
        <TeamIconLabelInfo
          icon="users"
          value={members}
          label={tScreen("teams.labels.members")}
        />
        <TeamIconLabelInfo
          IconComp={() => (
            <RankSecondaryIcon
              size={20}
              color="transparent"
              stroke="var(--primary)"
            />
          )}
          value={teamInfo?.points}
          label={tScreen("teams.labels.points")}
        />
        <TeamIconLabelInfo
          icon={"calender"}
          value={founded_in}
          label={tScreen("teams.labels.foundedIn")}
        />
      </div>
    </div>
  );
}

function TeamTable({ title, data, showDate = false }) {
  const { t: tScreen } = useTranslation("screen");
  const baseColumns = [
    { key: "title", label: tScreen("teams.labels.title") },
    { key: "position", label: tScreen("teams.labels.position") },
    {
      key: "prize",
      label: tScreen("teams.labels.prize"),
      render: (row: any) => (
        <span className="font-bold text-[var(--textSeven)]">{row?.prize}</span>
      ),
    },
  ];

  // Conditionally add the date column
  const columns = showDate
    ? [...baseColumns, { key: "date", label: tScreen("teams.labels.date") }]
    : baseColumns;

  return (
    <div className="flex flex-col gap-2 p-4 border-1 border-[var(--borderThree)] gradient-one rounded-xl">
      <h1 className="sm:text-2xl lg:text-3xl font-bold my-1">{title}</h1>
      <GenericTable data={data} columns={columns} />
    </div>
  );
}

function TeamMemberCard({ memberInfo }) {
  return (
    <div
      className={`gradient-one border p-4 overflow-hidden rounded-[16px] flex  justify-between border-[var(--borderThree)]`}
    >
      <div className="flex items-center gap-3">
        {memberInfo.avatar_url && (
          <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--borderTwo)]">
            <Image
              src={memberInfo.avatar_url}
              alt={memberInfo.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col w-[5rem]">
          <span className="font-bold text-[var(--textOne)] truncate">
            {memberInfo.name}
          </span>
          <span className="text-xs text-[var(--textTwo)]">
            {memberInfo.role}
          </span>
        </div>
      </div>
      <span className="font-bold text-[var(--textSeven)]">
        {memberInfo?.points}
      </span>
    </div>
  );
}

function LeftSection({ teamInfo }) {
  const { t: tScreen } = useTranslation("screen");
  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex flex-col gap-2 p-4 border-1 border-[var(--borderThree)] gradient-one rounded-xl">
        <h1 className="sm:text-2xl lg:text-3xl font-bold my-1">
          {tScreen("teams.labels.about")}
        </h1>
        <p className="text-[14px] text-[var(--textTwo)]">
          {teamInfo?.description}
        </p>
        <TeamAnalyticsComp teamInfo={teamInfo} />
      </div>
      <TeamTable
        title={tScreen("teams.labels.achievementsTrophies")}
        data={team_tournaments}
      />
      <TeamTable
        title={tScreen("teams.labels.tournamentHistory")}
        data={team_tournaments}
        showDate
      />
    </div>
  );
}

function RightSection({ teamInfo }) {
  const { t: tScreen } = useTranslation("screen");
  return (
    <div className="gradient-one p-3 w-full h-fit rounded-[16px] border border-[var(--borderThree)]">
      <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[var(--textOne)]">
        {tScreen("teams.labels.achievements")}
      </h1>

      <div
        className="
    grid gap-4 justify-center
    grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
  "
      >
        {teamInfo?.team_members?.map((obj, index) => (
          <TeamMemberCard
            key={`TeamMemberCard-${obj?.id}-${index}`}
            memberInfo={obj}
          />
        ))}
      </div>
    </div>
  );
}

export default function TeamPage() {
  const { isAuthenticated, setLoading } = useAuth();
  const { teamId } = useParams();
  const [teamInfo, setTeamInfo] = useState(null);
  const { t: tScreen } = useTranslation("screen");

  const fetchTeams = (id: any) => {
    if (!id || !isAuthenticated) return;
    setLoading(true);
    const data = teamsData.find((obj) => String(obj?.id) === String(teamId));
    setTeamInfo({
      ...data,
      ...initData,
    });
    setLoading(false);
  };

  useEffect(() => {
    if (teamId && isAuthenticated) {
      fetchTeams(teamId);
    }
  }, [teamId, isAuthenticated]);

  const content = useMemo(() => {
    return {
      chip: [
        {
          label: `${tScreen("teams.labels.rank")} # ${teamInfo?.rank ?? "-"}`,
          type: "primary",
        },
      ],
      title: teamInfo?.title,
      backgroundImage: teamInfo?.logo,
      button: [
        {
          label: tScreen("teams.labels.applyTeam"),
          redirect: "",
          type: "primary",
          icon: "users",
        },
        {
          label: tScreen("teams.labels.followTeam"),
          redirect: "",
          type: "secondary",
          icon: "heart",
        },
      ],
    };
  }, [tScreen, teamInfo?.rank, teamInfo?.title, teamInfo?.logo]);

  return (
    <div className="flex flex-col gap-4 p-4 pb-20">
      <TopBgComp content={content}>
        <TeamScreenDetailsComp teamInfo={teamInfo} />
      </TopBgComp>
      <div className="flex flex-col gap-4 lg:flex-row items-start">
        <LeftSection teamInfo={teamInfo} />

        {/* Right Section - fixed max width */}
        <div className="w-full lg:w-fit flex flex-col gap-4">
          <RightSection teamInfo={teamInfo} />
        </div>
      </div>
    </div>
  );
}
