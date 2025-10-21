"use client";
import { BadgeIcon } from "@/app/icons";
import Avatar from "@/components/auth/Avatar";
import { CardChip } from "@/components/common/CardComp";
import { AppButton } from "@/components/TopComp";
import { contentCreatorPosts } from "@/constants/data";
import Image from "next/image";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Heart, MessageCircle, Copy } from "lucide-react";

const creatorProfile = {
  name: "StriverOp",
  username: "@Striver",
  cover_url: "/images/creator/user_cover.png",
  avatar_url: "/images/home/user2Avatar.png",
  isVerified: true,
  level: "Diamond",
  achievement: "Apex Legends",
  bio: "Professional esports player | Content creator | Streaming daily | Business inquiries: contact@progamerx.com",
  insights: {
    total_posts: 1247,
    followers: 89500,
    following: 342,
    main_game: "VR Basketball",
  },
};

function ProfileCard({ profileInfo }) {
  const { t: tScreen } = useTranslation("screen");

  const InsightRow = ({ list, color = "var(--textOne)" }: any) => (
    <div className="flex gap-4">
      {list?.map((obj, index) => {
        return (
          <div
            key={`insight-${index}`}
            className=" flex flex-col text-[var(--textTwo)] text-md  items-center"
          >
            <span className={`text-[${color}] font-semibold`}>
              {obj?.value}
            </span>
            <span>{obj?.label}</span>
          </div>
        );
      })}
    </div>
  );

  const UserDetails = ({ profileInfo, contClass = "" }) => (
    <div className={contClass}>
      <p className="text-[15px] text-[var(--textOne)] mb-2">
        {profileInfo?.bio}
      </p>
      <InsightRow
        list={[
          {
            label: tScreen("contentCreator.profile.posts"),
            value: profileInfo?.insights?.total_posts,
          },
          {
            label: tScreen("contentCreator.profile.followers"),
            value: profileInfo?.insights?.followers,
          },
          {
            label: tScreen("contentCreator.profile.following"),
            value: profileInfo?.insights?.following,
          },
          {
            label: tScreen("contentCreator.profile.mainGame"),
            value: profileInfo?.insights?.main_game,
          },
        ]}
      />
    </div>
  );

  const ActionButtons = ({ contClass = "" }) => (
    <div className={`flex gap-2 ${contClass}`}>
      <AppButton
        label={tScreen("contentCreator.profile.follow")}
        style={{ height: "fit-content" }}
      />
      <AppButton
        type="secondary"
        label={tScreen("contentCreator.profile.shareProfile")}
        style={{ height: "fit-content" }}
      />
    </div>
  );
  return (
    <div className="flex flex-col gap-4">
      {profileInfo?.cover_url && (
        <div className="w-full aspect-[10/2] overflow-hidden rounded-md bg-[var(--bgTwo)] relative">
          <Image
            src={profileInfo.cover_url}
            alt={"cover"}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="flex gap-2 flex-1">
          <div>
            <Avatar user={{ avatar_url: profileInfo?.avatar_url }} size={45} />
          </div>
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-1 flex-1 ">
              <div className="flex gap-2">
                <h1 className="text-lg lg:text-lg font-semibold text-[var(--textOne)]">
                  {profileInfo?.name}
                </h1>
                {profileInfo?.isVerified && (
                  <BadgeIcon className="text-[var(--primary)]" size={20} />
                )}
                <CardChip
                  label={profileInfo?.level}
                  style={{
                    background: "var(--textFive)",
                    fontWeight: 600,
                    padding: "1px 8px",
                    fontSize: 14,
                    height: "fit-content",
                  }}
                />
              </div>
              <p className="text-[14px] text-[var(--textTwo)]">
                {profileInfo?.username}
              </p>
              <UserDetails
                profileInfo={profileInfo}
                contClass="hidden md:block"
              />
            </div>
            <ActionButtons contClass="hidden md:flex" />
          </div>
        </div>
      </div>
      <UserDetails profileInfo={profileInfo} contClass="block md:hidden" />
      <ActionButtons contClass="flex md:hidden" />
    </div>
  );
}

function PostFeed({ posts }) {
  return (
    <div className="grid grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5 gap-2">
      {posts.map((obj, index) => {
        const image = obj?.images?.[0]?.image_url;
        const hasMultipleImages = obj?.images?.length > 1;

        if (!image) return null;

        return (
          <div
            key={`${obj?.id}-${index}`}
            className="group relative aspect-square w-full overflow-hidden cursor-pointer bg-black rounded-md"
          >
            {/* Post Image */}
            <Image
              src={image}
              alt={`post-${index}`}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />

            {/* Multiple Images Icon */}
            {hasMultipleImages && (
              <div className="absolute top-2 right-2 text-white opacity-80">
                <Copy className="w-4 h-4" />
              </div>
            )}

            {/* Hover Overlay with Like & Comment Counts */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
              <div className="flex items-center gap-4 text-sm sm:text-base font-semibold">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{obj?.like_count || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{obj?.comment_count || 0}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProfileTabFeed({ posts }) {
  const { t: tScreen } = useTranslation("screen");
  const [activeTab, setActiveTab] = useState("posts");

  const tabs = [
    {
      key: "posts",
      label: tScreen("contentCreator.profile.posts"),
      component: <PostFeed posts={posts} />,
    },
    {
      key: "liked",
      label: tScreen("contentCreator.profile.liked"),
      component: <PostFeed posts={posts} />,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs Header */}
      <div
        className="
          flex gap-3 sm:gap-4 
          overflow-x-auto sm:overflow-x-visible
          scrollbar-hide
          p-[5px]
          // pb-2 sm:pb-0
          
        "
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              cursor-pointer flex-shrink-0 px-4 py-2 
              font-medium font-semibold
              transition-colors transition-transform duration-300 ease-in-out
              ${
                activeTab === tab.key
                  ? "border-b-2 border-[var(--primary)] text-[var(--primary)] shadow-md scale-105"
                  : "text-[var(--textTwo)] hover:text-[var(--textOne)]"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="w-full">
        {tabs.find((tab) => tab.key === activeTab)?.component}
      </div>
    </div>
  );
}

export default function ContentProfileFeed() {
  return (
    <div>
      <div className="gradient-one border p-4 w-full overflow-hidden rounded-xl flex flex-col gap-3 border-[var(--borderThree)]">
        <ProfileCard profileInfo={creatorProfile} />
        <ProfileTabFeed posts={contentCreatorPosts} />
      </div>
    </div>
  );
}
