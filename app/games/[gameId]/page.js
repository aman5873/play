"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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

function GalleryComp({ gameInfo }) {
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
        <h1 className="sm:text-lg lg:text-xl font-bold my-1">Gallery</h1>
        <ShowingResults
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalImages}
          label="images"
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
    <div className="flex flex-col gap-2 p-4 border border-[var(--borderThree)] gradient-one rounded-xl">
      <div className="flex justify-between">
        <div>
          <h1 className="sm:text-lg lg:text-xl font-bold my-1">Reviews</h1>
          <RatingComp
            avg_rating={reviewData?.average_rating}
            count={reviewData?.total_review}
            isBold={true}
          />
        </div>
        <button className="cursor-pointer w-fit px-6 py-2 mt-3 rounded-[100px] bg-[var(--primary)] text-[var(--secondary)] font-bold transition duration-200 hover:shadow-[0_0_4px_var(--primary)]">
          Write a review
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
        <div className="flex gap-4">
          <div className="w-max[260px] lg:w-[256px]">
            <ReactSelectInput
              value={""}
              onChange={() => {}}
              options={[
                { label: "All", value: "" },
                { label: "Positive", value: "positive" },
                { label: "Negative", value: "negative" },
              ]}
              placeholder={"All"}
              isSecondary={true}
            />
          </div>
          <div className="w-max[260px] lg:w-[256px]">
            <ReactSelectInput
              value={""}
              onChange={() => {}}
              options={[
                { label: "Popularity", value: "popularity" },
                { label: "Recent", value: "recent" },
              ]}
              placeholder={"Popularity"}
              isSecondary={true}
            />
          </div>
        </div>
        <ShowingResults
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalReviews}
          label="reviews"
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
  return (
    <div className="flex flex-col gap-4 p-4 border border-[var(--borderThree)] gradient-one rounded-xl w-fit">
      <h1 className="sm:text-lg lg:text-xl font-bold my-1 w-full">
        {gameInfo?.title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
        <InfoComp
          label="Networks"
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

        <InfoComp
          label="Platforms"
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
        <InfoComp
          label="Socials"
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
        <InfoComp
          label="Genres"
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
        <InfoComp label="Developer" value={gameInfo?.developer} />
        <InfoComp label="Publisher" value={gameInfo?.publisher} />
        <InfoComp label="Release Date" value={gameInfo?.release_date} />
        <InfoComp label="Age Rating" value={gameInfo?.age_rating} />
        <InfoComp label="In-App Purchases" value={gameInfo?.in_app_purchases} />
        <InfoComp label="Size" value={`~ ${gameInfo?.size ?? "-"}`} />
      </div>
    </div>
  );
}

function LeftSection({ gameInfo, reviewData }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2 p-4 border-1 border-[var(--borderThree)] gradient-one rounded-xl">
        <h1 className="sm:text-lg lg:text-xl font-bold my-1">Description</h1>
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
  const { isAuthenticated, setLoading } = useAuth();
  const [gameInfo, setGameInfo] = useState(null);
  const [reviewData] = useState(gameReviewData);

  const fetchGames = useCallback(
    (id) => {
      if (!id) return;
      setLoading(true);
      getGames(id).then((res) => {
        setLoading(false);
        if (res?.success && res?.data) {
          setGameInfo(res.data);
        }
      });
    },
    [isAuthenticated]
  );

  useEffect(() => {
    fetchGames(gameId);
  }, [gameId]);

  const primaryImage = gameInfo?.images?.find(
    (img) => img?.is_primary
  )?.image_url;

  return (
    <div className="flex flex-col gap-2 p-4">
      <TopBgComp
        content={{
          chip: [{ label: gameInfo?.category, icon: "game", type: "primary" }],
          title: gameInfo?.title,
          description: gameInfo?.tagline ?? gameInfo?.description,
          backgroundImage: primaryImage,
          button: [
            {
              label: " Download game",
              redirect: gameInfo?.download_link,
              type: "primary",
            },
            {
              label: "View Website",
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

      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Left Section - covers remaining space */}
        <div className="flex-1 flex flex-col gap-4">
          <LeftSection gameInfo={gameInfo} reviewData={reviewData} />
        </div>

        {/* Right Section - fixed max width */}
        <div className="w-fit flex flex-col gap-4">
          <RightSection gameInfo={gameInfo} reviewData={reviewData} />
        </div>
      </div>
    </div>
  );
}
