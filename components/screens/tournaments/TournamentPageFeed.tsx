"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import ReactSelectInput from "@/components/common/ReactSelectInput";
import {
  TournamentCard,
  TournamentFeaturedFeed,
} from "@/components/screens/tournaments/TournamentFeed";
import { useAuth } from "@/context/AuthContext";
import Pagination, { ShowingResults } from "@/components/common/Pagination";
import {
  getCategories,
  getStatuses,
  getTournaments,
} from "@/lib/tournament_ops";
import { SectionDetails } from "@/components/common/CardComp";
import { tournamentAnalytics } from "@/constants/data";
import Loading from "@/components/common/Loading";
import { useLanguage } from "@/context/LanguageContext";

export default function TournamentPageFeed() {
  const { headerSearchValue, isAuthenticated } = useAuth();
  const { t: tCommon } = useTranslation("common");
  const { t: tScreen } = useTranslation("screen");
  const { lang } = useLanguage();

  const [loading, setLoading] = useState(false);

  const [tournamentData, setTournamentData] = useState<any>(null);
  const [statusList, setStatusList] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState<any[]>([]);

  // Filters
  const [selectedStatus, setSelectedStatus] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // StrictMode guards to avoid duplicate API calls
  const isFetchingFilters = useRef(false);
  const isFetchingTournaments = useRef(false);

  // ✅ Fetch statuses & categories (filters)
  useEffect(() => {
    if (!isAuthenticated || isFetchingFilters.current) return;
    isFetchingFilters.current = true;

    let mounted = true;

    (async () => {
      setLoading(true);
      try {
        const [statusRes, categoryRes] = await Promise.all([
          getStatuses(),
          getCategories(),
        ]);

        if (!mounted) return;

        if (statusRes?.success && statusRes?.data)
          setStatusList(statusRes.data);
        if (categoryRes?.success && categoryRes?.data)
          setCategoryList(categoryRes.data);
      } catch (err) {
        console.error("Error fetching tournament filters:", err);
      } finally {
        if (mounted) setLoading(false);
        isFetchingFilters.current = false;
      }
    })();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated, lang]);

  // ✅ Fetch tournaments (data)
  const fetchTournaments = async () => {
    if (!isAuthenticated || isFetchingTournaments.current) return;
    isFetchingTournaments.current = true;

    const params: Record<string, any> = {
      page: currentPage,
      per_page: pageSize,
    };

    if (headerSearchValue?.trim()) params.search = headerSearchValue.trim();
    if (selectedStatus?.id) params.status_id = selectedStatus.id;
    if (selectedCategory?.id) params.category_id = selectedCategory.id;

    setLoading(true);
    try {
      const res: any = await getTournaments(params);
      if (res?.success && res?.data) setTournamentData(res.data);
    } catch (err) {
      console.error("Error fetching tournaments:", err);
    } finally {
      setLoading(false);
      isFetchingTournaments.current = false;
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, [
    isAuthenticated,
    currentPage,
    pageSize,
    headerSearchValue,
    selectedStatus,
    selectedCategory,
    lang,
  ]);

  return (
    <>
      <Loading loading={loading} />

      <div className="relative px-[5px] pt-5">
        <TournamentFeaturedFeed />
      </div>

      <div className="mx-auto w-full">
        {/* Filters + ShowingResults */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex flex-wrap gap-4 w-full sm:flex-1">
            {/* Status Filter */}
            <div className="flex-1 min-w-[170px] sm:max-w-[260px] sm:w-auto">
              <ReactSelectInput
                value={selectedStatus}
                onChange={setSelectedStatus}
                options={[
                  { id: "", name: tCommon("filters.all") },
                  ...statusList,
                ].map((s) => ({
                  value: s.id,
                  label: s.name,
                  id: s.id,
                }))}
                placeholder={tCommon("filters.status")}
              />
            </div>

            {/* Category Filter */}
            <div className="flex-1 min-w-[170px] sm:max-w-[260px] sm:w-auto">
              <ReactSelectInput
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={[
                  { id: "", name: tCommon("filters.all") },
                  ...categoryList,
                ].map((c) => ({
                  value: c.id,
                  label: c.name,
                  id: c.id,
                }))}
                placeholder={tCommon("filters.category")}
              />
            </div>
          </div>

          <ShowingResults
            currentPage={tournamentData?.current_page || 1}
            pageSize={tournamentData?.per_page || pageSize}
            totalItems={tournamentData?.total || 0}
            className="ml-auto"
            label={tCommon("tournaments")}
          />
        </div>

        {/* Tournament Cards */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
          {tournamentData?.data?.length > 0 ? (
            tournamentData.data.map((t: any) => (
              <TournamentCard
                key={t.id}
                tournamentInfo={t}
                showDesc
                contClass="w-full 
            [@media(min-width:460px)_and_(max-width:619px)]:w-[90%] [@media(min-width:620px)]:w-[23.65rem]"
              />
            ))
          ) : (
            <p className="text-[var(--textTwo)]">
              {tCommon("messages.noTournaments")}
            </p>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={tournamentData?.current_page || currentPage}
          totalPages={tournamentData?.last_page || 1}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Tournament Analytics Section */}
      <div className="flex w-full my-5 justify-center">
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
    </>
  );
}
