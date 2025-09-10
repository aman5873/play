"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { MessageCircle, Heart, ThumbsUp, Share2 } from "lucide-react";

import { socialData } from "@/constants/gameData";
import Image from "next/image";
import ScrollableRowWrapper from "@/components/common/ScrollableRowWrapper";
import { ButtonComp, ScreenDetailsComp } from "@/components/TopComp";
import { RatingComp } from "@/components/common/RatingComp";
import { CardChip } from "@/components/common/CardComp";

const socialSection = {
  chip: [
    {
      label: "Social Hub",
      icon: "trend",
      type: "secondary",
    },
  ],
  title: "Social",
  highlightTitle: "Hub",
  description:
    "Join the largest VR Sports community. Share your best plays, vote for epic content, and participate in our Creator Program.",
  button: [
    {
      icon: "trophy",
      label: "Content Creator Program",
      redirect: "/",
      type: "primary",
    },
    {
      icon: "upload",
      label: "Upload Video",
      redirect: "/tournaments",
      type: "secondary",
    },
  ],
};

export function SocialCard(props) {
  const { socialInfo, contClass = "" } = props;
  const router = useRouter();

  if (socialInfo)
    return (
      <div
        onClick={() => router.push(`/social/${socialInfo?.id}`)}
        className={`gradient-one w-70 min-w-[12rem] max-w-xs border p-4 flex-shrink-0 mx-2 overflow-hidden rounded-xl flex flex-col gap-3 ${contClass} border-[var(--borderThree)]`}
      >
        {socialInfo?.media?.thumbnail && (
          <div
            className={`relative overflow-hidden rounded-lg group w-full h-[170px] sm:h-[150px] lg:h-[197px]`}
          >
            <Image
              src={socialInfo?.media?.thumbnail}
              alt={socialInfo?.category}
              fill
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>
        )}

        <div className="flex gap-2 items-stretch group">
          <Image
            src={socialInfo?.channel?.logo}
            alt={socialInfo?.channel?.title}
            width={48} // optional, will be overridden
            height={48} // optional
            className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-110 h-full"
          />
          <div className="flex flex-col gap-1 w-full text-[var(--textOne)]">
            <h1 className="sm:text-md lg:text-lg truncate font-bold">
              {socialInfo?.channel?.title}
            </h1>
            <p className="text-[14px] text-[var(--textTwo)]">
              {socialInfo?.channel?.description}
            </p>
          </div>
        </div>

        <RatingComp avg_rating={socialInfo?.avg_rating} />

        <div className="flex justify-between">
          <div className="flex gap-5">
            {socialInfo?.like_count && (
              <div className="flex items-center gap-1 text-[var(--textTwo)]">
                <Heart className="w-4 h-4" />
                <span>{socialInfo.like_count}</span>
              </div>
            )}
            {socialInfo?.comment_count && (
              <div className="flex items-center gap-1 text-[var(--textTwo)]">
                <MessageCircle className="w-4 h-4" />
                <span>{socialInfo.comment_count}</span>
              </div>
            )}
          </div>

          <CardChip label={socialInfo?.category} />
        </div>

        <div className="flex gap-5 text-[var(--textOne)]">
          <button className="flex-1 flex items-center gap-1 border border-[var(--textOne)] rounded-full px-3 py-1 justify-center transition-all hover:scale-[1.05] hover:opacity-95 duration-300 shadow-md cursor-pointer">
            <ThumbsUp className="w-4 h-4" />
            <span>Like</span>
          </button>
          <button className="w-10 h-10 border border-[var(--textOne)] rounded-full flex items-center justify-center transition-all hover:scale-[1.10] hover:opacity-95 duration-300 shadow-md cursor-pointer">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
}

export default function SocialFeed() {
  const [socialList, setSocialList] = useState([]);

  useEffect(() => {
    setSocialList(socialData);
  }, []);

  return (
    <div className="relative px-1 py-5 pb-20">
      {/* Scroll container */}

      <ScrollableRowWrapper isReady={socialList}>
        {socialList?.map((obj, index) => {
          return (
            <SocialCard key={`social-${obj?.id}-${index}`} socialInfo={obj} />
          );
        })}
      </ScrollableRowWrapper>

      <div className="flex justify-center items-center mb-5 mt-4 w-full">
        <Link
          href="/social"
          className=" px-5 py-2 border rounded-[50px] border-[var(--primary)] text-[var(--primary)] hover:text-[var(--textOne)] hover:border-[var(--textOne)]   text-sm md:text-base transition-colors duration-300 cursor-pointer text-sm md:text-base transition-colors duration-300"
        >
          View All
        </Link>
      </div>
    </div>
  );
}

export function SocialFeedComp() {
  return (
    <div>
      <div className="relative w-full rounded-lg  p-6 sm:p-8 lg:p-12 flex flex-col items-center gap-4">
        <ScreenDetailsComp content={socialSection} isCentered={true} />
        <ButtonComp buttons={socialSection?.button} />
      </div>
      <SocialFeed />
    </div>
  );
}
