"use client";
import React from "react";
import { useTranslation } from "react-i18next";

import { NewsCard } from "@/components/screens/news/News&UpdatesFeed";
import { newsData } from "@/constants/data";
import ScrollableRowWrapper from "@/components/common/ScrollableRowWrapper";
import { IconLabelInfo } from "@/components/common/CardComp";

export default function NewsFeaturedFeed() {
  const { t: tScreen } = useTranslation("screen");

  return (
    <>
      <IconLabelInfo
        icon="eye"
        label={tScreen("newsSection.labels.featured_stories")}
        labelStyle={{ color: "var(--textOne" }}
        contStyle={{ marginTop: 10, marginBottom: 4, padding: "0 5px" }}
      />

      <ScrollableRowWrapper isReady={Boolean(newsData)}>
        {newsData?.map((obj, index) => (
          <NewsCard
            key={`news-${obj.id}-${index}`}
            newsInfo={obj}
            contClass="w-[18rem]  sm:w-[23rem] 2xl:w-[24rem]"
            imgContClass="h-[200px] sm:h-[170px] lg:h-[250px]"
          />
        ))}
      </ScrollableRowWrapper>
    </>
  );
}
