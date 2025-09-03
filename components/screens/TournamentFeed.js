"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import Chip from "@components/common/Chip";
import { tournamentsData } from "@/constants/gameData";
import Image from "next/image";
import ScrollableRowWrapper from "@/components/common/ScrollableRowWrapper";

export function TournamentCard({ tournamentInfo, showDesc = false }) {
  const [hovered, setHovered] = useState(false);
  const primaryImage = tournamentInfo?.images.find((img) => img?.is_primary);

  const iconStyle = { fontSize: 16, color: "var(--subtitle)" };
  return (
    <div
      className="group relative w-500 min-w-[18rem] max-w-md flex-shrink-0 mx-2 overflow-hidden rounded-xl flex flex-col"
      style={{
        background: "var(--bg)",
        border: "1px solid var(--subtitle)",
        backgroundColor: "var(--surface)",
        height: showDesc ? "33rem" : "28rem", // fixed card height
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image wrapper */}
      <div
        className="relative w-full overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          height: hovered ? "16rem" : "19rem", // small change
        }}
      >
        <Image
          src={primaryImage?.image_path}
          alt={tournamentInfo?.title}
          fill
          className={`object-cover transition-transform duration-500 ease-in-out ${
            hovered ? "scale-105" : "scale-100"
          }`}
        />
        <Chip
          label={tournamentInfo?.category}
          contClass="absolute top-2 left-2"
        />
        <Chip
          label={tournamentInfo?.status}
          contClass="absolute top-2 right-2"
        />
      </div>
      {/* Info section */}
      <div
        className="flex flex-col  p-3.5 gap-1 text-16px"
        style={{ color: "var(--text)" }}
      >
        <h1
          className="font-sans text-lg font-semibold truncate"
          style={{ color: "var(--text)" }}
        >
          {tournamentInfo?.title}
        </h1>
        {/* Start Date */}
        {tournamentInfo?.start_date && (
          <div className="flex items-center gap-1">
            <InsertInvitationIcon style={iconStyle} />
            <span>{tournamentInfo.start_date}</span>
          </div>
        )}

        {/* Max Teams */}
        {tournamentInfo?.max_teams && (
          <div className="flex items-center gap-1">
            <PeopleAltIcon style={iconStyle} />
            <span>{tournamentInfo.max_teams}</span>
          </div>
        )}

        {/* Prize */}
        {tournamentInfo?.prize && (
          <div className="flex items-center gap-1">
            <EmojiEventsIcon style={iconStyle} />
            <span>$ {tournamentInfo.prize}</span>
          </div>
        )}

        {showDesc && tournamentInfo?.description && (
          <p
            className="font-sans text-[14px] mt-2"
            style={{
              color: "var(--subtitle)",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {tournamentInfo?.description}
          </p>
        )}
      </div>

      {/* Button row (always reserved height, button animates) */}
      <button
        className={`absolute font-semibold bottom-4 left-1/2 -translate-x-1/2 w-[90%] px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transform transition-all duration-500 ease-in-out ${
          hovered
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
        style={{ backgroundColor: "var(--title)", color: "var(--background)" }}
      >
        View Tournament
      </button>
    </div>
  );
}

export default function TournamentFeed() {
  const [tournamentList, setTournamentList] = useState([]);

  useEffect(() => {
    setTournamentList(tournamentsData);
  }, []);

  return (
    <div className="relative px-10 py-10 pb-20">
      <Chip label="Tournaments" />
      <div className="flex justify-between items-center">
        <h1
          className="font-sans text-2xl md:text-3xl lg:text-4xl font-semibold m-0 mb-5"
          style={{ color: "var(--text)" }}
        >
          Upcoming tournaments
        </h1>
        <Link
          href="/tournaments"
          className="text-[var(--subtitle)] cursor-pointer"
        >
          See all tournaments
        </Link>
      </div>

      {/* Scroll container */}
      <ScrollableRowWrapper isReady={tournamentList}>
        {tournamentList.map((obj) => (
          <TournamentCard key={obj?.id} tournamentInfo={obj} />
        ))}
      </ScrollableRowWrapper>
    </div>
  );
}
