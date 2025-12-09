"use client";
import React, { useMemo } from "react";
import homeThumbnail from "@/public/images/home/homePlay.png";

import { useTranslation } from "react-i18next";
import { FullCenterDimensionDiv } from "./FullCenterDimensionDiv";
import Image from "next/image";
import { ButtonComp, iconMap, ScreenDetailsComp } from "./TopComp";

const TopComp = ({ content, contClass = "", width, height }) => {
  const contSize = useMemo(() => {
    const aspect = width / height;
    return aspect >= 3
      ? width * 0.4
      : aspect >= 2
      ? width * 0.35
      : Math.min(width, height);
  }, [width, height]);
  // normal screens

  if (!content) return null;

  return (
    <div
      className={`relative w-full 
      mx-auto rounded-lg gradient-primary 
      p-6 sm:p-8 lg:p-10 xl:px-12 2xl:px-20
      flex flex-col-reverse lg:flex-row items-center 
      gap-6 lg:gap-9 xl:gap-16 2xl:gap-20 ${contClass || ""}`}
    >
      {/* Text Section */}
      <div
        className="flex flex-[1] flex-col gap-3 text-center lg:text-left items-center lg:items-start  
      w-full xl:max-w-[50%] 2xl:max-w-[55%]"
        style={{
          width: width >= 1024 ? `${contSize / 1.6}px` : "100%",
        }}
      >
        <ScreenDetailsComp content={content} chipContClass="lg:justify-start" />

        <div
          className="grid grid-cols-3 gap-6 sm:gap-10 mt-6 sm:mt-8"
          style={{
            maxWidth: "95%",
          }}
        >
          {content?.details?.map((item, idx) => {
            const Icon = item.icon ? iconMap[item.icon] : null;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center gap-3 p-2"
              >
                {Icon && (
                  <div className="rounded-xl bg-[var(--bgTwo)] border border-[var(--borderTwo)] p-4 xl:p-5">
                    <Icon className="w-6 h-6 xl:w-7 xl:h-7 text-[var(--primary)]" />
                  </div>
                )}
                <h3 className="text-lg xl:text-xl 2xl:text-2xl font-bold">
                  {item.label}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base lg:text-md  xl:text-lg 2xl:text-xl">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <ButtonComp buttons={content?.button} />
      </div>

      {/* Image Section */}
      {content?.thumbnail && (
        <div
          className="flex flex-[1] justify-center xl:justify-end w-full xl:max-w-[50%] 2xl:max-w-[45%]"
          style={{
            width: width >= 1024 ? `${contSize / 0.9}px` : "90%",
          }}
        >
          {width >= 1024 ? (
            // 🔹 Large screens: aspect-square + padding frame
            <div
              className="
          relative aspect-square w-full 
          flex items-center justify-center 
          rounded-[36px] 
         
        "
              style={{ minWidth: "280px", minHeight: "280px" }}
            >
              <div
                className="relative w-full h-full rounded-[30px] overflow-hidden  
            "
              >
                <Image
                  src={content.thumbnail}
                  alt="thumbnail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          ) : (
            // 🔹 Small screens: full width image + padding frame
            <div
              className="
          w-full 
        "
            >
              <div
                className="w-full rounded-[20px] overflow-hidden
          rounded-[24px]"
              >
                <Image
                  src={content.thumbnail}
                  alt="thumbnail"
                  width={1200}
                  height={800}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function HomeScreenTopComp() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <FullCenterDimensionDiv style={{ height: "100%", width: "100%" }}>
      {(props: any) => {
        return (
          <TopComp
            {...props}
            content={{
              chip: [
                {
                  label: tScreen("home.chip"),
                  type: "primary-gradient",
                },
              ],
              title: tScreen("home.title"),
              highlightTitle: tScreen("home.highlightTitle"),
              description: tScreen("home.description"),
              details: [
                {
                  icon: "users",
                  label: "50K+",
                  description: tScreen("home.activePlayers"),
                },
                {
                  icon: "trophy",
                  label: "$2.5M+",
                  description: tScreen("home.prizePool"),
                },
                {
                  icon: "medal",
                  label: "150+",
                  description: tScreen("home.tournaments"),
                },
              ],

              thumbnail: homeThumbnail,
              button: [
                {
                  icon: "play",
                  label: tScreen("home.buttonPrimary"),
                  redirect: "/",
                  type: "primary",
                },
                {
                  icon: "trophy",
                  label: tScreen("home.buttonSecondary"),
                  redirect: "/tournaments",
                  type: "secondary",
                },
              ],
            }}
          />
        );
      }}
    </FullCenterDimensionDiv>
  );
}
