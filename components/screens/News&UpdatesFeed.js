"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { Eye, Calendar } from "lucide-react";

import { newsData } from "@/constants/data";
import Image from "next/image";
import ScrollableRowWrapper from "@/components/common/ScrollableRowWrapper";
import { ScreenDetailsComp } from "@/components/TopComp";

const newsSection = {
  chip: [
    {
      label: "Latest News",
      icon: "trend",
      type: "secondary",
    },
  ],
  title: "Gaming",
  highlightTitle: "News & Updates",
  description:
    "Stay ahead of the game with the latest news, updates, and insights from the gaming world.",
};

export function NewsCard(props) {
  const { newsInfo, contClass = "" } = props;
  const router = useRouter();

  if (newsInfo)
    return (
      <div
        onClick={() => router.push(`/news/${newsInfo?.id}`)}
        className={`gradient-one w-[18rem] sm:w-[20rem] lg:w-[23.65rem] border p-4 flex-shrink-0  overflow-hidden rounded-xl flex flex-col ${contClass}  border-[var(--borderThree)] `}
      >
        {newsInfo?.image_path && (
          <div
            className={`relative overflow-hidden rounded-lg group w-full h-[170px] sm:h-[150px] lg:h-[197px]`}
          >
            <Image
              src={newsInfo?.image_path}
              alt={newsInfo?.title}
              fill
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>
        )}

        <div
          className={`flex flex-col gap-2 mt-3 "w-full text-[var(--textOne)]`}
        >
          <h1
            className="sm:text-md lg:text-lg font-bold my-1"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "calc(1em * 1.5 * 2)", // font-size × line-height × 3 lines
            }}
          >
            {newsInfo?.title}
          </h1>
          <p className="text-[14px] mt-2 text-[var(--textTwo)]">
            {newsInfo?.description}
          </p>

          <div className="flex justify-between">
            {newsInfo?.date_time && (
              <div className="flex items-center gap-2 text-[var(--textTwo)]">
                <Calendar className="w-4 h-4" />
                <span>{newsInfo.date_time}</span>
              </div>
            )}
            {newsInfo?.views_count && (
              <div className="flex items-center gap-2 text-[var(--textTwo)]">
                <Eye className="w-4 h-4" />
                <span>{newsInfo.views_count}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default function NewsFeed() {
  const [newsList, setNewsList] = useState([]);

  //
  useEffect(() => {
    setNewsList(newsData);
  }, []);

  return (
    <div className="relative px-1 py-5 pb-20">
      {/* Scroll container */}

      <ScrollableRowWrapper isReady={Boolean(newsList)}>
        {newsList?.map((obj, index) => {
          return <NewsCard key={`news-${obj?.id}-${index}`} newsInfo={obj} />;
        })}
      </ScrollableRowWrapper>

      <div className="flex justify-center items-center mb-5 mt-4 w-full">
        <Link
          href="/news"
          className=" px-5 py-2 border rounded-[50px] border-[var(--primary)] text-[var(--primary)] hover:text-[var(--textOne)] hover:border-[var(--textOne)]   text-sm md:text-base transition-colors duration-300 cursor-pointer text-sm md:text-base transition-colors duration-300"
        >
          View All
        </Link>
      </div>
    </div>
  );
}

export function NewsFeedComp() {
  return (
    <div>
      <div className="relative w-full rounded-lg  p-6 sm:p-8 lg:p-12 flex flex-col items-center gap-4">
        <ScreenDetailsComp content={newsSection} isCentered={true} />
      </div>
      <NewsFeed />
    </div>
  );
}
