"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { AppButton, TopBgComp } from "@/components/TopComp";

import { useAuth } from "@/context/AuthContext";

import { teamsData } from "@/constants/data";
import { useTranslation } from "react-i18next";
import { CardSection } from "@/components/common/CardComp";
import InputComp from "@/components/Form/InputComp";
import ReactSelectInput from "@/components/common/ReactSelectInput";
import {
  SliderInput,
  SwitchInput,
  RadioGroup,
} from "@/components/Form/GenericInputComp";

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

function TeamRoles({ tScreen }) {
  const Role = ({ label, description, rightComp }) => (
    <div className="flex  justify-between rounded-lg border border-[var(--borderOne)] bg-[var(--bgOne)] p-3  ">
      <div>
        <h1 className="text-md lg:text-lg mb-1 font-normal text-[var(--textOne)]">
          {label}
        </h1>
        <p className="text-xs md:text-sm lg:text-md   text-[var(--textTwo)]">
          {description}
        </p>
      </div>
      {rightComp}
    </div>
  );
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-md lg:text-lg mt-2 font-medium text-[var(--textOne)]">
        {tScreen("createTeam.labels.teamRoles")}
      </h1>
      <Role
        label={tScreen("createTeam.labels.teamCaptain")}
        description={tScreen("createTeam.labels.teamCaptainDesc")}
        rightComp={
          <span className="text-[var(--primary)] font-medium">
            {tScreen("createTeam.labels.you")}
          </span>
        }
      />
      <Role
        label={tScreen("createTeam.labels.teamCoCaptain")}
        description={tScreen("createTeam.labels.teamCoCaptainDesc")}
        rightComp={
          <span className="text-[var(--textTwo)] font-medium">0/2</span>
        }
      />
      <Role
        label={tScreen("createTeam.labels.teamMembers")}
        description={tScreen("createTeam.labels.teamMembersDesc")}
        rightComp={
          <span className="text-[var(--textTwo)] font-medium">0/5</span>
        }
      />
    </div>
  );
}

export default function CreateTeamPage() {
  const { isAuthenticated, setLoading } = useAuth();
  const { teamId } = useParams();
  const { t: tScreen } = useTranslation("screen");
  const { t: tCommon } = useTranslation("common");
  const [teamInfo, setTeamInfo] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    max_members: 4,
    is_private: false,
    skill_requirement: "",
    preferred_play_style: "",
    additional_requirement: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "range" ? Number(value) : value,
    }));
    // setError({ ...error, [name]: false });
  };

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
              label: tScreen("createTeam.chip"),
              icon: "users",
              type: "primary",
            },
          ],
          title: tScreen("createTeam.title"),
          highlightTitle: tScreen("createTeam.highlightTitle"),
          description: tScreen("createTeam.description"),
          backgroundImage: teamInfo?.logo,
        }}
      />

      <CardSection label={tScreen("createTeam.labels.teamInfo")}>
        <InputComp
          label={tScreen("createTeam.labels.teamName")}
          name="name"
          placeholder={tScreen("createTeam.labels.teamNamePlaceholder")}
          type="text"
          required
          radius="10px"
          value={form?.name}
          onChange={handleChange}
        />
        <InputComp
          label={tScreen("createTeam.labels.teamDescription")}
          name="description"
          type="textarea"
          required
          radius="10px"
          rows={3}
          value={form?.description}
          onChange={handleChange}
        />

        <ReactSelectInput
          label={tScreen("createTeam.labels.primaryGame")}
          value={""}
          // required
          onChange={() => {}}
          options={[
            { id: "", label: tCommon("filters.all"), value: "" },
            { label: "Positive", value: "positive" },
            { label: "Negative", value: "negative" },
          ]}
          placeholder={tCommon("filters.all")}
        />
        <ReactSelectInput
          label={tScreen("createTeam.labels.region")}
          value={""}
          onChange={() => {}}
          options={[
            { id: "", label: tCommon("filters.all"), value: "" },
            { label: "Positive", value: "positive" },
            { label: "Negative", value: "negative" },
          ]}
          placeholder={tCommon("filters.all")}
          type="primaryTwo"
        />
      </CardSection>

      <CardSection label={tScreen("createTeam.labels.teamSettings")}>
        <SliderInput
          label={tScreen("createTeam.labels.maximumMembers")}
          name="max_members"
          min={4}
          max={40}
          value={form.max_members}
          onChange={handleChange}
        />

        <div className="flex  justify-between rounded-lg border border-[var(--borderOne)] bg-[var(--bgOne)] p-3  ">
          <div>
            <h1 className="text-md lg:text-lg mb-1 font-medium text-[var(--textOne)]">
              {tScreen("createTeam.labels.privateTeam")}
            </h1>
            <p className="text-xs md:text-sm lg:text-md font-medium  text-[var(--textTwo)]">
              {tScreen("createTeam.labels.privateTeamDesc")}
            </p>
          </div>
          <SwitchInput
            checked={form?.is_private}
            onChange={(value: boolean) => {
              handleChange({ target: { name: "is_private", value } });
            }}
          />
        </div>

        <TeamRoles tScreen={tScreen} />
        <CardSection label={tScreen("createTeam.labels.reqPreferences")}>
          <RadioGroup
            name="skill_requirement"
            label={tScreen("createTeam.labels.skillLevelReq")}
            value={form?.skill_requirement}
            onChange={(value) => {
              handleChange({ target: { name: "skill_requirement", value } });
            }}
            options={[
              { label: "Beginner", value: "beginner" },
              { label: "Intermediate", value: "Advanced" },
              { label: "Advanced", value: "advanced" },
              { label: "Professional", value: "professional" },
            ]}
          />
          <RadioGroup
            label={tScreen("createTeam.labels.preferredPlayStyles")}
            name="preferred_play_style"
            value={form?.preferred_play_style}
            onChange={(value) => {
              handleChange({ target: { name: "skill_requirement", value } });
            }}
            options={[
              { label: "Aggressive", value: "aggressive" },
              { label: "Defensive", value: "defensive" },
              { label: "Strategic", value: "strategic" },
              { label: "Balanced", value: "balanced" },
            ]}
          />
          <InputComp
            label={tScreen("createTeam.labels.additionalReq")}
            name="additional_requirement"
            type="textarea"
            radius="10px"
            rows={3}
            value={form?.additional_requirement}
            onChange={handleChange}
          />
        </CardSection>
      </CardSection>
      <AppButton
        onClick={() => {}}
        type={"primary"}
        label={tScreen("createTeam.labels.createTeam")}
      />
      <AppButton
        onClick={() => {}}
        type={"secondary"}
        label={tScreen("createTeam.labels.saveAsDraft")}
      />
    </div>
  );
}
