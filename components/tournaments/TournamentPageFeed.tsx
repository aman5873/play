"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import ReactSelectInput from "@/components/common/ReactSelectInput";
import {
  TournamentCard,
  TournamentFeaturedCard,
} from "@/components/tournaments/TournamentFeed";
import { useAuth } from "@/context/AuthContext";
import Pagination, { ShowingResults } from "@/components/common/Pagination";
import {
  getCategories,
  getStatuses,
  getTournaments,
} from "@/lib/tournament_ops";

export default function TournamentPageFeed() {
  const { headerSearchValue, isAuthenticated, setLoading } = useAuth();
  const { t: tCommon } = useTranslation("common");

  const initialLoad = useRef(true);
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
  useEffect(() => {
    if (!isAuthenticated) return;

    getStatuses().then((res) => {
      if (res?.success && res?.data) setStatusList(res.data);
    });

    getCategories().then((res) => {
      if (res?.success && res?.data) setCategoryList(res.data);
    });
  }, [isAuthenticated]);

  // Fetch tournaments whenever filters, search, pagination, or pageSize changes
  useEffect(() => {
    if (!isAuthenticated) return;

    // Skip first search-triggered fetch
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }

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
      <TournamentFeaturedCard
        tournamentInfo={tournamentData?.data?.[0]}
        style={{ marginTop: 20 }}
      />
      <div className="mx-auto pb-20 w-full">
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
            label={tCommon("labels.games")}
          />
        </div>

        {/* Tournament cards */}
        <div className="flex flex-wrap gap-2 scroll-smooth scrollbar-hide mx-auto justify-center">
          {tournamentData?.data?.length > 0 ? (
            tournamentData.data.map((t: any) => (
              <TournamentCard
                key={t.id}
                tournamentInfo={t}
                showDesc
                style={{ maxWidth: "23rem" }}
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
    </>
  );
}
