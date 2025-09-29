"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { RatingComp } from "@/components/common/RatingComp";
import { TopBgComp } from "@/components/TopComp";

import Image from "next/image";
import Pagination, { ShowingResults } from "@/components/common/Pagination";
import ReactSelectInput from "@/components/common/ReactSelectInput";
import { CardChip } from "@/components/common/CardComp";
import { iconMap } from "@/components/Footer";
import { getGames } from "@/lib/game_ops";
import { useAuth } from "@/context/AuthContext";
import { gameReviewData } from "@/constants/data";
import { useTranslation } from "react-i18next";
import Loading from "@/components/common/Loading";

function GalleryComp({ gameInfo }) {
  const { t: tCommon } = useTranslation("common");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const totalImages = gameInfo?.images?.length || 0;
  const totalPages = Math.max(1, Math.ceil(totalImages / pageSize));

  const paginatedImages = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return gameInfo?.images?.slice(start, start + pageSize) || [];
  }, [currentPage, gameInfo?.images]);

  return (
    <div className="flex flex-col gap-4 p-4 border border-[var(--borderThree)] gradient-one rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className="sm:text-lg lg:text-xl font-bold my-1">
          {tCommon("common_labels.gallery")}
        </h1>
        <ShowingResults
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalImages}
          label={tCommon("common_labels.images")}
        />
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {paginatedImages.map((obj, index) => (
          <div
            key={`${obj?.id}-${index}`}
            className="relative aspect-[16/9] w-full rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
          >
            {obj?.image_url && (
              <Image
                src={obj?.image_url}
                alt={`image-${index}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

function ReviewCard({ reviewInfo }) {
  return (
    <div className="flex flex-col rounded-lg border border-[var(--borderOne)] bg-[var(--bgOne)] p-3">
      <div className="flex gap-2 items-stretch group">
        <Image
          src={reviewInfo?.user?.avatar_url}
          alt={reviewInfo?.user?.name}
          width={48}
          height={48}
          className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-110 h-full"
        />
        <div className="flex flex-col gap-1 w-full text-[var(--textOne)]">
          <h1 className="sm:text-md lg:text-lg truncate font-bold">
            {reviewInfo?.user?.name}
          </h1>
          <p className="text-[14px] text-[var(--textTwo)] opacity-60">
            {reviewInfo?.date_time}
          </p>
        </div>
        <RatingComp avg_rating={reviewInfo?.rating} />
      </div>
      <p className="text-[14px] text-[var(--textTwo)] mt-1">
        {reviewInfo?.description}
      </p>
    </div>
  );
}

function ReviewsComp({ reviewData }) {
  const { t: tCommon } = useTranslation("common");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Number of reviews per page

  const totalReviews = reviewData?.reviews?.length || 0;
  const totalPages = Math.max(1, Math.ceil(totalReviews / pageSize));

  // Paginated reviews
  const paginatedReviews = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return reviewData?.reviews?.slice(start, start + pageSize) || [];
  }, [currentPage, reviewData?.reviews]);

  return (
    <div className="flex flex-col gap-4 p-4 border border-[var(--borderThree)] gradient-one rounded-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="sm:text-lg lg:text-xl font-bold my-1">
            {tCommon("common_labels.reviews")}
          </h1>
          <RatingComp
            avg_rating={reviewData?.average_rating}
            count={reviewData?.total_review}
            isBold={true}
          />
        </div>

        <button className="cursor-pointer w-full sm:w-fit px-6 py-2 rounded-[100px] bg-[var(--primary)] text-[var(--secondary)] font-bold transition duration-200 hover:shadow-[0_0_4px_var(--primary)]">
          {tCommon("common_labels.write_review")}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 flex-wrap">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto flex-wrap">
          <div className="w-full sm:w-[240px]">
            <ReactSelectInput
              value={""}
              onChange={() => {}}
              options={[
                { id: "", label: tCommon("filters.all"), value: "" },
                { label: "Positive", value: "positive" },
                { label: "Negative", value: "negative" },
              ]}
              placeholder={tCommon("filters.all")}
              isSecondary={true}
            />
          </div>

          <div className="w-full sm:w-[240px]">
            <ReactSelectInput
              value={""}
              onChange={() => {}}
              options={[
                { id: "", label: tCommon("filters.all"), value: "" },
                { label: "Popularity", value: "popularity" },
                { label: "Recent", value: "recent" },
              ]}
              placeholder={tCommon("filters.popularity")}
              isSecondary={true}
            />
          </div>
        </div>

        <ShowingResults
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalReviews}
          label={tCommon("common_labels.reviews")}
        />
      </div>

      {/* Review list */}
      <div className="flex flex-col gap-2 w-full">
        {paginatedReviews.map((reviewInfo) => (
          <ReviewCard key={reviewInfo?.id} reviewInfo={reviewInfo} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}

function InfoComp({ label, value, isPrimary = false }) {
  return (
    <div className="flex flex-col">
      <p className="text-lg text-[var(--textTwo)] uppercase">{label}</p>
      <div
        className={`text-lg  ${
          isPrimary
            ? "text-[var(--primary)]"
            : "text-[var(--textOne)] opacity-[90%]"
        }`}
      >
        {value ?? "__"}
      </div>
    </div>
  );
}

function RightSection({ gameInfo }) {
  const { t: tScreen } = useTranslation("screen");
  return (
    <div className="flex flex-col gap-4 p-4 border border-[var(--borderThree)] gradient-one rounded-xl w-full">
      <h1 className="sm:text-lg lg:text-xl font-bold my-1 w-full">
        {gameInfo?.title}
      </h1>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}
      >
        <InfoComp
          label={tScreen("game.labels.networks")}
          isPrimary={true}
          value={
            <div className="flex flex-wrap  gap-2 mt-1 w-full">
              {gameInfo?.networks?.map((network) => {
                return (
                  <CardChip
                    key={network?.id}
                    label={network?.name}
                    style={{
                      width: "fit-content",
                      minWidth: 90,
                      width: "auto",
                    }}
                  />
                );
              })}
            </div>
          }
        />

        {gameInfo?.platforms?.length > 0 && (
          <InfoComp
            label={tScreen("game.labels.platforms")}
            value={
              <div className="flex flex-wrap  gap-3 mt-1">
                {gameInfo?.platforms?.map((platformObj, index) => {
                  const Icon = iconMap[platformObj?.name];
                  return (
                    <a
                      key={`${platformObj?.id}-${index}`}
                      href={platformObj?.pivot?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full text-[var(--primary)] hover:text-[var(--textOne)] transition-all duration-500 ease-in-out"
                    >
                      {Icon && <Icon size={30} />}
                    </a>
                  );
                })}
              </div>
            }
          />
        )}
        {gameInfo?.socials?.length > 0 && (
          <InfoComp
            label={tScreen("game.labels.socials")}
            value={
              <div className="flex flex-wrap  gap-3 mt-1">
                {gameInfo?.socials?.map((socialObj, index) => {
                  const Icon = iconMap[socialObj?.name];
                  return (
                    <a
                      key={socialObj?.id}
                      href={socialObj?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full text-[var(--primary)] hover:text-[var(--textOne)] transition-all duration-500 ease-in-out"
                    >
                      {Icon && <Icon size={30} />}
                    </a>
                  );
                })}
              </div>
            }
          />
        )}
        {gameInfo?.genres?.length > 0 && (
          <InfoComp
            label={tScreen("game.labels.genres")}
            value={
              <div className="flex flex-wrap  gap-2 mt-1 w-full">
                {gameInfo?.genres?.map((genre) => {
                  return (
                    <CardChip
                      key={genre?.id}
                      label={genre?.name}
                      style={{
                        width: "fit-content",
                        minWidth: 90,
                        width: "auto",
                      }}
                    />
                  );
                })}
              </div>
            }
          />
        )}
        <InfoComp
          label={tScreen("game.labels.developer")}
          value={gameInfo?.developer}
        />
        <InfoComp
          label={tScreen("game.labels.publisher")}
          value={gameInfo?.publisher}
        />
        <InfoComp
          label={tScreen("game.labels.release_date")}
          value={gameInfo?.release_date}
        />
        <InfoComp
          label={tScreen("game.labels.age_rating")}
          value={gameInfo?.age_rating}
        />
        <InfoComp
          label={tScreen("game.labels.in_app_purchases")}
          value={gameInfo?.in_app_purchases}
        />
        <InfoComp
          label={tScreen("game.labels.size")}
          value={`~ ${gameInfo?.size ?? "-"}`}
        />
      </div>
    </div>
  );
}

function LeftSection({ gameInfo, reviewData }) {
  const { t: tCommon } = useTranslation("common");
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 p-4 border-1 border-[var(--borderThree)] gradient-one rounded-xl">
        <h1 className="sm:text-lg lg:text-xl font-bold my-1">
          {tCommon("common_labels.description")}
        </h1>
        <p className="text-[14px] text-[var(--textTwo)]">
          {gameInfo?.description}
        </p>
      </div>
      <GalleryComp gameInfo={gameInfo} />
      <ReviewsComp reviewData={reviewData} />
    </div>
  );
}

export default function GamePage() {
  const { gameId } = useParams();
  const { isAuthenticated } = useAuth();
  const [gameInfo, setGameInfo] = useState(null);
  const [reviewData] = useState(gameReviewData);
  const { t: tScreen } = useTranslation("screen");

  const [loading, setLoading] = useState(false);

  const fetchGames = (id) => {
    if (!id || !isAuthenticated) return;
    setLoading(true);
    getGames(id).then((res) => {
      setLoading(false);
      if (res?.success && res?.data) {
        setGameInfo(res.data);
      }
    });
  };

  useEffect(() => {
    if (gameId && isAuthenticated) {
      fetchGames(gameId);
    }
  }, [gameId, isAuthenticated]);

  const primaryImage = gameInfo?.images?.find(
    (img) => img?.is_primary
  )?.image_url;

  return (
    <>
      <Loading loading={loading} />
      <div className="flex flex-col gap-2 p-4">
        <TopBgComp
          content={{
            chip: [
              { label: gameInfo?.category, icon: "game", type: "primary" },
            ],
            title: gameInfo?.title,
            description: gameInfo?.tagline ?? gameInfo?.description,
            backgroundImage: primaryImage,
            button: [
              {
                label: tScreen("game.labels.download_game"),
                redirect: gameInfo?.download_link,
                type: "primary",
              },
              {
                label: tScreen("game.labels.view_website"),
                redirect: gameInfo?.website_link,
                type: "secondary",
              },
            ],
          }}
        >
          <RatingComp
            avg_rating={reviewData?.average_rating}
            count={reviewData?.total_review}
            isBold={true}
          />
        </TopBgComp>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Left Section */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <LeftSection gameInfo={gameInfo} reviewData={reviewData} />
          </div>

          {/* Right Section */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <RightSection gameInfo={gameInfo} reviewData={reviewData} />
          </div>
        </div>
      </div>
    </>
  );
}
