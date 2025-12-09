"use client";
import {
  MediaIcon,
  SocialIcon,
  XIcon,
  TiktokIcon,
  DiscordIcon,
  CoinIcon,
} from "@/app/icons";
import { iconMap } from "@/components/common/CardComp";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import {
  Flame,
  Gamepad2,
  Linkedin,
  Mail,
  Wallet2,
  Youtube,
  Globe,
  InstagramIcon,
} from "lucide-react";
import { AppButton } from "@/components/TopComp";
import Loading from "@/components/common/Loading";
import {
  claimQuest,
  finalClaimQuest,
  getQuests,
  getQuestSummary,
} from "@/lib/quest_ops";
import { useAuth } from "@/context/AuthContext";
import AppModal from "@/components/AppModal";

import { handleApiMessage } from "@/lib/auth_ops";
import { useAlert } from "@/context/AlertContext";
import { useLanguage } from "@/context/LanguageContext";
import QuestVerifyModal from "@components/screens/quests/QuestVerifyModal";
import QuestAnalyticsComp from "@components/screens/quests/QuestAnalyticsComp";
import { decodeUUID } from "@/lib/system";

type QuestCardProps = {
  isHighlight?: boolean;
  isExpired: boolean;
  obj: any;
  Icon: any;
  setTelegramData: any;
  setShowTelegramLogin: any;
  setShowVerifyModal: any;
  fetchQuestSummary: any;
  handleRefresh: any;
  list: any;
  datalist: any;
  setDatalist: any;
  removeClaimQueryParam?: any;
};

export const claimConfigs = [
  "link_account",
  "following_count",
  "followers_count",
  "first_comment",
  "first_stream",
  "first_post",
];
function useDebouncedValue(value, delay = 800) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export const iconMapList = {
  Gameplay: Gamepad2,
  Community: SocialIcon,
  "Daily Challenge": Flame,
  "Social Media": Globe,
  Instagram: InstagramIcon,
  instagram: InstagramIcon,
  Engagement: MediaIcon,
  Twitter: XIcon,
  X: XIcon,
  twitter: XIcon,
  TikTok: TiktokIcon,
  Tiktok: TiktokIcon,
  Youtube: Youtube,
  Linkedin: Linkedin,
  Discord: DiscordIcon,
  discord: DiscordIcon,
  Wallet: Wallet2,
  Email: Mail,
};

function TooltipButton({ obj, isExpired }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const buttonStyle =
    obj?.user_status === "completed"
      ? {
          background: "var(--borderOne)",
          color: "var(--primary)",
          border: "none",
          textTransform: "capitalize",
        }
      : isExpired
      ? { textTransform: "capitalize", color: "var(--textTwo)" }
      : { textTransform: "capitalize" };

  return (
    <div
      ref={tooltipRef}
      className="inline-block relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={(e) => {
        e.stopPropagation();
        setShowTooltip(true); // show on click as well
      }}
    >
      <AppButton
        type="secondaryTwo"
        style={buttonStyle}
        label={obj?.button_text}
      />

      {obj?.tooltip_text && (
        <div
          className={`absolute bottom-full right-0 mb-2 px-3 py-1 rounded-md shadow-lg z-10
            bg-[var(--bgTwo)] text-[var(--textOne)] text-sm max-w-[250px] w-max
            whitespace-normal break-words transition-all duration-300 ease-out
            ${
              showTooltip
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none"
            }
          `}
        >
          {obj.tooltip_text}
        </div>
      )}
    </div>
  );
}

function TelegramLoginModal({
  showTelegramLogin,
  setShowTelegramLogin,
  telegramData,
  setLoading,
}) {
  const { t: tScreen } = useTranslation("screen");

  useEffect(() => {
    if (showTelegramLogin && telegramData) {
      const { bot_username, callback_url, state } = telegramData;
      const container = document.getElementById("telegram-login-container");

      if (!container) return;

      container.innerHTML = "";
      setLoading(true);

      // Create  Telegram widget script
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.async = true;
      script.setAttribute("data-telegram-login", bot_username);
      script.setAttribute("data-size", "large");
      script.setAttribute("data-userpic", "false");
      script.setAttribute("data-request-access", "write");
      script.setAttribute(
        "data-auth-url",
        `${callback_url}?state=${encodeURIComponent(state)}`
      );

      script.onload = () => {
        setTimeout(() => setLoading(false), 1000); // small delay for rendering
      };

      container.appendChild(script);
    }
  }, [showTelegramLogin, telegramData]);

  return (
    <AppModal
      open={showTelegramLogin}
      onClose={() => setShowTelegramLogin(false)}
    >
      <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-xl xl:text-2xl font-semibold text-[var(--textOne)]">
          {tScreen("quests.labels.connectTelegram")}
        </h2>
        <p className="text-[var(--textTwo)] text-sm xl:text-base max-w-md">
          {tScreen("quests.labels.connectTelegramDesc")}
          <br />
          {tScreen("quests.labels.connectTelegramSubDesc")}
        </p>

        <div
          id="telegram-login-container"
          className="flex justify-center mt-3"
        ></div>

        <p className="text-xs xl:text-sm text-[var(--textTwo)] mt-4 italic">
          {tScreen("quests.labels.connectTelegramHint")}
        </p>
      </div>
    </AppModal>
  );
}
function QuestCardSkeleton() {
  return (
    <div className="rounded-xl p-4 flex flex-col gap-2 justify-between border border-[var(--borderThree)] animate-pulse bg-[#1f1f1f]">
      {/* Top Section */}
      <div className="flex gap-2">
        {/* Icon Box */}
        <div className="bg-[var(--borderThree)] w-12 h-12 rounded-xl" />

        {/* Title + Description */}
        <div className="flex-1 justify-center flex flex-col">
          <div className="h-4 bg-[var(--borderThree)] rounded w-2/3 mb-2" />
          <div className="h-3 bg-[var(--borderThree)] rounded w-3/4" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between mt-2 items-center">
        {/* Coin + Points */}
        <div className="flex gap-1 items-center">
          <div className="w-6 h-6 bg-[var(--borderThree)] rounded-full" />
          <div className="h-5 w-8 bg-[var(--borderThree)] rounded" />
        </div>

        {/* Button */}
        <div className="w-35 h-11 bg-[var(--borderThree)] rounded-full" />
      </div>
    </div>
  );
}

const QuestCard = forwardRef<HTMLDivElement, QuestCardProps>(function QuestCard(
  props,
  ref
) {
  const {
    isHighlight = false,
    isExpired,
    obj,
    Icon,
    setTelegramData,
    setShowTelegramLogin,
    setShowVerifyModal,
    fetchQuestSummary,
    handleRefresh,
    list,
    datalist,
    setDatalist,
    removeClaimQueryParam,
  } = props;

  const { t: tAuth } = useTranslation("auth");
  const { showAlert } = useAlert();
  const { handleProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  function connectTelegram(res) {
    if (res?.data?.provider === "telegram") {
      // Save data and open modal
      setTelegramData(res.data);
      setShowTelegramLogin(true);
    }
  }

  function handleClaim(obj: any) {
    if (
      (obj?.category === "Daily Challenge" ||
        obj?.config?.type === "link_account") &&
      !obj?.ready_to_claim
    ) {
      onHandleDailyClaim({ id: obj?.id, data: null });
    }
    if (
      obj?.category === "Community" &&
      claimConfigs.includes(obj?.config?.type)
    ) {
      onHandleDailyClaim({ id: obj?.id, data: null });
    } else if (obj?.ready_to_claim) {
      handleFinalClaim({ completion_id: obj?.completion?.id, id: obj?.id });
    } else {
      setShowVerifyModal(obj);
    }
  }

  // daily login
  async function onHandleDailyClaim({ id, data }) {
    try {
      setLoading(true);
      const res = await claimQuest({ id, data });

      if (res?.message) {
        handleApiMessage(
          res?.message,
          showAlert,
          res?.success ? "success" : "error"
        );
      }

      if (res?.success) {
        handleRefresh();
        fetchQuestSummary();
        handleProfile();
        removeClaimQueryParam();

        if (!res?.data?.redirect_url && data) {
          const updatedList = list?.map((obj) => {
            if (obj?.id === id) {
              return {
                ...obj,
                button_disabled: true,
                user_status: "completed",
                button_text: "Completed",
              };
            } else {
              return { ...obj };
            }
          });
          handleProfile();
          fetchQuestSummary();
          setDatalist(updatedList);
        } else if (
          res?.data?.provider === "telegram" &&
          res?.data?.bot_username &&
          res?.data?.callback_url
        ) {
          connectTelegram(res);
        } else if (res?.data?.redirect_url) {
          window.location.href = res?.data?.redirect_url;
        }
      }
    } catch (error) {
      console.error(error);
      handleApiMessage("Internal server error", showAlert, "error");
    } finally {
      setLoading(false);
    }
  }
  async function handleFinalClaim({ completion_id, id }) {
    try {
      setLoading(true);
      const res = await finalClaimQuest({ completion_id });

      if (res?.message) {
        handleApiMessage(
          res?.message,
          showAlert,
          res?.success ? "success" : "error"
        );
      }
      if (res?.success) {
        handleRefresh();

        const updatedList = datalist?.map((obj) => {
          if (obj?.id === id) {
            return {
              ...obj,
              button_disabled: true,
              user_status: "completed",
              button_text: "Completed",
              ready_to_claim: false,
            };
          } else {
            return { ...obj };
          }
        });
        handleProfile();
        fetchQuestSummary();
        setDatalist(updatedList);
      }
    } catch (error) {
      console.error(error);
      handleApiMessage("Internal server error", showAlert, "error");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      ref={ref}
      className={`rounded-xl  p-4 flex flex-col gap-2 justify-between  border  
        ${isExpired ? "bg-[#2b2d28]" : "gradient-one"} 
        ${
          isHighlight
            ? "border-[var(--primary)]"
            : "border-[var(--borderThree)]"
        }
      `}
    >
      <div className="flex gap-2">
        <div className="bg-[var(--borderThree)] w-12 h-12  rounded-xl flex justify-center items-center ">
          {Icon && <Icon color="white" />}
        </div>

        <div className="flex-1">
          <h1
            className="text-md truncate font-bold"
            style={
              isExpired
                ? {
                    color: "var(--textTwo)",
                  }
                : {}
            }
          >
            {obj?.title}
          </h1>
          <p className="text-[14px] text-[var(--textTwo)]">
            {obj?.description}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-[1px] items-center">
          <CoinIcon size={25} />
          <span
            className={` text-md font-medium ${
              isExpired ? "text-[var(--textTwo)]" : "text-[var(--textOne)]"
            } `}
          >
            {obj?.points}
          </span>
        </div>

        <>
          {obj?.user_status === "available" || obj?.ready_to_claim ? (
            <AppButton
              onClick={() => handleClaim(obj)}
              type={isExpired ? "secondaryTwo" : "primary"}
              label={loading ? tAuth("processing") : obj?.button_text}
              disabled={loading}
            />
          ) : (
            <TooltipButton isExpired={isExpired} obj={obj} />
          )}
        </>
      </div>
    </div>
  );
});

function QuestTabFeedListComponent({
  list,
  handleRefresh,
  fetchQuestSummary,
  loadingPage,
}) {
  const { t: tCommon } = useTranslation("common");
  const { showAlert } = useAlert?.() ?? {}; // optional: keep same showAlert usage
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  const encryptedQuestId =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("claim")
      : null;
  const claimId = decodeUUID(encryptedQuestId);
  const cardRefs = useRef({});

  const [datalist, setDatalist] = useState(list || []);
  const [showVerifyModal, setShowVerifyModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showTelegramLogin, setShowTelegramLogin] = useState(false);
  const [telegramData, setTelegramData] = useState(null);

  function removeClaimQueryParam(claimId?: string) {
    if (!claimId) return;

    const url = new URL(window.location.href);
    url.searchParams.delete("claim");
    window.history.replaceState({}, "", url.toString());
  }

  useEffect(() => {
    setDatalist(list || []);
  }, [list]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    if (!error) return;

    const PROVIDER_MESSAGE = {
      twitch: tCommon("errorMessage.accountInUse", { provider: "Twitch" }),
      telegram: tCommon("errorMessage.accountInUse", { provider: "Telegram" }),
      twitter: tCommon("errorMessage.accountInUse", { provider: "Twitter" }),
      discord: tCommon("errorMessage.accountInUse", { provider: "Discord" }),
    };

    if (error.endsWith("_account_in_use")) {
      const provider = error.replace("_account_in_use", "");
      const providerMessage = PROVIDER_MESSAGE[provider] || provider;
      showAlert?.(providerMessage, "error", 8000);
    }

    // remove error param cleanly
    const url = new URL(window.location.href);
    url.searchParams.delete("error");
    window.history.replaceState({}, "", url.toString());
  }, [pathname]);

  useEffect(() => {
    if (!claimId) return;

    // Wait for QuestCard refs to be populated
    const target = cardRefs.current[claimId];
    if (!target) return;

    // Scroll smoothly to the card
    setTimeout(() => {
      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 300);
  }, [claimId, datalist]);

  return (
    <>
      <Loading loading={loading} />
      <QuestVerifyModal
        questInfo={showVerifyModal}
        show={Boolean(showVerifyModal)}
        onClose={() => setShowVerifyModal(null)}
        handleRefresh={handleRefresh}
      />
      <TelegramLoginModal
        telegramData={telegramData}
        showTelegramLogin={showTelegramLogin}
        setShowTelegramLogin={setShowTelegramLogin}
        setLoading={setLoading}
      />

      {loadingPage ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 w-full gap-4 mt-4 justify-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <QuestCardSkeleton key={i} />
          ))}
        </div>
      ) : datalist?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 w-full gap-4 mt-4 justify-center">
          {datalist.map((obj) => {
            const Icon =
              iconMapList[obj?.platform] ?? iconMapList[obj?.category];
            const isExpired = obj?.user_status === "expired";

            return (
              <QuestCard
                key={obj?.id}
                ref={(el) => {
                  cardRefs.current[obj.id] = el;
                }}
                removeClaimQueryParam={() => {
                  if (claimId === obj?.id) removeClaimQueryParam(claimId);
                }}
                isHighlight={claimId === obj?.id}
                isExpired={isExpired}
                obj={obj}
                Icon={Icon}
                setTelegramData={setTelegramData}
                setShowTelegramLogin={setShowTelegramLogin}
                setShowVerifyModal={setShowVerifyModal}
                fetchQuestSummary={fetchQuestSummary}
                handleRefresh={handleRefresh}
                list={list}
                datalist={datalist}
                setDatalist={setDatalist}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-center text-[var(--textOne)]">
          {tCommon("messages.noData")}
        </p>
      )}
    </>
  );
}
const QuestTabFeedList = React.memo(QuestTabFeedListComponent);

// QuestTabFeed
function QuestTabFeed({ fetchQuestSummary }) {
  const { headerSearchValue } = useAuth();
  const { t: tScreen } = useTranslation("screen");
  const { lang } = useLanguage();

  // local UI state
  const [activeTab, setActiveTab] = useState("allQuest");
  const [loading, setLoading] = useState(false);
  const [questData, setQuestData] = useState([]);

  // debounced search value (Q1: debounce 800ms)
  const debouncedSearch = useDebouncedValue(headerSearchValue, 800);

  // Stable fetch function (useCallback)
  const fetchQuestsAndLoad = useCallback(
    async (params: Record<string, any> = { all: "1" }, showLoader = true) => {
      if (showLoader) {
        setLoading(true);
      }
      try {
        const res = await getQuests(params);
        if (res?.success && res?.data?.data) {
          setQuestData(res.data.data);
        }
      } catch (e) {
        // optionally handle error
        console.error("fetchQuestsAndLoad error", e);
      } finally {
        if (showLoader) {
          setLoading(false);
        }
      }
    },
    []
  );

  // lightweight fetch (no loader) for refresh calls passed to children
  const fetchQuestsNoLoader = useCallback((params = { all: "1" }) => {
    // call but don't set loader (used for child refresh)
    getQuests(params)
      .then((res) => {
        if (res?.success && res?.data?.data) {
          setQuestData(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const lastKey = useRef("");

  // Memoize your params builder
  const params = useMemo(() => {
    const p: Record<string, any> = { all: "1" };
    if (debouncedSearch.trim()) p.search = debouncedSearch.trim();
    return p;
  }, [debouncedSearch]);

  // Key includes lang (axios interceptor injects lang but key must detect change)
  const key = useMemo(() => {
    return JSON.stringify({ ...params, lang });
  }, [params, lang]);

  // Memoize fetch function to avoid unnecessary effect triggers
  const fetchStable = useCallback(() => {
    fetchQuestsAndLoad(params, true);
  }, [params, fetchQuestsAndLoad]);

  // Final effect: runs only when key changes
  useEffect(() => {
    if (lastKey.current === key) return; // prevent duplicates
    lastKey.current = key;

    fetchStable(); // runs once on mount + once per change
  }, [key, fetchStable]);

  // create filtered datasets (split API: client side filtering)
  const socialData = useMemo(
    () => questData.filter((o) => o?.category === "Social Media"),
    [questData]
  );
  const dailyChallengeData = useMemo(
    () => questData.filter((o) => o?.category === "Daily Challenge"),
    [questData]
  );
  const engagementData = useMemo(
    () => questData.filter((o) => o?.category === "Engagement"),
    [questData]
  );
  const communityData = useMemo(
    () => questData.filter((o) => o?.category === "Community"),
    [questData]
  );
  const gameplayData = useMemo(
    () => questData.filter((o) => o?.category === "Gameplay"),
    [questData]
  );

  // Static tab config (prevents re-creation)
  const TAB_CONFIG = useMemo(
    () => [
      { key: "allQuest", icon: null, labelKey: "allQuest", list: questData },
      {
        key: "socialMedia",
        icon: "globe",
        labelKey: "socialMedia",
        list: socialData,
      },
      {
        key: "engagement",
        icon: "heart",
        labelKey: "engagement",
        list: engagementData,
      },
      {
        key: "dailyChallenge",
        icon: "calender",
        labelKey: "dailyChallenge",
        list: dailyChallengeData,
      },
      {
        key: "community",
        icon: "users",
        labelKey: "community",
        list: communityData,
      },
      {
        key: "gameplay",
        icon: "game",
        labelKey: "gameplay",
        list: gameplayData,
      },
    ],
    [
      questData,
      socialData,
      engagementData,
      dailyChallengeData,
      communityData,
      gameplayData,
    ]
  );

  function handleTabSwitch(tabKey) {
    // Q2: A => switching tabs should NOT refetch. Just change local activeTab.
    setActiveTab(tabKey);
    setLoading(true);
    // small UX loader, will be cleared after brief timeout for smooth switching
    setTimeout(() => setLoading(false), 300);
  }

  // stable handleRefresh passed to children
  const handleRefresh = useCallback(
    () => fetchQuestsNoLoader({ all: "1" }),
    [fetchQuestsNoLoader]
  );

  const currentTab =
    TAB_CONFIG.find((t) => t.key === activeTab) || TAB_CONFIG[0];

  return (
    <>
      <div className="flex flex-col gap-4 mt-5">
        <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide p-[5px]">
          {TAB_CONFIG.map((tab) => {
            const Icon = iconMap?.[tab.icon];
            return (
              <button
                key={tab.key}
                onClick={() => handleTabSwitch(tab.key)}
                className={`
                  cursor-pointer flex gap-1 flex-shrink-0 px-4 py-2 
                  font-medium font-semibold rounded-3xl 
                  transition-all duration-300
                  hover:scale-105
                  ${
                    activeTab === tab.key
                      ? "bg-[var(--primary)] text-[var(--secondary)] shadow-md scale-105"
                      : "bg-[var(--borderThree)] text-[var(--textOne)]"
                  }
                `}
              >
                {Icon && <Icon />}
                {tScreen(`quests.labels.${tab.labelKey}`)}
              </button>
            );
          })}
        </div>

        <div className="w-full">
          <QuestTabFeedList
            list={currentTab.list || []}
            handleRefresh={handleRefresh}
            fetchQuestSummary={fetchQuestSummary}
            loadingPage={loading}
          />
        </div>
      </div>
    </>
  );
}

// QuestFeed parent wrapper
export default function QuestFeed() {
  const { isAuthenticated } = useAuth();
  const [questSummary, setQuestSummary] = useState(null);

  const fetchQuestSummary = useCallback(() => {
    if (isAuthenticated) {
      getQuestSummary()
        .then((res) => {
          if (res?.success && res?.data) setQuestSummary(res.data);
        })
        .catch((e) => console.error("getQuestSummary error", e));
    } else {
      setQuestSummary({
        total_progress: { total_quests: 0, completed_quests: 0 },
        active_quests: { available_quests: 0, quests_in_progress: 0 },
        current_streak: {
          quest_id: "",
          attempt_needed: 0,
          attempt_completed: 0,
          ready_to_claim: false,
        },
        daily_challenge: { daily_challenge_claimed: false, claimed_at: null },
      });
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full">
      <QuestAnalyticsComp
        questSummary={questSummary}
        fetchQuestSummary={fetchQuestSummary}
      />
      <QuestTabFeed fetchQuestSummary={fetchQuestSummary} />
    </div>
  );
}
