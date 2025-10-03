"use client";
import EditProfileModal from "@/components/auth/EditProfileModal";
import {
  CardChip,
  CardSection,
  SectionDetails,
} from "@/components/common/CardComp";
import InputComp from "@/components/Form/InputComp";
import { AppButton } from "@/components/TopComp";
import { userAchievements } from "@/constants/data";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function UserAnalyticsComp({ userAnalytics }) {
  const { t: tScreen } = useTranslation("screen");
  return (
    <div className="flex w-full justify-center">
      <SectionDetails
        list={[
          {
            label: userAnalytics?.game_played,
            description: tScreen("user.gamePlayed"),
            color: "var(--primary)",
          },
          {
            label: userAnalytics?.wins,
            description: tScreen("user.wins"),
            color: "var(--textFour)",
          },
          {
            label: userAnalytics?.win_rate,
            description: tScreen("user.winRate"),
            color: "var(--textThree)",
          },
          {
            label: userAnalytics?.total_earnings,
            description: tScreen("user.totalEarnings"),
            color: "var(--textFive)",
          },
        ]}
        // TODO: If it to be centered according to TournamentFeaturedCard
        //  contClass={"group w-full max-w-[1300px]"}
      />
    </div>
  );
}

export default function page() {
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const { t: tScreen } = useTranslation("screen");
  const { user, setUser } = useAuth();

  return (
    <>
      <EditProfileModal
        open={showUpdateProfile}
        onClose={() => setShowUpdateProfile(false)}
      />

      <div className="flex flex-col gap-4 p-4">
        <CardSection>
          <div className="flex justify-between">
            <h1
              className={`text-lg sm:text-xl font-semibold font-nyxerin text-[var(--textOne)]`}
            >
              {tScreen("user.profile")}
            </h1>
            <AppButton
              onClick={() => setShowUpdateProfile(true)}
              type={"primary"}
              icon="edit"
              label={tScreen("user.editProfile")}
            />
          </div>
        </CardSection>

        <CardSection>
          <h1
            className={`text-lg sm:text-xl font-semibold  text-[var(--textOne)]`}
          >
            {tScreen("user.profileInfo")}
          </h1>

          <InputComp
            label={tScreen("user.Username")}
            name="userName"
            type="text"
            radius="10px"
            readOnly
            value={user?.userName ?? ""}
          />
          <InputComp
            label={tScreen("user.name")}
            name="name"
            type="text"
            radius="10px"
            readOnly
            value={user?.name ?? ""}
          />
          <InputComp
            label={tScreen("user.email")}
            name="email"
            type="text"
            radius="10px"
            readOnly
            value={user?.email ?? ""}
          />
          <InputComp
            label={tScreen("user.bio")}
            name="bio"
            type="textarea"
            radius="10px"
            readOnly
            rows={3}
            value={user?.bio}
          />
        </CardSection>

        <CardSection>
          <h1
            className={`text-lg sm:text-xl font-semibold  text-[var(--textOne)]`}
          >
            {tScreen("user.medalsAchievements")}
          </h1>
          <div className="flex flex-wrap  gap-4">
            {userAchievements?.map((obj) => (
              <div
                key={obj?.id}
                className="p-4 rounded-lg border border-[var(--borderTwo)] bg-[var(--bgTwo)] 
               w-full 
        [@media(min-width:460px)_and_(max-width:619px)]:w-[98%]
        [@media(min-width:620px)]:w-[17.7rem]
              "
              >
                <div className="flex justify-between">
                  <h1 className="text-md sm:text-lg font-semibold text-[var(--textOne)]">
                    {obj?.title}
                  </h1>
                  <span className="text-md text-[var(--textTwo)]">
                    {obj?.date}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <h1 className="text-sm text-[var(--textTwo)]">
                    {obj?.description}
                  </h1>
                  <CardChip label={obj?.category} />
                </div>
              </div>
            ))}
          </div>
        </CardSection>

        <UserAnalyticsComp
          userAnalytics={{
            game_played: "1247",
            wins: "892",
            win_rate: "71.58%",
            total_earnings: "$19250",
          }}
        />
      </div>
    </>
  );
}
