"use client";
import getSymbolFromCurrency from "currency-symbol-map";

import Pagination, { ShowingResults } from "@/components/common/Pagination";
import ReactSelectInput from "@/components/common/ReactSelectInput";
import SearchInput from "@/components/common/Searchinput";
import { assetsData } from "@/constants/data";
import { getGames } from "@/lib/game_ops";
import { ArrowDownToLine } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { StarIcon } from "@/app/icons";
import { AppButton } from "@/components/TopComp";
import Loading from "@/components/common/Loading";

function AssetCard({ assetInfo, contClass = "" }) {
  const { t: tScreen } = useTranslation("screen");

  const primaryImage = assetInfo?.images.find((img: any) => img?.is_primary);
  const currencySymbol = getSymbolFromCurrency(assetInfo?.amount.currency);

  return (
    <div
      className={`gradient-one   border border-[var(--borderThree)]  p-4 flex-shrink-0 overflow-hidden rounded-xl flex flex-col ${contClass}`}
    >
      <div className={`flex flex-col gap-4`}>
        {primaryImage?.image_url && (
          <div
            className={`relative overflow-hidden rounded-lg group  w-full h-[170px] sm:h-[150px] lg:h-[197px]`}
          >
            <Image
              src={primaryImage?.image_url}
              alt={assetInfo?.title}
              fill
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              {assetInfo?.category?.label && (
                <div className="bg-[var(--primary)] text-[var(--secondary)] text-md font-semibold truncate w-fit px-3 py-1.5 rounded-3xl">
                  <span>{assetInfo?.category?.label}</span>
                </div>
              )}
              {assetInfo?.level && (
                <div className="flex gap-1 gradient-five text-[var(--textOne)] text-md font-semibold truncate w-fit px-3 py-1.5 rounded-3xl">
                  {tScreen("assets.labels.level")}
                  <span>{assetInfo?.level}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className={`flex flex-col gap-2 text-[var(--textOne)] w-full`}>
          <div className="flex justify-between">
            <h2 className="text-md font-semibold truncate w-fit px-3 py-1.5 rounded-3xl border-1 border-[var(--primary)] text-[var(--primary)]">
              {assetInfo?.game?.title}
            </h2>
            <h1 className="sm:text-lg text-md font-semibold text-[var(--primary)] truncate ">
              {currencySymbol} {assetInfo?.amount.value}
            </h1>
          </div>
          <h2 className="text-md sm:text-lg font-semibold truncate text-[var(--primary)]">
            {assetInfo?.title}
          </h2>
          <p className="text-base  text-[var(--textOne)]">
            {tScreen("assets.labels.by")} {assetInfo?.created_by}
          </p>
          <p className="text-base text-[var(--textTwo)]">
            {assetInfo?.description}
          </p>

          <div className="flex justify-between">
            <div className="flex gap-4">
              {assetInfo?.avg_rating && (
                <div className="flex items-center gap-1 text-[var(--textTwo)] font-semibold">
                  <StarIcon
                    className="w-4 h-4 text-[var(--textYellow)]"
                    fill="var(--textYellow)"
                    stroke="none"
                  />
                  <span className="text-[var(--textOne)]">
                    {assetInfo.avg_rating}
                  </span>
                </div>
              )}
              {assetInfo?.download_count && (
                <div className="flex items-center gap-1 text-[var(--textSix)] font-semibold">
                  <ArrowDownToLine className="w-4 h-4" />
                  <span>{assetInfo?.download_count}</span>
                </div>
              )}
            </div>
            <h2 className="gradient-five text-md font-semibold truncate w-fit px-3 py-1.5 rounded-3xl  text-[var(--textOne)]">
              {assetInfo?.rank}
            </h2>
          </div>
          <div className="flex gap-4 mt-2">
            <AppButton
              type="secondary"
              label={tScreen("assets.labels.preview")}
              onClick={() => {}}
              style={{ flex: 1, gap: 5 }}
              icon="eye"
            />
            <AppButton
              type="primary"
              label={tScreen("assets.labels.buyNow")}
              onClick={() => {}}
              style={{ flex: 1, gap: 5 }}
              icon="cart"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AssetsFeed() {
  const [loading, setLoading] = useState(false);
  const { t: tCommon } = useTranslation("common");
  const { t: tScreen } = useTranslation("screen");

  // Filters
  const [headerSearchValue, setHeaderSearchValue] = useState("");
  const [selectedRank, setSelectedRank] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameList, setGameList] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // --- Fetch game list ---
  const fetchGames = async (param: any) => {
    setLoading(true);
    try {
      const res = await getGames(param);
      if (res?.success && res?.data) {
        setGameList([
          { title: tScreen("assets.labels.allGames"), id: "" }, // 👈 prepend "All" option
          ...res.data,
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  // --- Rank options (memoized) ---
  const rankOptions = useMemo(() => {
    const uniqueRanks = [
      ...new Set(assetsData.map((s) => s.rank).filter(Boolean)),
    ];
    return [
      { value: "", label: tScreen("assets.labels.allRank") },
      ...uniqueRanks.map((r) => ({ value: r, label: r })),
    ];
  }, [tCommon]);

  // --- Filtered Assets ---
  const filteredAssets = useMemo(() => {
    const search = headerSearchValue?.toLowerCase() || "";

    return assetsData.filter((item) => {
      const matchesSearch =
        !search ||
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        item.category.label.toLowerCase().includes(search);

      const matchesRank =
        !selectedRank ||
        selectedRank.value === "" ||
        item.rank === selectedRank.label;

      // --- Game filter ---
      const matchesGame =
        !selectedGame || // nothing selected
        selectedGame.id === "" || // "All" option
        item.game.id === selectedGame.id; // match selected game

      return matchesSearch && matchesRank && matchesGame;
    });
  }, [assetsData, headerSearchValue, selectedRank, selectedGame]);

  // --- Pagination logic ---
  const totalItems = filteredAssets.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const paginatedAssets = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAssets.slice(start, start + pageSize);
  }, [filteredAssets, currentPage, pageSize]);

  // --- Reset current page if needed ---
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages]);

  // --- Initial loading + fetch games ---
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    fetchGames({ dropdown: 1 });
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loading loading={loading} />
      <div className="mx-auto py-10 w-full">
        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          {/* Game Filter */}
          <div className="flex-1 min-w-[170px] sm:max-w-[260px] sm:w-auto">
            <SearchInput
              value={headerSearchValue}
              onChange={setHeaderSearchValue} // Will trigger after debounce
              placeholder={tScreen("assets.labels.searchAssets")}
            />
          </div>
          <div className="flex-1 min-w-[170px] sm:max-w-[260px] sm:w-auto">
            <ReactSelectInput
              value={selectedGame}
              onChange={setSelectedGame}
              options={gameList}
              getOptionLabel={(opt: any) => opt.title}
              getOptionValue={(opt: any) => opt}
              placeholder={tScreen("assets.labels.game")}
            />
          </div>

          {/* Rank Filter */}
          <div className="flex-1 min-w-[170px] sm:max-w-[260px] sm:w-auto">
            <ReactSelectInput
              value={selectedRank}
              onChange={setSelectedRank}
              options={rankOptions}
              placeholder={tScreen("assets.labels.rank")}
            />
          </div>

          {/* Showing Results */}
          <ShowingResults
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            className="ml-auto"
            label={tScreen("assets.labels.assets")}
          />
        </div>

        {/* Asset Cards */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
          {paginatedAssets.map((obj, index) => (
            <AssetCard
              key={`asset-${obj.id}-${index}`}
              assetInfo={obj}
              contClass="w-full 
            [@media(min-width:460px)_and_(max-width:619px)]:w-[90%] [@media(min-width:620px)]:w-[23.65rem]
            "
            />
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
    </>
  );
}
