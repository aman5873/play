"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ReactSelectInput from "@/components/common/ReactSelectInput";
import {
  TournamentCard,
  TournamentFeaturedCard,
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

export default function TournamentPageFeed() {
  const { headerSearchValue, isAuthenticated } = useAuth();
  const { t: tCommon } = useTranslation("common");
  const { t: tScreen } = useTranslation("screen");

  const [loading, setLoading] = useState(true);

  const [tournamentData, setTournamentData] = useState<any>(null);
  const [statusList, setStatusList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  // Dropdown filter
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Dynamically adjust per_page based on screen size
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const handleResize = () => {
  //       const newSize = window.innerWidth < 768 ? 4 : 8;
  //       setPageSize(newSize);
  //     };

  //     handleResize();
  //     window.addEventListener("resize", handleResize);
  //     return () => window.removeEventListener("resize", handleResize);
  //   }
  // }, []);

  // Fetch status & genres on mount + refetch games on pageSize change
  // Fetch status & categories once when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchFilters = async () => {
      setLoading(true);
      try {
        const [statusRes, categoryRes] = await Promise.all([
          getStatuses(),
          getCategories(),
        ]);
        if (statusRes?.success && statusRes?.data)
          setStatusList(statusRes.data);
        if (categoryRes?.success && categoryRes?.data)
          setCategoryList(categoryRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, [isAuthenticated]);

  // Fetch tournaments whenever filters/search/pagination changes
  useEffect(() => {
    if (!isAuthenticated) return;

    const params: Record<string, any> = {
      page: currentPage,
      per_page: pageSize,
    };

    if (selectedStatus?.id) params.status_id = selectedStatus.id;
    if (selectedCategory?.id) params.category_id = selectedCategory.id;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res: any = await getTournaments(params);
        if (res?.success && res?.data) setTournamentData(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    isAuthenticated,
    currentPage,
    pageSize,
    headerSearchValue,
    selectedStatus,
    selectedCategory,
  ]);

  return (
    <>
      <Loading loading={loading} />
      <TournamentFeaturedCard
        tournamentInfo={tournamentData?.data?.[0]}
        style={{ marginTop: 20 }}
      />
      <div className="mx-auto  w-full">
        {/* Filter + ShowingResults */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="w-full sm:w-full md:w-[260px] lg:w-[260px] ">
            <ReactSelectInput
              value={selectedStatus}
              onChange={(value) => {
                setSelectedStatus(value);
              }}
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
          <div className="w-full sm:w-full md:w-[260px] lg:w-[260px] ">
            <ReactSelectInput
              value={selectedCategory}
              onChange={(value) => {
                setSelectedCategory(value);
              }}
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
          <ShowingResults
            currentPage={tournamentData?.current_page || 1}
            pageSize={tournamentData?.per_page || pageSize}
            totalItems={tournamentData?.total || 0}
            className="ml-auto"
            label={tCommon("tournaments")}
          />
        </div>

        {/* Tournament cards */}
        <div
          className="grid gap-4 scroll-smooth scrollbar-hide mx-auto justify-items-start
    grid-cols-[repeat(auto-fit,minmax(16rem,23rem))]
    sm:grid-cols-[repeat(auto-fit,minmax(20rem,23rem))]
    lg:grid-cols-[repeat(auto-fit,minmax(21rem,23.65rem))]"
        >
          {tournamentData?.data?.length > 0 ? (
            tournamentData.data.map((t: any) => (
              <TournamentCard
                key={t.id}
                tournamentInfo={t}
                showDesc
                contClass="w-full"
              />
            ))
          ) : (
            <p style={{ color: "var(--textTwo)" }}>
              {tCommon("messages.noTournaments")}
            </p>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={tournamentData?.current_page || currentPage}
          totalPages={tournamentData?.last_page || 1}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
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
