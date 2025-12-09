"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import Pagination, { ShowingResults } from "@/components/common/Pagination";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { CardChip } from "@/components/common/CardComp";
import { AppButton, iconMap } from "@/components/TopComp";
import { FullCenterDimensionDiv } from "@/components/FullCenterDimensionDiv";
import { getGameStatuses, getMyGames } from "@/lib/game_ops";
import AppModal from "@/components/AppModal";
import GameForm from "./GameForm";

import { encodeUUID } from "@/lib/system";
import { useRouter } from "next/navigation";

const Buttons = ({ contClass = "flex-col ", gameInfo }) => {
  const { t: tScreen } = useTranslation("screen");
  const [openGameForm, setOpenGameForm] = useState(false);
  const router = useRouter();
  const encryptedGameId = encodeUUID(gameInfo?.id);
  return (
    <>
      <AppModal
        showCloseIcon={true}
        open={openGameForm}
        onClose={() => setOpenGameForm(false)}
        contClass="w-[95%] sm:w-md max-w-lg"
      >
        <GameForm type={"update"} initGameData={gameInfo} />
      </AppModal>
      <div className={`flex   gap-2  ${contClass}`}>
        <AppButton
          onClick={() => router.push(`/games/my-games/${encryptedGameId}`)}
          type="primary"
          label={tScreen("myGame.labels.viewDetails")}
          Icon={iconMap["eye"]}
          style={{ height: "fit-content", width: 163 }}
        />
        <AppButton
          onClick={() => router.push(`/games/update/${encryptedGameId}`)}
          type="primary"
          label={tScreen("myGame.labels.edit")}
          Icon={iconMap["edit"]}
          style={{ height: "fit-content", width: 163 }}
        />
      </div>
    </>
  );
};

function GameCard({ gameInfo, width, height }) {
  const { t: tScreen } = useTranslation("screen");
  const primaryImage = gameInfo?.images?.find((img) => img?.is_primary);

  const status = {
    Approved: {
      label: tScreen("myGame.labels.approved"),
      bg: "var(--textThree)",
      color: "var(--secondary)",
    },
    Pending: {
      label: tScreen("myGame.labels.pending"),
      bg: "var(--bgYellow)",
      color: "var(--textOne)",
    },
    "Approval Required": {
      label: tScreen("myGame.labels.pending"),
      bg: "var(--bgYellow)",
      color: "var(--textOne)",
    },
    pending_review: {
      label: tScreen("myGame.labels.pending"),
      bg: "var(--bgYellow)",
      color: "var(--textOne)",
    },
    "Under Review": {
      label: tScreen("myGame.labels.underReview"),
      bg: "var(--textSix)",
      color: "var(--secondary)",
    },
    Rejected: {
      label: tScreen("myGame.labels.rejected"),
      bg: "var(--bgFour)",
      color: "var(--textOne)",
    },
  };

  const Info = ({ contClass = "flex-col" }) => (
    <div
      className={`flex  justify-between sm:justify-start gap-4  min-w-[100px] ${contClass}`}
    >
      <div className="text-center sm:text-left">
        <span className="text-[var(--textTwo)] text-sm block">
          Submitted Date
        </span>
        <span className="font-semibold text-[var(--textOne)] text-sm">
          {gameInfo?.submitted_date ?? "N/A"}
        </span>
      </div>
      <div className="text-center sm:text-left">
        <span className="text-[var(--textTwo)] text-sm block">
          Approval Date
        </span>
        <span className="font-semibold text-[var(--textOne)] text-sm">
          {gameInfo?.approve_date ?? "N/A"}
        </span>
      </div>
    </div>
  );

  const InfoSection = ({ contClass = "" }) => (
    <div className={`flex flex-col flex-1   min-w-[250px] ${contClass}`}>
      <div className="flex flex-wrap gap-2 mb-2">
        {gameInfo?.genres?.map((genre) => {
          return (
            <CardChip
              key={genre?.id}
              label={genre?.name}
              borderColor="var(--primary)"
              color="var(--primary)"
              bg="var(--secondary)"
              style={{
                minWidth: 90,
                width: "auto",
              }}
            />
          );
        })}

        <CardChip
          label={
            status[gameInfo?.status?.translations?.literals?.en?.name]?.label
          }
          contClass="font-semibold"
          style={{
            background:
              status[gameInfo?.status?.translations?.literals?.en?.name]?.bg,
            color:
              status[gameInfo?.status?.translations?.literals?.en?.name]?.color,
          }}
        />
      </div>
      <h2 className="text-lg sm:text-xl font-bold text-[var(--textOne)] truncate">
        {gameInfo?.title}
      </h2>
      <p
        className="text-sm text-[var(--textTwo)] mt-1"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {gameInfo?.description}
      </p>
      <Info contClass="hidden sm:flex mt-auto" />
    </div>
  );
  const Remarks = ({ contClass = "max-w-[200px]" }) => {
    return (
      <>
        {gameInfo?.rejection_remarks && (
          <div
            className={`flex flex-col gap-1 p-2 rounded-lg  h-fit border border-[var(--borderFour)]  text-[var(--textOne)] text-sm  ${contClass}`}
            style={{ background: "#FF5A271A" }}
          >
            <span className="text-[var(--textFour)] font-semibold">
              Rejection Reason:
            </span>
            {gameInfo?.rejection_remarks}
          </div>
        )}
      </>
    );
  };
  const ImageSection = () => (
    <div className="relative flex-shrink-0 w-full sm:w-[25%] 2xl:w-[20%] h-[200px] sm:h-[210px] 2xl:h-[220px] overflow-hidden rounded-lg group">
      {primaryImage?.image_url ? (
        <Image
          src={primaryImage.image_url}
          alt={gameInfo?.title}
          fill
          className="object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
          sizes="100vw"
          priority
        />
      ) : (
        <div className="w-full h-full bg-[var(--bgTwo)] flex items-center justify-center text-[var(--textTwo)] text-sm">
          No Image
        </div>
      )}
    </div>
  );

  return (
    <div className="gradient-one border border-[var(--borderThree)] rounded-[16px] p-2 sm:p-3  flex flex-col gap-4  w-full overflow-hidden">
      <div className="flex  gap-4">
        <ImageSection />
        <InfoSection />
        {/* <Info contClass="flex sm:hidden md:flex" /> */}
        <Remarks contClass="hidden xl:flex max-w-[200px]" />
        <Buttons contClass="hidden xl:flex xl:flex-col" gameInfo={gameInfo} />
      </div>
      <InfoSection contClass="flex sm:hidden" />
      <Remarks contClass="flex sm:hidden" />
      <div className="flex xl:hidden  items-center   gap-4">
        <Remarks contClass="hidden sm:flex" />
        <Buttons contClass="sm:ml-auto justify-center " gameInfo={gameInfo} />
      </div>
    </div>
  );
}

function MyGamesTab({ activeTab, setActiveTab, gameData, statusList }) {
  const { t: tScreen } = useTranslation("screen");

  const LabelComp = ({ label, count }) => (
    <div className="w-fit flex gap-2">
      {label}
      {count && (
        <span className="bg-[var(--borderTwo)] text-[var(--textOne)] text-sm rounded-full w-6 h-6 p-2 flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );

  const gameTabs = [
    {
      key: "all",
      label: (
        <LabelComp
          label={tScreen("myGame.labels.allGames")}
          count={gameData?.count?.all}
        />
      ),
    },
    {
      key: "approved",
      label: (
        <LabelComp
          label={tScreen("myGame.labels.approved")}
          count={gameData?.count?.approved}
        />
      ),
    },
    {
      key: "pending",
      label: (
        <LabelComp
          label={tScreen("myGame.labels.pending")}
          count={gameData?.count?.pending}
        />
      ),
    },
    {
      key: "under_review",
      label: (
        <LabelComp
          label={tScreen("myGame.labels.underReview")}
          count={gameData?.count?.under_review}
        />
      ),
    },
    {
      key: "rejected",
      label: (
        <LabelComp
          label={tScreen("myGame.labels.rejected")}
          count={gameData?.count?.rejected}
        />
      ),
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
        "
      >
        {statusList.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              cursor-pointer flex-shrink-0 px-4 py-2  w-fit
              font-medium font-semibold rounded-3xl 
              transition-colors transition-transform duration-300 ease-in-out
              ${
                activeTab === tab.id
                  ? "bg-[var(--primary)] text-[var(--secondary)] shadow-md scale-105"
                  : "bg-[var(--bgOne)] border border-[var(--borderOne)] text-[var(--textOne)] text-[var(--textTwo)] hover:text-[var(--textOne)]"
              }
            `}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
}
export default function MyGamePageFeed() {
  const { headerSearchValue, isAuthenticated } = useAuth();
  const { t: tScreen } = useTranslation("screen");
  const { t: tCommon } = useTranslation("common");
  const { lang } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [gameData, setGameData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [statusList, setStatusList] = useState<any[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Prevent duplicate calls due to React.StrictMode (dev-only double mount)
  const isFetchingFilters = useRef(false);
  const isFetchingGames = useRef(false);

  // Fetch filters (statuses & genres)
  useEffect(() => {
    if (!isAuthenticated || isFetchingFilters.current) return;
    isFetchingFilters.current = true;

    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        if (!mounted) return;
      } catch (err) {
        console.error("Error fetching filters:", err);
      } finally {
        if (mounted) setLoading(false);
        isFetchingFilters.current = false;
      }
    })();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated, lang]);

  // Fetch games whenever filters, search, pagination, or language changes
  const fetchGames = async () => {
    if (!isAuthenticated || isFetchingGames.current) return;
    isFetchingGames.current = true;

    const params: Record<string, any> = {
      page: currentPage,
      per_page: pageSize,
    };

    if (headerSearchValue?.trim()) params.search = headerSearchValue.trim();
    if (activeTab !== "all") {
      params.status_id = activeTab;
      params.page = 1;
    }

    setLoading(true);
    try {
      // const res: any = myGamesData;
      const res: any = await getMyGames(params);
      if (res?.success && res?.data) setGameData(res.data);
    } catch (err) {
      console.error("Error fetching games:", err);
    } finally {
      setLoading(false);
      isFetchingGames.current = false;
    }
  };

  useEffect(() => {
    fetchGames();
  }, [
    isAuthenticated,
    currentPage,
    pageSize,
    headerSearchValue,
    lang,
    activeTab,
  ]);

  useEffect(() => {
    let didRun = false;
    const init = async () => {
      if (didRun) return; // ensures it runs only once even in StrictMode
      didRun = true;

      try {
        const [statusRes] = await Promise.all([getGameStatuses()]);
        if (statusRes?.success && statusRes?.data) {
          const filteredList = statusRes?.data.filter((obj) => {
            const name = obj?.translations?.literals?.en?.name;
            return ["Approved", "Pending", "Under Review", "Rejected"].includes(
              name
            );
          });
          setStatusList([
            { id: "all", name: tScreen("myGame.labels.allGames") },
            ...filteredList,
          ]);
        }
      } catch (err) {
        console.error("Failed to load game statuses:", err);
      }
    };

    init();
  }, []);

  return (
    <div className="mx-auto py-10 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex-1 min-w-[170px] max-w-[260px] sm:w-auto">
          <MyGamesTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            gameData={gameData}
            statusList={statusList}
          />
        </div>
        <ShowingResults
          currentPage={gameData?.current_page || 1}
          pageSize={gameData?.per_page || pageSize}
          totalItems={gameData?.total || 0}
          className="ml-auto mt-2 sm:mt-0"
          label={tCommon("games")}
        />
      </div>

      {/* Game Cards */}

      <div className="flex flex-wrap justify-center sm:justify-start gap-4">
        {gameData?.data?.length > 0 ? (
          gameData.data.map((game: any) => (
            <FullCenterDimensionDiv
              key={game.id}
              style={{ height: "100%", width: "100%" }}
            >
              {(props) => {
                return <GameCard gameInfo={game} {...props} />;
              }}
            </FullCenterDimensionDiv>
          ))
        ) : (
          <p className="text-[var(--textTwo)]">{tCommon("messages.noGames")}</p>
        )}
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={gameData?.current_page || currentPage}
        totalPages={gameData?.last_page || 1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
