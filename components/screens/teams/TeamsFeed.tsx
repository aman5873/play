"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { Trophy, Users } from "lucide-react";

import { CardChip } from "@/components/common/CardComp";
import { teamsData } from "@/constants/data";
import { AppButton } from "@/components/TopComp";
import ScrollableRowWrapper from "@/components/common/ScrollableRowWrapper";

export function TeamCard(props: any) {
  const {
    teamInfo,
    contClass = "w-75 min-w-[12rem] max-w-xs",
    cardType,
  } = props;

  const router = useRouter();
  const users = `${teamInfo?.max_team_member}/ ${teamInfo?.member_count}`;

  if (teamInfo)
    return (
      <div
        className={`gradient-one  border p-4 flex-shrink-0 overflow-hidden rounded-xl flex flex-col gap-3 border-[var(--borderThree)] ${contClass} `}
      >
        {teamInfo?.logo && (
          <div
            className={`relative overflow-hidden rounded-lg group w-full h-[170px] sm:h-[150px] lg:h-[197px]`}
          >
            <Image
              src={teamInfo?.logo}
              alt={teamInfo?.title}
              fill
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>
        )}
        <h1 className="sm:text-md lg:text-lg font-bold">{teamInfo?.title}</h1>
        <p className="text-[14px]  text-[var(--textTwo)]">
          {teamInfo?.description}
        </p>

        <div className="flex justify-between">
          <CardChip label={teamInfo?.success_rate} />
          <div>
            <div className="flex gap-5">
              {teamInfo?.trophies_count && (
                <div className="flex items-center gap-1 text-[var(--textOne)] font-bold">
                  <Trophy className="w-4 h-4 text-[var(--textTwo)] mr-1" />
                  <span>{teamInfo.trophies_count}</span>
                </div>
              )}
              {users && (
                <div className="flex items-center gap-1 text-[var(--textOne)] font-bold">
                  <Users className="w-4 h-4 text-[var(--textTwo)] mr-1" />
                  <span>{users}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <AppButton
          onClick={() => router.push(`/teams/${teamInfo?.id}`)}
          type={"primary"}
          label={"View Profile"}
        />
        {cardType === "my_teams" && (
          <AppButton
            onClick={() => router.push(`/teams/manage/${teamInfo?.id}`)}
            type={"secondary"}
            label={"Manage"}
          />
        )}
      </div>
    );
}

export default function TeamsFeed(props: any) {
  const { param, title } = props;
  const { t: tCommon } = useTranslation("common");
  const { t: tScreen } = useTranslation("screen");

  const [teamList] = useState(teamsData);
  return (
    <div className="mx-auto py-10 w-full">
      {teamList?.length > 0 && (
        <div className="sm:text-lg lg:text-xl font-bold flex gap-2 mb-4">
          {tScreen(`${title}`)} <CardChip label={`(${teamList?.length})`} />
        </div>
      )}
      {/* <div
        className="
  grid gap-4 justify-items-start
    grid-cols-[repeat(auto-fit,minmax(5rem,1fr))]
    sm:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]
    md:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]
    lg:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]
    xl:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]
    2xl:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]
    "
      > */}
      <ScrollableRowWrapper isReady={Boolean(teamList)}>
        {teamList.length > 0 ? (
          teamList.map((obj, index) => (
            <TeamCard
              key={`social-${obj.id}-${index}`}
              teamInfo={obj}
              //   contClass="w-full"
              cardType={param}
            />
          ))
        ) : (
          <p className="text-[var(--textTwo)]">{tCommon("messages.noTeams")}</p>
        )}
      </ScrollableRowWrapper>
    </div>
  );
}
