"use client";

import React, { useCallback, useEffect, useState } from "react";
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

  const [tournamentData, setTournamentData] = useState<any>(null);
  const [statusList, setStatusList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  // Dropdown filter
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Dynamically adjust per_page based on screen size
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const newSize = window.innerWidth < 768 ? 4 : 8;
        setPageSize(newSize);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Fetch status & genres on mount + refetch games on pageSize change
  useEffect(() => {
    setCurrentPage(1);
    fetchTournaments({ page: 1, per_page: pageSize });

    getStatuses().then((res) => {
      if (res?.success && res?.data) setStatusList(res.data);
    });

    getCategories().then((res) => {
      if (res?.success && res?.data) setCategoryList(res.data);
    });
  }, [pageSize, isAuthenticated]);

  const fetchTournaments = useCallback(
    async (params?: any) => {
      setLoading(true);
      try {
        const query: Record<string, any> = {};

        if (params?.per_page ?? pageSize)
          query.per_page = params?.per_page ?? pageSize;
        if (params?.page ?? currentPage)
          query.page = params?.page ?? currentPage;
        if (params?.search ?? headerSearchValue)
          query.search = params?.search ?? headerSearchValue;

        // ✅ Use selected IDs
        if (selectedStatus?.id) query.status_id = selectedStatus.id;
        if (selectedCategory?.id) query.genre_id = selectedCategory.id;

        const res: any = await getTournaments(query);
        if (res?.success && res?.data) {
          setTournamentData(res.data);
        }
      } finally {
        setLoading(false);
      }
    },
    [pageSize, currentPage, headerSearchValue, selectedStatus, selectedCategory]
  );

  // Refetch games when filters or search change
  useEffect(() => {
    fetchTournaments();
  }, [fetchTournaments]);

  useEffect(() => {
    if (headerSearchValue !== undefined) {
      setCurrentPage(1);
      fetchTournaments({ page: 1 });
    }
  }, [headerSearchValue]);

  return (
    <>
      <TournamentFeaturedCard
        tournamentInfo={tournamentData?.data?.[0]}
        style={{ marginTop: 20 }}
      />
      <div className="mx-auto pb-20 w-full">
        {/* Filter + ShowingResults */}
        <div className="flex flex-col   sm:flex-row items-center justify-between gap-4 mb-8 ">
          <div className="w-[260px] lg:w-[260px]">
            <ReactSelectInput
              value={selectedStatus}
              onChange={(value) => {
                setSelectedStatus(value);
                setCurrentPage(1);
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
          <div className="w-[260px] lg:w-[260px]">
            <ReactSelectInput
              value={selectedCategory}
              onChange={(value) => {
                setSelectedCategory(value);
                setCurrentPage(1);
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
            fetchTournaments({ page });
          }}
        />
      </div>
    </>
  );
}
