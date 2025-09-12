"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Circle } from "lucide-react";

import { TopBgComp } from "@/components/TopComp";
import { tournamentsData } from "@/constants/gameData";
// import { ListInfoComp } from "@/components/common/PageComp";

import { CardChip, iconMap } from "@/components/common/CardComp";
import Image from "next/image";
import ScrollableRowWrapper from "@/components/common/ScrollableRowWrapper";
import { TournamentCard } from "@/components/tournaments/TournamentFeed";

function ListComp({ title, list, variant = "bullet", start }) {
  return (
    <div className="flex flex-col gap-2">
      {title && (
        <h1 className="sm:text-md lg:text-lg font-bold my-1 uppercase opacity-95">
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
            <Circle size={10} fill="currentColor" className="shrink-0" />
          );
        }

        return (
          <div
            key={`rule-${index}`}
            className="flex items-start gap-2 text-sm md:text-base font-medium text-[var(--subtitle)]"
          >
            <span className="text-[var(--textTwo)] align-top">{prefix}</span>
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
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {tournamentInfo?.categories?.map((label) => {
          return (
            <CardChip
              key={label}
              label={label}
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
        <IconLabelInfo icon="calender" label={tournamentInfo?.start_date} />
        <IconLabelInfo icon="trophy" label={tournamentInfo?.prize} />
        <IconLabelInfo
          icon="users"
          label={tournamentInfo?.teams_participated_count}
        />
      </div>
      <div className="flex flex-wrap gap-4  items-center">
        <h1 className="sm:text-md lg:text-lg truncate font-semibold">
          Hosted by :
        </h1>
        {tournamentInfo?.organizer?.avatar_url && (
          <Image
            src={tournamentInfo?.organizer?.avatar_url}
            alt={tournamentInfo?.organizer?.name}
            width={48}
            height={48}
            className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-110 h-full"
          />
        )}
        <h1 className="sm:text-md lg:text-lg truncate font-bold">
          {tournamentInfo?.organizer?.name}
        </h1>
      </div>
    </div>
  );
}

function TournamentFeed() {
  const [tournamentList, setTournamentList] = useState([]);

  useEffect(() => {
    setTournamentList(tournamentsData?.tournaments);
  }, []);

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
      <ScrollableRowWrapper isReady={Boolean(tournamentList)}>
        {tournamentList.map((obj) => (
          <TournamentCard key={obj?.id} tournamentInfo={obj} />
        ))}
      </ScrollableRowWrapper>
    </div>
  );
}

export default function TournamentPage() {
  const { tournamentId } = useParams();
  const [tournamentInfo, setTournamentInfo] = useState(null);

  // Fetch from local data
  useEffect(() => {
    if (tournamentId) {
      const tournament = tournamentsData?.tournaments?.find(
        (t) => t.id == tournamentId
      );
      setTournamentInfo(tournament || null);
    }
  }, [tournamentId]);

  const primaryImage = tournamentInfo?.images?.find(
    (img) => img?.is_primary
  )?.image_path;

  return (
    <div className="flex flex-col gap-4 p-4 pb-20">
      <TopBgComp
        content={{
          chip: [{ label: tournamentInfo?.status, type: "primary" }],
          title: tournamentInfo?.title,
          description: tournamentInfo?.description,
          backgroundImage: primaryImage,
          button: [{ label: "Join", redirect: "", type: "primary" }],
        }}
      >
        <TournamentScreenDetailsComp tournamentInfo={tournamentInfo} />
      </TopBgComp>

      <div className="flex flex-wrap gap-2 p-4 border-1 border-[var(--borderThree)] gradient-one rounded-xl">
        <h1 className="sm:text-2xl lg:text-3xl font-bold my-1">Description</h1>
        <ListComp
          title="HOW TO REGISTER"
          list={tournamentInfo?.how_to_register}
          variant="number"
        />
        <ListComp title="FORMAT" list={tournamentInfo?.format} />
        <ListComp
          title="FREQUENTLY ASKED QUESTIONS?"
          list={tournamentInfo?.frequently_asked}
        />
      </div>
      <TournamentFeed />
    </div>
  );
}
