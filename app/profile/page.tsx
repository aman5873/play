"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pencil, Trophy, User } from "lucide-react";

import Avatar from "@/components/auth/Avatar";
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
import DatePicker from "@/components/Form/DatePicker";
import CountryPicker from "@/components/Form/CountryPicker";

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

export default function UserPage() {
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const { t: tScreen } = useTranslation("screen");
  const { t: tCommon } = useTranslation("common");
  const { user } = useAuth();

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
              icon="squarePen"
              label={tScreen("user.editProfile")}
            />
          </div>
        </CardSection>

        <CardSection>
          <h1
            className={`text-lg flex gap-2 sm:text-xl font-semibold  text-[var(--textOne)]`}
          >
            <User className="text-[var(--primary)]" />
            {tScreen("user.profileInfo")}
          </h1>

          <div className="flex gap-4">
            <div className="relative w-25 bg-red-100 rounded-full">
              <Avatar
                user={user}
                size={100}
                isHeader={false}
                contClass="border-3 border-[var(--primary)] "
              />
              <div className="p-2 bg-[var(--primary)] text-[var(--secondary)] absolute bottom-1 cursor-pointer right-[-10px] rounded-full">
                <Pencil size={18} onClick={() => setShowUpdateProfile(true)} />
              </div>
            </div>
            <div className="flex flex-col text-[var(--textOne)] text-sm">
              <h1 className="text-lg sm:text-xl  font-semibold">
                {user?.name}
              </h1>
              <h1 className="text-md sm:text-lg font-medium text-[var(--primary)] ">
                {tCommon("level")} {user?.level ?? "-"}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <InputComp
              label={tScreen("user.Username")}
              name="userName"
              type="text"
              radius="10px"
              readOnly
              value={user?.username ?? ""}
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
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <DatePicker
              label={tScreen("user.dob")}
              value={user?.dob ?? ""}
              readOnly={true}
            />
            <CountryPicker
              label={tScreen("user.country")}
              value={user?.country ?? ""}
              readOnly={true}
            />
          </div>

          <InputComp
            label={tScreen("user.bio")}
            name="bio"
            type="textarea"
            radius="10px"
            readOnly
            rows={3}
            value={user?.bio ?? ""}
          />
        </CardSection>

        <CardSection>
          <h1
            className={`text-lg flex gap-2 sm:text-xl font-semibold  text-[var(--textOne)]`}
          >
            <Trophy className="text-[var(--primary)]" />
            {tScreen("user.medalsAchievements")}
          </h1>
          <div className="flex flex-wrap  gap-4">
            {userAchievements?.map((obj) => (
              <div
                key={obj?.id}
                className="p-4 rounded-lg border border-[var(--borderTwo)] bg-[var(--bgTwo)] 
               w-full 
        [@media(min-width:460px)_and_(max-width:619px)]:w-[98%]
        [@media(min-width:620px)]:w-[19rem]
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
