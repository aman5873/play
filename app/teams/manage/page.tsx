"use client";
import React from "react";

const initData = {
  id: 1,
  rank: 1,
  logo: "/images/screens/team_avatar.png",
  title: "Phoenix VR",
  country: "Spain",
  member_count: 5,
  success_rate: "80%",
  achievement: "VR Champions",
  points: 12450,

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

export default function page() {
  return <div>page</div>;
}
