"use client";
import React from "react";
import { TopBgComp } from "@/components/TopComp";
import { useTranslation } from "react-i18next";
import { iconMap } from "@/components/common/CardComp";
import moment from "moment";
import { RankSecondaryIcon } from "@/app/icons";

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

export function TeamScreenDetailsComp({ teamInfo }) {
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

export default function TeamsScreenTopComp() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <TopBgComp
      content={{
        chip: [
          {
            label: tScreen("teams.chip"),
            icon: "users",
            type: "primary",
          },
        ],
        title: tScreen("teams.title"),
        highlightTitle: tScreen("teams.highlightTitle"),
        description: tScreen("teams.description"),
        backgroundImage: "/images/screens/team_avatar.png",
        button: [
          {
            label: tScreen("teams.buttonPrimary"),
            redirect: "/teams/create",
            type: "primary",
            icon: "add",
          },
        ],
      }}
    />
  );
}
