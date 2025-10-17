"use client";
import {
  MediaIcon,
  SocialIcon,
  XIcon,
  TiktokIcon,
  DiscordIcon,
} from "@/app/icons";
import { iconMap } from "@/components/common/CardComp";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Flame,
  Gamepad2,
  Linkedin,
  Mail,
  Star,
  Wallet2,
  Youtube,
  Globe,
  InstagramIcon,
} from "lucide-react";
import { AppButton } from "@/components/TopComp";
import Loading from "@/components/common/Loading";
import { claimQuest, getQuests } from "@/lib/quest_ops";
import { useAuth } from "@/context/AuthContext";
import AppModal from "@/components/AppModal";
import InputComp from "@/components/Form/InputComp";
import { handleApiMessage } from "@/lib/auth_ops";
import { useAlert } from "@/context/AlertContext";

export const iconMapList = {
  Gameplay: Gamepad2,
  Community: SocialIcon,
  "Daily Challenge": Flame,
  "Social Media": Globe,
  Instagram: InstagramIcon,
  Engagement: MediaIcon,
  Twitter: XIcon,
  X: XIcon,
  TikTok: TiktokIcon,
  Tiktok: TiktokIcon,
  Youtube: Youtube,
  Linkedin: Linkedin,
  Discord: DiscordIcon,
  Wallet: Wallet2,
  Email: Mail,
};

function QuestVerifyModal({ show, onClose, questInfo, handleRefresh }) {
  const { showAlert } = useAlert();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  function handleClose() {
    setImage(null);
    setUrl("");
    onClose();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image && !url) {
      return;
    }

    const formData = new FormData();
    if (image) formData.append("proof_screenshot", image);
    if (url) formData.append("proof_url", url);

    try {
      setLoading(true);
      const res = await claimQuest({ id: questInfo?.id, data: formData });

      if (res?.message) {
        handleApiMessage(
          res?.message,
          showAlert,
          res?.success ? "success" : "error"
        );
      }
      if (res?.success) {
        handleClose();
        handleRefresh();
      }
    } catch (error) {
      console.error(error);
      handleApiMessage("Internal server error", showAlert, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppModal
      open={show}
      onClose={handleClose}
      titleClass="font-rajdhani"
      contClass="w-[95%] max-w-lg"
    >
      <h2 className="text-[var(--textOne)] text-center font-semibold mb-4">
        <span className="text-lg sm:text-xl">Submit Proof for: </span>
        <span className="sm:text-md text-[var(--primary)] capitalize">
          {questInfo?.title}
        </span>
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Image Input */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-[var(--textOne)]">
            Upload Screenshot <span className="text-[var(--primary)]">*</span>
          </label>

          <div
            className="relative w-full border-2 border-dashed border-[var(--borderThree)] rounded-xl  transition-colors duration-200 
               bg-[var(--bgSecondary)] p-4 cursor-pointer text-center"
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {image ? (
              <div className="flex flex-col items-center gap-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-md shadow-sm"
                />
                <span className="text-sm text-[var(--textTwo)] truncate max-w-[200px]">
                  {image.name}
                </span>
              </div>
            ) : (
              <div className="text-[var(--textTwo)] text-sm">
                <span className="block">Click or drag image here</span>
                <span className="text-xs text-[var(--textThree)]">
                  Supported: JPG, PNG
                </span>
              </div>
            )}
          </div>
        </div>

        {/* URL Input */}
        <InputComp
          variant="secondaryTwo"
          label={"Enter URL"}
          name="url"
          placeholder={""}
          type="text"
          radius="10px"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          disabled={loading}
          type="submit"
          className={`cursor-pointer w-full px-6 py-2 mt-4 rounded-[100px]  font-bold font-rajdhani transition duration-200 ${
            loading
              ? "bg-[var(--bgThree)] text-[var(--textTwo)]"
              : "bg-[var(--primary)] text-[var(--secondary)]"
          }`}
        >
          {loading ? "Submitting..." : "Submit Proof"}
        </button>
      </form>
    </AppModal>
  );
}

function QuestTabFeedList({ list, handleRefresh }) {
  const { t: tScreen } = useTranslation("screen");

  const [showVerifyModal, setShowVerifyModal] = useState(null);

  function handleClaim(obj: any) {
    if (obj?.auto_approval) {
    } else {
      setShowVerifyModal(obj);
    }
  }

  return (
    <>
      <QuestVerifyModal
        questInfo={showVerifyModal}
        show={Boolean(showVerifyModal)}
        onClose={() => setShowVerifyModal(null)}
        handleRefresh={handleRefresh}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 w-full gap-4 mt-4 justify-center">
        {list?.map((obj: any) => {
          const Icon = iconMapList[obj?.platform] ?? iconMapList[obj?.category];
          const isExpired = obj?.user_status === "expired";

          const btnLabel =
            obj?.user_status === "available"
              ? "Claim"
              : obj?.user_status === "finished"
              ? "Completed"
              : obj?.user_status === "awaited"
              ? "Pending"
              : obj?.user_status;
          return (
            <div
              key={obj?.id}
              className={`rounded-xl  p-4 flex flex-col gap-2  border border-[var(--borderThree)] ${
                isExpired ? "bg-[#2b2d28]" : "gradient-one"
              }
              `}

              // ${
              //   obj?.user_status === "finished"
              //     ? "border border-[var(--primary)]"
              //     : "border border-[var(--borderThree)]"
              // }
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
              {/* <ProgressBar
                label={tScreen("quests.labels.progress")}
                count={obj?.completed_count}
                maxCount={obj?.total_count}
              /> */}
              <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                  <Star
                    size={19}
                    color={isExpired ? "var(--textTwo)" : "var(--textYellow)"}
                  />
                  <span
                    className={` text-md font-medium ${
                      isExpired
                        ? "text-[var(--textTwo)]"
                        : "text-[var(--textOne)]"
                    } `}
                  >
                    {obj?.points}
                  </span>
                  <span className="text-sm text-[var(--textTwo)]">XP</span>
                </div>
                {obj?.is_verify ? (
                  <AppButton
                    onClick={() => {}}
                    type={"secondary"}
                    label={tScreen("quests.labels.verify")}
                  />
                ) : (
                  <>
                    {obj?.user_status === "available" ? (
                      <AppButton
                        onClick={() => handleClaim(obj)}
                        type={isExpired ? "secondaryTwo" : "primary"}
                        label={btnLabel}
                      />
                    ) : (
                      <AppButton
                        onClick={() => {}}
                        type={"secondaryTwo"}
                        style={
                          obj?.user_status === "finished"
                            ? {
                                background: "var(--borderOne)",
                                color: "var(--primary)",
                                border: "none",
                                textTransform: "capitalize",
                              }
                            : isExpired
                            ? {
                                textTransform: "capitalize",
                                color: "var(--textTwo)",
                              }
                            : { textTransform: "capitalize" }
                        }
                        label={btnLabel}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function QuestTabFeed({}) {
  const { isAuthenticated } = useAuth();
  const { t: tScreen } = useTranslation("screen");

  const [activeTab, setActiveTab] = useState("allQuest");
  const [loading, setLoading] = useState(false);
  const [questData, setQuestData] = useState(null);
  const initialMount = useRef(true); // ✅ track first mount

  const socialData = questData?.filter(
    (obj: any) => obj?.category === "Social Media"
  );
  const dailyChallengeData = questData?.filter(
    (obj: any) => obj?.category === "Daily Challenge"
  );
  const engagementData = questData?.filter(
    (obj: any) => obj?.category === "Engagement"
  );
  const communityData = questData?.filter(
    (obj: any) => obj?.category === "Community"
  );
  const gameplayData = questData?.filter(
    (obj: any) => obj?.category === "Gameplay"
  );

  const questTabs = [
    {
      key: "allQuest",
      label: tScreen("quests.labels.allQuest"),
      component: (
        <QuestTabFeedList
          list={questData || []}
          handleRefresh={() => fetchQuests({ all: "1" })}
        />
      ),
    },
    {
      icon: "globe",
      key: "socialMedia",
      label: tScreen("quests.labels.socialMedia"),
      component: (
        <QuestTabFeedList
          list={socialData || []}
          handleRefresh={() => fetchQuests({ all: "1" })}
        />
      ),
    },
    {
      key: "engagement",
      icon: "heart",
      label: tScreen("quests.labels.engagement"),
      component: (
        <QuestTabFeedList
          list={engagementData || []}
          handleRefresh={() => fetchQuests({ all: "1" })}
        />
      ),
    },
    {
      icon: "calender",
      key: "dailyChallenge",
      label: tScreen("quests.labels.dailyChallenge"),
      component: (
        <QuestTabFeedList
          list={dailyChallengeData || []}
          handleRefresh={() => fetchQuests({ all: "1" })}
        />
      ),
    },
    {
      icon: "users",
      key: "community",
      label: tScreen("quests.labels.community"),
      component: (
        <QuestTabFeedList
          list={communityData || []}
          handleRefresh={() => fetchQuests({ all: "1" })}
        />
      ),
    },
    {
      icon: "game",
      key: "gameplay",
      label: tScreen("quests.labels.gameplay"),
      component: (
        <QuestTabFeedList
          list={gameplayData || []}
          handleRefresh={() => fetchQuests({ all: "1" })}
        />
      ),
    },
  ];
  function handleTabSwitch(tab: any) {
    setActiveTab(tab.key);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay
  }

  function fetchQuests(param?: any) {
    if (isAuthenticated) {
      // setLoading(true);
      getQuests(param).then((res: any) => {
        setLoading(false);
        if (res?.success && res?.data?.data) setQuestData(res?.data?.data);
      });
    }
  }

  useEffect(() => {
    // On first mount, prevent duplicate fetch
    if (initialMount.current) {
      initialMount.current = false;
      fetchQuests({ all: "1" });
    } else {
      // On subsequent lang changes, always fetch
      fetchQuests({ all: "1" });
    }
  }, [isAuthenticated]);

  return (
    <>
      <Loading loading={loading} />
      <div className="flex flex-col gap-4 mt-5">
        {/* Tabs Header */}
        <div
          className="
          flex gap-3 sm:gap-4 
          overflow-x-auto 
          scrollbar-hide
          p-[5px]
          // pb-2 sm:pb-0
          
        "
        >
          {questTabs.map((tab) => {
            const Icon = iconMap?.[tab?.icon];
            return (
              <button
                key={tab.key}
                onClick={() => handleTabSwitch(tab)}
                className={`
              cursor-pointer flex gap-1 flex-shrink-0 px-4 py-2 
              font-medium font-semibold rounded-3xl 
              transition-colors transition-transform duration-300 ease-in-out
              hover:scale-105
              ${
                activeTab === tab.key
                  ? "bg-[var(--primary)] text-[var(--secondary)] shadow-md scale-105"
                  : "bg-[var(--borderThree)] text-[var(--textOne)] "
              }
            `}
              >
                {Icon && (
                  <span>
                    <Icon />
                  </span>
                )}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Tab Content  */}
        <div className="w-full">
          {questTabs.find((tab) => tab.key === activeTab)?.component}
        </div>
      </div>
    </>
  );
}

export default function QuestFeed() {
  return (
    <div className="w-full">
      <QuestTabFeed />
    </div>
  );
}
