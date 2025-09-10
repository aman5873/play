"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Rating } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import moment from "moment";

import TopComp from "@/components/TopComp";
import {
  gamesData,
  tournamentsData as upcomingTournaments,
} from "@/constants/gameData";
import ScrollableRowWrapper from "@/components/common/ScrollableRowWrapper";
import Image from "next/image";

function DetailsCard({ data }) {
  if (!data?.list?.length) return null;

  return (
    <div className="flex flex-col w-full md:w-[300px] p-5 rounded-lg gap-3 bg-[var(--surface)]">
      {/* Title */}
      {data?.title && (
        <h3 className="text-xl md:text-2xl font-semibold">{data.title}</h3>
      )}

      {/* List */}
      <div className="flex flex-col gap-2">
        {data.list.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm md:text-base ">
            <div className="font-medium text-[var(--subtitle)]">
              {item.label}
            </div>
            <div className="text-[var(--text)]">{item.value || "-"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlatformDetailComp({ gameInfo }) {
  return (
    <div className="flex-1 min-w-[250px] sm:max-w-full max-w-[500px] p-5 rounded-lg bg-[var(--surface)]">
      <h3 className="text-xl md:text-2xl font-semibold">Platforms</h3>
      <div className="flex flex-col gap-2">
        {gameInfo?.platform?.list.map((item, idx) => (
          <div
            key={idx}
            className="flex gap-2 text-sm md:text-base font-medium text-[var(--subtitle)]"
          >
            <SportsEsportsIcon />
            <div>{item}</div>
          </div>
        ))}
        <div className="mt-3">
          <div className="mb-1 font-semibold text-base md:text-lg text-[var(--text)]">
            Minimum requirements
          </div>
          <div className=" text-sm text-[var(--subtitle)]">
            {gameInfo?.platform?.requirements}
          </div>
        </div>
      </div>
    </div>
  );
}

function RatingComp({ gameInfo }) {
  const avg = gameInfo?.ratings?.avg_rating || 0;
  const count = gameInfo?.ratings?.count || 0;

  return (
    <div className="flex-1 w-full sm:max-w-full max-w-[815px] p-5 rounded-lg bg-[var(--surface)]">
      <div className="flex justify-between items-center">
        <h3 className="text-xl md:text-2xl font-semibold">Ratings</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Rating name="game-rating" value={avg} precision={0.5} readOnly />
          <span className="text-sm text-[var(--subtitle)]">
            {avg.toFixed(1)}/5
          </span>
        </div>
      </div>
      <p className="text-base mt-1 text-[var(--subtitle)]">
        {count} user reviews
      </p>
    </div>
  );
}

function OverviewComp({ gameInfo }) {
  return (
    <div className="flex flex-col  gap-4">
      <h1 className="font-sans text-2xl md:text-3xl  font-semibold m-0 text-[var(--text)]">
        About the game
      </h1>
      <p className="text-[var(--subtitle)]">{gameInfo?.description}</p>
      <div className="flex flex-wrap gap-5">
        <DetailsCard
          data={{
            title: "Details",
            list: [
              { label: "Release Date", value: gameInfo?.release_date },
              { label: "Developer", value: gameInfo?.developer },
              {
                label: "Active players",
                value: gameInfo?.active_players_count,
              },
              {
                label: "Tournaments",
                value: gameInfo?.active_tournaments_count,
              },
            ],
          }}
        />
        {/* TODO: currently asked in question for this */}
        <PlatformDetailComp gameInfo={gameInfo} />
      </div>
      <RatingComp gameInfo={gameInfo} />
    </div>
  );
}

function ListInfoComp({ list, heading }) {
  return (
    <div>
      <h3 className="text-xl md:text-2xl font-semibold">{heading}</h3>
      <div className="flex gap-2 flex-wrap mt-4">
        {list?.map((listObj) => {
          return (
            <div
              key={listObj?.id}
              className="flex flex-col w-full md:w-[49%] p-5 rounded-lg gap-3 bg-[var(--surface)]"
            >
              <h4 className="text-xl font-semibold">{listObj?.title}</h4>
              <p className="font-medium text-[var(--subtitle)]">
                {listObj?.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function UpcomingTournamentsComp({ tournaments }) {
  const iconStyle = { fontSize: 20, color: "var(--subtitle)" };

  return (
    <div className="flex flex-col gap-3 mt-4">
      <h3 className="text-xl md:text-2xl font-semibold">
        Upcoming Tournaments
      </h3>
      {tournaments?.map((tournamentInfo) => {
        const date = moment(tournamentInfo?.start_date).format("Do MMMM YYYY");
        const prize = tournamentInfo?.prize;

        return (
          <div
            key={tournamentInfo?.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 rounded-lg bg-[var(--surface)]"
            style={{ color: "var(--text)" }}
          >
            {/* Left Section */}
            <div>
              <h1 className="font-sans text-xl font-semibold truncate">
                {tournamentInfo?.title}
              </h1>

              <div className="flex flex-wrap gap-4 mt-1 text-sm md:text-base">
                {date && (
                  <div className="flex items-center gap-1">
                    <InsertInvitationIcon style={iconStyle} />
                    <span>{date}</span>
                  </div>
                )}
                {prize && (
                  <div className="flex items-center gap-1">
                    <EmojiEventsIcon style={iconStyle} />
                    <span>$ {prize}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section (Button) */}
            <button
              className="min-w-[100px]  px-5 py-2.5 cursor-pointer rounded-lg font-semibold text-sm md:text-base 
              hover:scale-[1.02] hover:opacity-95 transition-all duration-300 shadow-md  bg-[var(--title)] text-[var(--background)]"
            >
              Register
            </button>
          </div>
        );
      })}
      <button
        className="w-full cursor-pointer mx-auto px-5 py-2.5 rounded-lg font-semibold text-sm md:text-base 
              hover:scale-[1.02] hover:opacity-95 transition-all duration-300 shadow-md"
        style={{
          border: "1px solid var(--title)",
          color: "var(--title)",
        }}
      >
        See all tournaments
      </button>
    </div>
  );
}

function TwoColumnLayout({ gameInfo, primaryImage }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Overview", "Characteristics", "Tournaments"];
  const tabContent = [
    <OverviewComp key={"OverviewComp"} gameInfo={gameInfo} />,
    <ListInfoComp
      key="ListInfoComp"
      list={gameInfo?.features}
      heading="Main features"
    />,
    <UpcomingTournamentsComp
      key="UpcomingTournamentsComp"
      tournaments={upcomingTournaments?.tournaments}
    />,
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full px-8 mt-10">
      {/* Left Section (70%) */}
      <div className="w-full lg:w-[70%] flex flex-col gap-4">
        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-600 overflow-x-auto">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`pb-2 text-sm md:text-base font-medium whitespace-nowrap cursor-pointer ${
                activeTab === idx
                  ? "border-b-2 border-[var(--title)] text-[var(--title)]"
                  : "text-gray-400 hover:text-[var(--text)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4 rounded-lg  min-h-[200px]">
          {tabContent[activeTab]}
        </div>
      </div>

      {/* Right Section (30%) */}
      {primaryImage && (
        <div className="w-[95%] lg:w-[30%]  lg:mt-auto mx-auto mb-4">
          <div className="relative rounded-lg overflow-hidden min-h-[400px] shadow-lg">
            {/* Background image full height */}
            <Image
              src={primaryImage}
              alt="image"
              fill
              className="object-cover transition-transform duration-500 ease-in-out"
            />

            {/* Overlay with text + button */}
            <div
              className="absolute bottom-0 left-0 w-full p-5 flex flex-col gap-3"
              style={{
                background: `linear-gradient(
            to top, 
            rgba(0, 0, 0, 0.9) 0%, 
            rgba(0, 0, 0, 0.4) 50%,  
            rgba(0, 0, 0, 0.4) 100%
          )`,
              }}
            >
              {/* Active Users */}
              {gameInfo?.active_players_count && (
                <p className="text-sm md:text-base font-medium text-white tracking-wide drop-shadow">
                  <PeopleAltIcon className="mr-2" />
                  {gameInfo?.active_players_count} active users
                </p>
              )}

              {/* CTA Button */}
              <button
                className="w-full px-5 py-2.5 rounded-lg font-semibold text-sm md:text-base 
          hover:scale-[1.02] hover:opacity-95 transition-all duration-300 shadow-md cursor-pointer text-[var(--background)]"
                style={{
                  background: "var(--title)",
                }}
              >
                Download Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GalleryComp({ gameInfo }) {
  return (
    <div className="flex flex-col px-10 gap-5 mt-5">
      <h1 className="font-sans text-2xl md:text-3xl  font-semibold m-0 text-[var(--text)]">
        Image gallery
      </h1>
      <ScrollableRowWrapper isReady={gameInfo?.images}>
        {gameInfo?.images?.map((obj, index) => {
          return (
            <div
              key={`${obj?.id}-${index + 1}`}
              className="relative aspect-[16/9] min-w-[14rem] sm:min-w-[18rem] md:min-w-[22rem] lg:min-w-[24rem]rounded-lg mx-2 sm:mx-3 overflow-hidden transition-all duration-500 ease-in-out"
            >
              <Image
                src={obj?.image_path}
                alt="image"
                fill
                className="object-cover transition-transform duration-500 ease-in-out"
              />
            </div>
          );
        })}
      </ScrollableRowWrapper>
    </div>
  );
}

// change
export default function GamePage() {
  const { gameId } = useParams();
  const [gameInfo, setGameInfo] = useState(null);

  // Fetch from local data
  useEffect(() => {
    if (gameId) {
      const game = gamesData.find((g) => g.id === Number(gameId));
      setGameInfo(game || null);
    }
  }, [gameId]);

  const primaryImage = gameInfo?.images?.find(
    (img) => img?.is_primary
  )?.image_path;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TopComp
        content={{
          chip: [{ label: "Game" }],
          title: gameInfo?.title,
          description: gameInfo?.description,
          backgroundImage: primaryImage,
          button: [
            { label: " Download game", redirect: "", type: "primary" },
            {
              label: " Watch tournaments",
              redirect: "",
              type: "secondary",
            },
          ],
        }}
      />
      <GalleryComp gameInfo={gameInfo} />
      <TwoColumnLayout gameInfo={gameInfo} primaryImage={primaryImage} />
    </div>
  );
}
