"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Circle } from "lucide-react";

import { TopBgComp } from "@/components/TopComp";

import { CardChip, iconMap } from "@/components/common/CardComp";
import Image from "next/image";
import TournamentFeed from "@/components/tournaments/TournamentFeed";
import { getStatuses, getTournaments } from "@/lib/tournament_ops";
import { useAuth } from "@/context/AuthContext";
import moment from "moment";

function ListComp({ title, list, variant = "bullet", start }) {
  if (list?.length > 0)
    return (
      <div className="flex flex-col gap-1.5 mt-4">
        {title && (
          <h1 className="sm:text-md lg:text-lg  font-bold  uppercase opacity-95">
            {title}
          </h1>
        )}

        {list?.map((rule, index) => {
          let prefix = null;

          if (start) {
            prefix = start;
          } else if (variant === "number") {
            prefix = `${index + 1}.`;
          } else if (variant === "alpha") {
            prefix = `${String.fromCharCode(97 + index)}.`; // a, b, c...
          } else {
            prefix = (
              <Circle fill="currentColor" className="shrink-0 w-2 h-2" />
            );
          }

          return (
            <div
              key={`rule-${index}`}
              className="flex items-start gap-2 text-sm md:text-base font-medium text-[var(--subtitle)]"
              style={{ alignItems: variant === "bullet" && "center" }}
            >
              <span className={`text-[var(--textTwo)] "align-top"`}>
                {prefix}
              </span>
              <span>{rule}</span>
            </div>
          );
        })}
      </div>
    );
}

function IconLabelInfo({ icon, label, labelStyle = {}, contStyle = {} }) {
  const Icon = iconMap[icon];
  return (
    <div className="flex gap-2 text-[var(--primary)]" style={contStyle}>
      <Icon className="w-6 h-6" />
      <h3 className="text-lg font-bold" style={labelStyle}>
        {label}
      </h3>
    </div>
  );
}

function TournamentScreenDetailsComp({ tournamentInfo }) {
  const deadline = moment(tournamentInfo?.deadline).format("Do MMM YYYY");
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {tournamentInfo?.categories?.map(({ id, display_name }) => {
          return (
            <CardChip
              key={id}
              label={display_name}
              style={{
                background: "transparent",
                color: "var(--textOne",
                borderColor: "var(--textOne",
                textAlign: "center",
              }}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2 ">
        <IconLabelInfo icon="calender" label={deadline} />
        <IconLabelInfo icon="trophy" label={tournamentInfo?.prize} />
        <IconLabelInfo
          icon="users"
          label={tournamentInfo?.teams_participated_count ?? "--"}
        />
      </div>
      <div className="flex flex-wrap gap-4  items-center">
        <h1 className="sm:text-md lg:text-lg truncate font-semibold">
          Hosted by :
        </h1>
        {tournamentInfo?.organizer_avatar_url && (
          <Image
            src={tournamentInfo?.organizer_avatar_url}
            alt={tournamentInfo?.organizer_name}
            width={48}
            height={48}
            className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-110 h-full"
          />
        )}
        <h1 className="sm:text-md lg:text-lg truncate font-bold">
          {tournamentInfo?.organizer_name}
        </h1>
      </div>
    </div>
  );
}

function TournamentFeedComp() {
  return (
    <div>
      <div className="flex justify-between items-center my-4 px-2">
        <IconLabelInfo
          icon="mission"
          label="Related Tournaments"
          labelStyle={{ color: "var(--textOne" }}
        />

        <IconLabelInfo
          icon="right"
          label="View All"
          contStyle={{ flexDirection: "row-reverse" }}
        />
      </div>

      <TournamentFeed onlyFeed={true} />
    </div>
  );
}

export default function TournamentPage() {
  const { isAuthenticated, setLoading } = useAuth();
  const { tournamentId } = useParams();
  const [tournamentInfo, setTournamentInfo] = useState(null);
  const [statusList, setStatusList] = useState([]);

  const fetchTournaments = useCallback(
    (id) => {
      if (!id || !isAuthenticated) return;
      setLoading(true);
      getTournaments(id).then((res) => {
        setLoading(false);
        if (res?.success && res?.data) {
          setTournamentInfo(res.data);
        }
      });
    },
    [isAuthenticated]
  );

  useEffect(() => {
    fetchTournaments(tournamentId);
    if (isAuthenticated) {
      getStatuses().then((res) => {
        if (res?.success && res?.data) setStatusList(res.data);
      });
    }
  }, [tournamentId, isAuthenticated]);

  const primaryImage = tournamentInfo?.images?.find(
    (img) => img?.is_primary
  )?.image_url;

  return (
    <div className="flex flex-col gap-4 p-4 pb-20">
      <TopBgComp
        content={{
          chip: [
            {
              label: statusList?.find((s) => s?.id === tournamentInfo?.status)
                ?.name,
              type: "primary",
            },
          ],
          title: tournamentInfo?.name,
          description: tournamentInfo?.tagline,
          backgroundImage: primaryImage,
          button: [{ label: "Join", redirect: "", type: "primary" }],
        }}
      >
        <TournamentScreenDetailsComp tournamentInfo={tournamentInfo} />
      </TopBgComp>

      <div className="flex flex-col gap-2 p-4 border-1 border-[var(--borderThree)] gradient-one rounded-xl">
        <h1 className="sm:text-2xl lg:text-3xl font-bold my-1">Description</h1>
        <ListComp
          title="HOW TO REGISTER"
          list={tournamentInfo?.registration_steps?.map((obj) => obj.step_text)}
          variant="number"
        />
        <ListComp
          title="FORMAT"
          list={tournamentInfo?.formats?.map((obj) => obj.format_text)}
        />
        <ListComp
          title="FORMAT"
          variant="alpha"
          list={tournamentInfo?.formats?.map((obj) => obj.format_text)}
        />
        <ListComp
          title="FREQUENTLY ASKED QUESTIONS?"
          list={tournamentInfo?.frequently_asked}
        />
      </div>
      <TournamentFeedComp />
    </div>
  );
}
