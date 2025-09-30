"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { TopBgComp } from "@/components/TopComp";

import { useAuth } from "@/context/AuthContext";

import { teamsData } from "@/constants/data";

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

export default function CreateTeamPage() {
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
              label: `Rank # ${teamInfo?.rank}`,
              type: "primary",
            },
          ],
          title: teamInfo?.title,
          backgroundImage: teamInfo?.logo,
          button: [
            {
              label: "Apply to team",
              redirect: "",
              type: "primary",
              icon: "users",
            },
            {
              label: "Follow team",
              redirect: "",
              type: "secondary",
              icon: "heart",
            },
          ],
        }}
      ></TopBgComp>
    </div>
  );
}
