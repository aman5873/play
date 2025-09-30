"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Circle } from "lucide-react";

import { TopBgComp } from "@/components/TopComp";

import { CardChip, IconLabelInfo } from "@/components/common/CardComp";
import Image from "next/image";
import TournamentFeed from "@/components/screens/tournaments/TournamentFeed";
import { getStatuses, getTournaments } from "@/lib/tournament_ops";
import { useAuth } from "@/context/AuthContext";
import moment from "moment";
import { useTranslation } from "react-i18next";
import Loading from "@/components/common/Loading";
import { useLanguage } from "@/context/LanguageContext";

function ListComp({ title, list, variant = "bullet", start }) {
  if (!list?.length) return null;

  return (
    <div className="flex flex-col gap-1.5 mt-4">
      {title && (
        <h1 className="sm:text-md lg:text-lg font-bold uppercase opacity-95">
          {title}
        </h1>
      )}

      {list.map((rule, index) => {
        let prefix = null;

        if (variant === "faq") {
          prefix = `Q${index + 1}`; // Q1, Q2, ...
        } else if (start) {
          prefix = start;
        } else if (variant === "number") {
          prefix = `${index + 1}.`;
        } else if (variant === "alpha") {
          prefix = `${String.fromCharCode(97 + index)}.`; // a, b, c...
        } else {
          prefix = <Circle fill="currentColor" className="shrink-0 w-2 h-2" />;
        }

        return (
          <div
            key={`rule-${index}`}
            className="flex flex-col gap-1 md:gap-2 text-sm md:text-base font-medium"
          >
            {variant === "faq" && Array.isArray(rule) ? (
              <div className="flex flex-col gap-1">
                <div className="text-[var(--textOne)] opacity-85 font-semibold flex items-start gap-2">
                  <span>{prefix}:</span>
                  <span>{rule.find((item) => item.label === "Q")?.value}</span>
                </div>
                <div className="text-[var(--textTwo)] pl-6">
                  {rule.find((item) => item.label === "A")?.value}
                </div>
              </div>
            ) : (
              <div
                className="flex items-start gap-2 text-[var(--subtitle)]"
                style={{
                  alignItems: variant === "bullet" ? "center" : "flex-start",
                }}
              >
                <span className="text-[var(--textTwo)]">{prefix}</span>
                <span>{rule}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function TournamentScreenDetailsComp({ tournamentInfo }) {
  const { t: tScreen } = useTranslation("screen");
  const deadline = moment(tournamentInfo?.deadline).format("Do MMM YYYY");
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {tournamentInfo?.categories?.map(({ id, display_name }) => {
          return (
            <CardChip
              key={id}
              label={display_name}
              style={{
                background: "transparent",
                color: "var(--textOne",
                borderColor: "var(--textOne",
                textAlign: "center",
              }}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2 ">
        <IconLabelInfo icon="calender" label={deadline} />
        <IconLabelInfo icon="trophy" label={tournamentInfo?.prize} />
        <IconLabelInfo
          icon="users"
          label={tournamentInfo?.teams_participated_count ?? "--"}
        />
      </div>
      <div className="flex flex-wrap gap-4  items-center">
        <h1 className="sm:text-md lg:text-lg truncate font-semibold">
          {tScreen("tournament.labels.hosted_by")} :
        </h1>
        {tournamentInfo?.organizer_avatar_url && (
          <Image
            src={tournamentInfo?.organizer_avatar_url}
            alt={tournamentInfo?.organizer_name}
            width={48}
            height={48}
            className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-110 h-full"
          />
        )}
        <h1 className="sm:text-md lg:text-lg truncate font-bold">
          {tournamentInfo?.organizer_name}
        </h1>
      </div>
    </div>
  );
}

function TournamentFeedComp() {
  const { t: tScreen } = useTranslation("screen");
  const { t: tCommon } = useTranslation("common");
  return (
    <div>
      <div className="flex justify-between items-center my-4 px-2">
        <IconLabelInfo
          icon="mission"
          label={tScreen("tournament.labels.related_tournaments")}
          labelStyle={{ color: "var(--textOne" }}
        />

        <IconLabelInfo
          icon="right"
          label={tCommon("common_labels.view_all")}
          contStyle={{ flexDirection: "row-reverse" }}
        />
      </div>

      <TournamentFeed onlyFeed={true} />
    </div>
  );
}

export default function TournamentPage() {
  const { isAuthenticated } = useAuth();
  const { tournamentId } = useParams();
  const [tournamentInfo, setTournamentInfo] = useState(null);
  const [statusList, setStatusList] = useState([]);
  const { t: tCommon } = useTranslation("common");
  const { t: tScreen } = useTranslation("screen");
  const { lang } = useLanguage();

  const [loading, setLoading] = useState(false);

  const fetchTournaments = (id) => {
    if (!id || !isAuthenticated) return;
    setLoading(true);
    getTournaments(id).then((res) => {
      setLoading(false);
      if (res?.success && res?.data) {
        setTournamentInfo(res.data);
      }
    });
  };

  useEffect(() => {
    if (tournamentId && isAuthenticated) {
      fetchTournaments(tournamentId);
    }

    getStatuses().then((res) => {
      if (res?.success && res?.data) setStatusList(res.data);
    });
  }, [tournamentId, isAuthenticated, lang]);

  const primaryImage = tournamentInfo?.images?.find(
    (img) => img?.is_primary
  )?.image_url;

  return (
    <>
      <Loading loading={loading} />

      <div className="flex flex-col gap-4 p-4 pb-20">
        <TopBgComp
          content={{
            chip: [
              {
                label: statusList?.find((s) => s?.id === tournamentInfo?.status)
                  ?.name,
                type: "primary",
              },
            ],
            title: tournamentInfo?.name,
            description: tournamentInfo?.tagline,
            backgroundImage: primaryImage,
            button: [
              {
                label: tScreen("tournament.labels.join"),
                redirect: "",
                type: "primary",
              },
            ],
          }}
        >
          <TournamentScreenDetailsComp tournamentInfo={tournamentInfo} />
        </TopBgComp>

        <div className="flex flex-col gap-2 p-4 border-1 border-[var(--borderThree)] gradient-one rounded-xl">
          <h1 className="sm:text-2xl lg:text-3xl font-bold my-1">
            {tCommon("common_labels.description")}
          </h1>

          <ListComp
            title={tScreen("tournament.labels.registration_steps")}
            list={tournamentInfo?.registration_steps
              ?.filter((obj) => obj.step_text)
              .map((obj) => obj.step_text)}
            variant="number"
          />

          <ListComp
            title={tScreen("tournament.labels.formats")}
            list={tournamentInfo?.formats
              ?.filter((obj) => obj.format_text) // remove null/empty
              .map((obj) => obj.format_text)}
          />

          <ListComp
            title={tScreen("tournament.labels.faqs")}
            list={tournamentInfo?.faqs
              ?.filter((obj) => obj?.question && obj?.answer)
              .map((obj) => [
                { label: "Q", value: obj?.question },
                { label: "A", value: obj?.answer },
              ])}
            variant="faq"
          />
        </div>
        <TournamentFeedComp />
      </div>
    </>
  );
}
