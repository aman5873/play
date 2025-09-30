"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { MessageCircle, Heart, ThumbsUp, Share2 } from "lucide-react";
import { Eye } from "lucide-react";

import { socialData } from "@/constants/data";
import Image from "next/image";
import ScrollableRowWrapper from "@/components/common/ScrollableRowWrapper";
import { ButtonComp, ScreenDetailsComp } from "@/components/TopComp";
import { RatingComp } from "@/components/common/RatingComp";
import { CardChip } from "@/components/common/CardComp";
import { useTranslation } from "react-i18next";

function formatVideoDuration(ms?: number | null): string | null {
  if (!ms || ms < 0) return null; // ✅ handle no ms or invalid

  let totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number) => num.toString().padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  } else {
    return `${minutes}:${pad(seconds)}`;
  }
}

export function SocialCard(props: any) {
  const { socialInfo, contClass = "w-75 min-w-[15rem] max-w-xs" } = props;
  // const router = useRouter();
  const duration = formatVideoDuration(socialInfo?.media?.duration);
  const { t: tCommon } = useTranslation("common");

  if (socialInfo)
    return (
      <div
        // onClick={() => router.push(`/social/${socialInfo?.id}`)}
        className={`gradient-one border p-4 overflow-hidden rounded-xl flex flex-col gap-3 border-[var(--borderThree)] ${contClass}`}
      >
        {socialInfo?.media?.thumbnail && (
          <div
            className={`relative overflow-hidden rounded-lg group w-full h-[250px] sm:h-[197px] `}
          >
            <Image
              src={socialInfo?.media?.thumbnail}
              alt={socialInfo?.category}
              fill
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            {socialInfo?.is_trending && (
              <div className="text-sm flex gap-1 font-medium bg-[var(--bgFour)] border-[0.5px] border-[var(--borderFour)] px-2 py-1 rounded-[10px] text-[var(--textOne)] absolute top-2 left-2 px-1 rounded">
                {tCommon("trending")}
              </div>
            )}
            {socialInfo?.views_count && (
              <div className="text-sm flex gap-1 font-medium bg-black/40  backdrop-blur-sm  border-[0.5px] border-[black] px-2 py-1 rounded-[10px] text-[var(--textOne)] absolute top-2 right-2 px-1 rounded">
                <Eye size={18} className="text-[var(--textOne)]" />
                {socialInfo?.views_count}
              </div>
            )}
            {duration && (
              <div className="text-sm font-medium bg-black/40 backdrop-blur-sm border-[0.5px] border-[black] px-3 py-0.5 rounded-[10px] text-[var(--textOne)] absolute bottom-2 right-2 px-1 rounded">
                {duration}
              </div>
            )}
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
            <h1 className="text-md truncate font-bold">
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

      <ScrollableRowWrapper isReady={Boolean(socialList)}>
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
  const { t: tScreen } = useTranslation("screen");
  return (
    <div>
      <div className="relative w-full rounded-lg  p-6 sm:p-8 lg:p-12 flex flex-col items-center gap-4">
        <ScreenDetailsComp
          content={{
            chip: [
              {
                label: tScreen("social.chip"),
                icon: "trend",
                type: "secondary",
              },
            ],
            title: tScreen("social.title"),
            highlightTitle: tScreen("social.highlightTitle"),
            description: tScreen("social.description"),
          }}
          isCentered={true}
        />
        <ButtonComp
          buttons={[
            {
              icon: "trophy",
              label: tScreen("social.buttonPrimary"),
              redirect: "",
              type: "primary",
            },
            {
              icon: "upload",
              label: tScreen("social.buttonSecondary"),
              redirect: "",
              type: "secondary",
            },
          ]}
        />
      </div>
      <SocialFeed />
    </div>
  );
}
