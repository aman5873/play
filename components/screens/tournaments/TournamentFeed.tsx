"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import moment from "moment";

import { Trophy, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { tournamentAnalytics } from "@/constants/data";
import Image from "next/image";
import ScrollableRowWrapper from "@/components/common/ScrollableRowWrapper";
import {
  CardChip,
  CardIconInfo,
  CategoryCardComp,
  SectionDetails,
  ProgressBar,
} from "@/components/common/CardComp";
import { ScreenDetailsComp } from "@/components/TopComp";
import { useAuth } from "@/context/AuthContext";
import { getTournaments, getFeaturedTournaments } from "@/lib/tournament_ops";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/context/LanguageContext";

export function FeaturedCardDetails({ tournamentInfo, availableSlots }) {
  const { t: tScreen } = useTranslation("screen");

  const now = moment();
  const startDate = moment(tournamentInfo?.deadline);
  let timeLeftLabel = "--";
  const categoryList =
    tournamentInfo?.categories.map((category: any) => category?.display_name) ??
    [];

  if (startDate.isValid()) {
    const diffInHours = startDate.diff(now, "hours", true);

    if (diffInHours >= 1) {
      const days = startDate.diff(now, "days");
      const hours = startDate.diff(now.clone().add(days, "days"), "hours");
      timeLeftLabel = `${days}d ${hours}h`;
    } else if (diffInHours > 0) {
      const minutes = startDate.diff(now, "minutes");
      const seconds = startDate.diff(
        now.clone().add(minutes, "minutes"),
        "seconds"
      );
      timeLeftLabel = `${String(minutes).padStart(2, "0")}m ${String(
        seconds
      ).padStart(2, "0")}s`;
    } else {
      timeLeftLabel = "00m 00s"; // already started/past
    }
  }
  return (
    <>
      <CategoryCardComp
        categories={categoryList}
        maxVisible={categoryList?.length}
      >
        <CardChip
          label={`${availableSlots ? `${availableSlots} slots` : ""}`}
        />
      </CategoryCardComp>
      <CardIconInfo
        list={[
          {
            icon: "trophy",
            label: tournamentInfo?.prize,
            description: tScreen("tournament.labels.prize_pool"),
            color: "var(--textThree)",
          },
          {
            icon: "clock",
            color: "var(--textFour)",
            label: timeLeftLabel,
            description: tScreen("tournament.labels.time_left"),
          },
          {
            icon: "users",
            color: "var(--textSix)",
            label: "--",
            description: tScreen("tournament.labels.players"),
          },

          {
            icon: "mission",
            color: "var(--textOne)",
            label: "--",
            description: tScreen("tournament.labels.difficulty"),
          },
        ]}
      />
    </>
  );
}

export function TournamentFeaturedCard({
  tournamentInfo,
  style = {},
  contClass = "",
}) {
  const { t: tScreen } = useTranslation("screen");
  const router = useRouter();
  const primaryImage = tournamentInfo?.images.find(
    (img: any) => img?.is_primary
  );
  const availableSlots = tournamentInfo?.teams_participated_count;

  return (
    <div
      className={`relative group w-full max-w-[1300px] lg:max-w-full mx-auto overflow-hidden rounded-xl mb-6 gradient-secondary border-[0.5px] border-[var(--primary)] p-4 flex-shrink-0 flex flex-col ${contClass}`}
      style={style}
    >
      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row-reverse gap-4 xl:gap-6 2xl:gap-8">
        {/* IMAGE */}
        {primaryImage?.image_url && (
          <div className="relative w-full lg:w-[55%] xl:w-[55%] 2xl:w-[60%]">
            <div className="relative w-full h-full aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={primaryImage?.image_url}
                alt={tournamentInfo?.name}
                fill
                className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-108"
              />
            </div>
          </div>
        )}

        {/* CONTENT */}
        <div className="flex flex-col gap-2 text-[var(--textOne)] mt-3 w-full lg:w-[45%] xl:w-[45%] 2xl:w-[40%]">
          <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-semibold truncate">
            {tournamentInfo?.game?.name}
          </h2>
          <h1 className="sm:text-lg md:text-xl lg:text-2xl 2xl:text-4xl font-bold truncate my-1">
            {tournamentInfo?.name}
          </h1>
          <p
            className="hidden 2xl:block 2xl:text-xl mt-2 text-[var(--textTwo)]"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {tournamentInfo?.tagline}
          </p>
          <p className="text-[14px] sm:text-sm md:text-base 2xl:text-lg mt-2 text-[var(--textTwo)]">
            {tScreen("tournament.labels.hosted_by_creators")}
          </p>
          <div className="flex flex-col gap-2 mt-auto">
            <FeaturedCardDetails
              tournamentInfo={tournamentInfo}
              availableSlots={availableSlots}
            />
            <button
              onClick={() => router.push(`/tournaments/${tournamentInfo?.id}`)}
              className="px-4 py-2  2xl-mt-5 flex w-full items-center justify-center rounded-full border border-[var(--primary)] cursor-pointer text-sm sm:text-base font-rajdhani font-bold transition-all hover:scale-[1.02] hover:opacity-95 duration-300 shadow-md bg-[var(--primary)] text-[var(--secondary)]"
            >
              {tScreen("tournament.labels.view_tournament")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TournamentCard(props: any) {
  const {
    tournamentInfo,
    style = {},
    contClass = "w-[18rem] sm:w-[20rem] lg:w-[23.65rem]",
  } = props;
  const router = useRouter();
  const primaryImage = tournamentInfo?.images.find(
    (img: any) => img?.is_primary
  );
  const { t: tScreen } = useTranslation("screen");

  const availableSlots = tournamentInfo?.teams_participated_count ?? 10;
  const categoryList =
    tournamentInfo?.categories.map((category: any) => category?.display_name) ??
    [];

  if (tournamentInfo)
    return (
      <div
        className={`gradient-one   border border-[var(--borderThree)]  p-4 flex-shrink-0 overflow-hidden rounded-xl flex flex-col ${contClass}`}
        style={{
          ...style,
        }}
      >
        <div className={`flex flex-col gap-4`}>
          {primaryImage?.image_url && (
            <div
              className={`relative overflow-hidden rounded-lg group  w-full h-[170px] sm:h-[150px] lg:h-[197px]`}
            >
              <Image
                src={primaryImage?.image_url}
                alt={tournamentInfo?.name}
                fill
                className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
          )}

          <div
            className={`flex flex-col gap-2 text-[var(--textOne)] mt-3  w-full`}
          >
            <h2 className="text-md font-semibold truncate">
              {tournamentInfo?.game?.title}
            </h2>
            <h1 className="sm:text-lg md:text-xl lg:text-2xl font-bold truncate my-1">
              {tournamentInfo?.name}
            </h1>
            <p className="text-[14px] mt-2 text-[var(--textTwo)]">
              {tScreen("tournament.labels.hosted_by_creators")}
            </p>

            <CategoryCardComp categories={categoryList} />
            <ProgressBar
              label={tScreen("tournament.labels.slots")}
              count={availableSlots}
              maxCount={tournamentInfo?.max_teams}
            />
            <div className="flex justify-between">
              {tournamentInfo?.start_date && (
                <div className="flex items-center gap-2 text-[var(--textTwo)]">
                  <Calendar className="w-4 h-4" />
                  <span>{tournamentInfo.start_date}</span>
                </div>
              )}
              {tournamentInfo?.prize && (
                <div className="flex items-center gap-2 text-[var(--textTwo)]">
                  <Trophy className="w-4 h-4" />
                  <span>
                    {tournamentInfo?.currency === "USD" ? "$ " : ""}
                    {tournamentInfo.prize}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => router.push(`/tournaments/${tournamentInfo?.id}`)}
              className="px-4 py-2 flex items-center justify-center rounded-full border border-[var(--primary)] cursor-pointer text-sm sm:text-base font-rajdhani font-bold transition-all hover:scale-[1.02] hover:opacity-95 duration-300 shadow-md bg-[var(--primary)] text-[var(--secondary)]"
            >
              {tScreen("tournament.labels.view_tournament")}
            </button>
          </div>
        </div>
      </div>
    );
}

export function TournamentFeaturedFeed() {
  const { isAuthenticated, setLoading } = useAuth();
  const { lang } = useLanguage();
  const [featuredTournaments, setFeaturedTournaments] = useState([]);

  const initialMount = useRef(true);

  const fetchTournaments = async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      const res = await getFeaturedTournaments();
      if (res?.success && Array.isArray(res?.data)) {
        setFeaturedTournaments(res.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch only once on mount, and again on language change
    if (initialMount.current) {
      initialMount.current = false;
      fetchTournaments();
    } else {
      fetchTournaments();
    }
  }, [lang, isAuthenticated]);

  if (!featuredTournaments?.length) return null;

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      className="featured-carousel relative mb-10"
      pagination={{
        clickable: true,
        renderBullet: (_, className) =>
          `<span class="${className} custom-bullet"></span>`,
      }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      speed={1200}
      spaceBetween={30}
      centeredSlides
      slidesPerView={1}
    >
      {featuredTournaments.map((obj: any) => (
        <SwiperSlide key={obj.id} className="w-full">
          <TournamentFeaturedCard tournamentInfo={obj} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default function TournamentFeed({ onlyFeed = false }) {
  const { isAuthenticated, setLoading } = useAuth();
  const [tournamentData, setTournamentData] = useState(null);
  const { t: tCommon } = useTranslation("common");
  const { t: tScreen } = useTranslation("screen");
  const { lang } = useLanguage();

  const initialMount = useRef(true);

  function fetchTournaments(param?: any) {
    if (isAuthenticated) {
      setLoading(true);
      getTournaments(param).then((res: any) => {
        setLoading(false);
        if (res?.success && res?.data) setTournamentData(res.data);
      });
    }
  }

  useEffect(() => {
    // On first mount, prevent duplicate fetch
    if (initialMount.current) {
      initialMount.current = false;
      fetchTournaments();
    } else {
      // On subsequent lang changes, always fetch
      fetchTournaments();
    }
  }, [isAuthenticated, lang]);

  return (
    <>
      {onlyFeed ? (
        <ScrollableRowWrapper isReady={Boolean(tournamentData?.data?.length)}>
          {tournamentData?.data.map((obj: any) => (
            <TournamentCard key={obj?.id} tournamentInfo={obj} />
          ))}
        </ScrollableRowWrapper>
      ) : (
        <div className="relative px-1 py-5 pb-20">
          <TournamentFeaturedFeed />

          <ScrollableRowWrapper isReady={Boolean(tournamentData?.data)}>
            {tournamentData?.data.map((obj: any) => (
              <TournamentCard key={obj?.id} tournamentInfo={obj} />
            ))}
          </ScrollableRowWrapper>

          <div className="flex justify-center items-center mb-5 mt-4 w-full">
            <Link
              href="/tournaments"
              className=" px-5 py-2 border rounded-[50px] border-[var(--primary)] text-[var(--primary)] hover:text-[var(--textOne)] hover:border-[var(--textOne)]   text-sm md:text-base transition-colors duration-300 cursor-pointer text-sm md:text-base transition-colors duration-300"
            >
              {tCommon("common_labels.view_all")}
            </Link>
          </div>

          <div className="flex w-full justify-center">
            <SectionDetails
              list={[
                {
                  label: tournamentAnalytics?.active_tournaments,
                  description: tScreen("tournament.labels.active_tournaments"),
                  color: "var(--primary)",
                },
                {
                  label: tournamentAnalytics?.total_prize_pool,
                  description: tScreen("tournament.labels.total_prize_pool"),
                  color: "var(--textFour)",
                },
                {
                  label: tournamentAnalytics?.total_earned,
                  description: tScreen("tournament.labels.total_earned"),
                  color: "var(--textFive)",
                },
              ]}
            />
          </div>
        </div>
      )}
    </>
  );
}

export function TournamentFeedComp() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <div>
      <div className=" w-full rounded-lg  p-4 sm:p-8 lg:p-8 flex flex-col items-center gap-4">
        <ScreenDetailsComp
          content={{
            chip: [
              {
                label: tScreen("tournament.chip"),
                icon: "trophy",
                type: "primary",
              },
            ],
            title: tScreen("tournament.title"),
            highlightTitle: tScreen("tournament.highlightTitle"),
            description: tScreen("tournament.description"),
          }}
          isCentered={true}
        />
      </div>
      <TournamentFeed />
    </div>
  );
}
