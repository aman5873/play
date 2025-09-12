"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";

import { Trophy, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

import { tournamentsData } from "@/constants/gameData";
import Image from "next/image";
import ScrollableRowWrapper from "@/components/common/ScrollableRowWrapper";
import {
  CardChip,
  CardIconInfo,
  CategoryCardComp,
  SectionDetails,
  ProgressBar,
} from "@/components/common/CardComp";
import { ScreenDetailsComp } from "@/components/TopComp";

const tournamentSection = {
  chip: [
    {
      label: "Live Gaming Tournaments",
      icon: "trophy",
      type: "primary",
    },
  ],
  title: "Mobile & PC Gaming",
  highlightTitle: "Championships",
  description:
    "Join elite gaming tournaments across mobile and PC platforms. Showcase your skills in your favorite games and compete for massive prize pools.",
};

export function FeaturedCardDetails({ tournamentInfo, availableSlots }) {
  const now = moment();
  const startDate = moment(tournamentInfo?.start_date);
  let timeLeftLabel = "--";

  if (startDate.isValid()) {
    const diffInHours = startDate.diff(now, "hours", true);

    if (diffInHours >= 1) {
      const days = startDate.diff(now, "days");
      const hours = startDate.diff(now.clone().add(days, "days"), "hours");
      timeLeftLabel = `${days}d ${hours}h`;
    } else if (diffInHours > 0) {
      const minutes = startDate.diff(now, "minutes");
      const seconds = startDate.diff(
        now.clone().add(minutes, "minutes"),
        "seconds"
      );
      timeLeftLabel = `${String(minutes).padStart(2, "0")}m ${String(
        seconds
      ).padStart(2, "0")}s`;
    } else {
      timeLeftLabel = "00m 00s"; // already started/past
    }
  }
  return (
    <>
      <CategoryCardComp
        categories={tournamentInfo?.categories}
        maxVisible={tournamentInfo?.categories?.length}
      >
        <CardChip
          label={`${availableSlots ? `${availableSlots} slots` : ""}`}
        />
      </CategoryCardComp>
      <CardIconInfo
        list={[
          {
            icon: "trophy",
            label: tournamentInfo?.prize,
            description: "Prize Pool",
            color: "var(--textThree)",
          },
          {
            icon: "clock",

            color: "var(--textFour)",
            label: timeLeftLabel,
            description: "Time Left",
          },
          {
            icon: "users",
            color: "var(--textSix)",
            label: "--",
            description: "Players",
          },

          {
            icon: "mission",
            color: "var(--textOne)",
            label: "--",
            description: "Difficulty",
          },
        ]}
      />
    </>
  );
}

export function TournamentCard(props) {
  const {
    tournamentInfo,
    style = {},
    contClass = "",
    isFeatured = false,
  } = props;
  const router = useRouter();
  const primaryImage = tournamentInfo?.images.find((img) => img?.is_primary);
  const availableSlots = tournamentInfo?.teams_participated_count;

  if (tournamentInfo)
    return (
      <div
        className={`${
          isFeatured
            ? "w-full mb-4 gradient-secondary border-[0.5px] border-[var(--primary)]"
            : "gradient-one  w-[18rem] sm:w-[20rem] lg:w-[23.65rem] border border-[var(--borderThree)]"
        }  p-4 flex-shrink-0 mx-2 overflow-hidden rounded-xl flex flex-col ${contClass}`}
        style={{
          ...style,
        }}
      >
        <div
          className={`flex flex-col ${
            isFeatured ? "lg:flex-row-reverse" : ""
          } gap-4`}
        >
          {primaryImage?.image_path && (
            <div
              className={`relative overflow-hidden rounded-lg group ${
                isFeatured
                  ? "w-full lg:w-3/5 h-[200px] sm:h-[250px] md:h-[350px] lg:h-auto"
                  : "w-full h-[170px] sm:h-[150px] lg:h-[197px]"
              }`}
            >
              <Image
                src={primaryImage?.image_path}
                alt={tournamentInfo?.title}
                fill
                className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
          )}

          <div
            className={`flex flex-col gap-2 text-[var(--textOne)] mt-3  ${
              isFeatured ? "w-full  lg:w-2/5 " : "w-full"
            }`}
          >
            <h2 className="text-md font-semibold truncate">
              {tournamentInfo?.game?.title}
            </h2>
            <h1 className="sm:text-lg md:text-xl lg:text-2xl font-bold truncate my-1">
              {tournamentInfo?.title}
            </h1>
            <p className="text-[14px] mt-2 text-[var(--textTwo)]">
              Hosted by Various Creators
            </p>

            {isFeatured ? (
              <FeaturedCardDetails
                tournamentInfo={tournamentInfo}
                availableSlots={availableSlots}
              />
            ) : (
              <>
                <CategoryCardComp categories={tournamentInfo?.categories} />
                <ProgressBar
                  label="Slots"
                  count={availableSlots}
                  maxCount={tournamentInfo?.max_teams}
                />
                <div className="flex justify-between">
                  {tournamentInfo?.start_date && (
                    <div className="flex items-center gap-2 text-[var(--textTwo)]">
                      <Calendar className="w-4 h-4" />
                      <span>{tournamentInfo.start_date}</span>
                    </div>
                  )}
                  {tournamentInfo?.prize && (
                    <div className="flex items-center gap-2 text-[var(--textTwo)]">
                      <Trophy className="w-4 h-4" />
                      <span>$ {tournamentInfo.prize}</span>
                    </div>
                  )}
                </div>
              </>
            )}

            <button
              onClick={() => router.push(`/tournaments/${tournamentInfo?.id}`)}
              className="px-4 py-2 flex items-center justify-center rounded-full border border-[var(--primary)] cursor-pointer text-sm sm:text-base font-rajdhani font-bold transition-all hover:scale-[1.02] hover:opacity-95 duration-300 shadow-md bg-[var(--primary)] text-[var(--secondary)]"
            >
              View Tournament
            </button>
          </div>
        </div>
      </div>
    );
}

export default function TournamentFeed() {
  const [tournamentList, setTournamentList] = useState([]);

  useEffect(() => {
    setTournamentList(tournamentsData?.tournaments);
  }, []);

  return (
    <div className="relative px-1 py-5 pb-20">
      {/* Scroll container */}
      <TournamentCard tournamentInfo={tournamentList?.[0]} isFeatured={true} />
      <ScrollableRowWrapper isReady={Boolean(tournamentList)}>
        {tournamentList.map((obj) => (
          <TournamentCard key={obj?.id} tournamentInfo={obj} />
        ))}
      </ScrollableRowWrapper>

      <div className="flex justify-center items-center mb-5 mt-4 w-full">
        <Link
          href="/tournaments"
          className=" px-5 py-2 border rounded-[50px] border-[var(--primary)] text-[var(--primary)] hover:text-[var(--textOne)] hover:border-[var(--textOne)]   text-sm md:text-base transition-colors duration-300 cursor-pointer text-sm md:text-base transition-colors duration-300"
        >
          View All
        </Link>
      </div>
      <SectionDetails
        list={[
          {
            label: tournamentsData?.active_tournaments,
            description: "Active Tournaments",
            color: "var(--primary)",
          },
          {
            label: tournamentsData?.total_prize_pool,
            description: "Total Prize Pool",
            color: "var(--textFour)",
          },
          {
            label: tournamentsData?.total_earned,
            description: "Total Earned",
            color: "var(--textFive)",
          },
        ]}
      />
    </div>
  );
}

export function TournamentFeedComp() {
  return (
    <div>
      <div className=" w-full rounded-lg  p-4 sm:p-8 lg:p-8 flex flex-col items-center gap-4">
        <ScreenDetailsComp content={tournamentSection} isCentered={true} />
      </div>
      <TournamentFeed />
    </div>
  );
}
