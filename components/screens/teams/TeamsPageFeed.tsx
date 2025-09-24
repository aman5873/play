"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";

import ReactSelectInput from "@/components/common/ReactSelectInput";
import Pagination, { ShowingResults } from "@/components/common/Pagination";

import { teamsData } from "@/constants/data";
import { Trophy, Users } from "lucide-react";

import Image from "next/image";

import { CardChip } from "@/components/common/CardComp";

function TeamCard(props) {
  const { teamInfo, contClass = "w-75 min-w-[12rem] max-w-xs" } = props;
  // const router = useRouter();
  const users = `${teamInfo?.max_team_member}/ ${teamInfo?.member_count}`;

  if (teamInfo)
    return (
      <div
        // onClick={() => router.push(`/teams/${teamInfo?.id}`)}
        className={`gradient-one  border p-4 flex-shrink-0 overflow-hidden rounded-xl flex flex-col gap-3 border-[var(--borderThree)] ${contClass} `}
      >
        {teamInfo?.logo && (
          <div
            className={`relative overflow-hidden rounded-lg group w-full h-[170px] sm:h-[150px] lg:h-[197px]`}
          >
            <Image
              src={teamInfo?.logo}
              alt={teamInfo?.title}
              fill
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>
        )}
        <h1 className="sm:text-md lg:text-lg font-bold">{teamInfo?.title}</h1>
        <p className="text-[14px]  text-[var(--textTwo)]">
          {teamInfo?.description}
        </p>

        <div className="flex justify-between">
          <CardChip label={teamInfo?.success_rate} />
          <div>
            <div className="flex gap-5">
              {teamInfo?.trophies_count && (
                <div className="flex items-center gap-1 text-[var(--textOne)] font-bold">
                  <Trophy className="w-4 h-4 text-[var(--textTwo)] mr-1" />
                  <span>{teamInfo.trophies_count}</span>
                </div>
              )}
              {users && (
                <div className="flex items-center gap-1 text-[var(--textOne)] font-bold">
                  <Users className="w-4 h-4 text-[var(--textTwo)] mr-1" />
                  <span>{users}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}
export default function TeamsPageFeed() {
  const { headerSearchValue } = useAuth();
  const { t: tCommon } = useTranslation("common");

  // Filters
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Update pageSize responsively
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setPageSize(window.innerWidth < 768 ? 4 : 8);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Category options
  const categoryOptions = useMemo(() => {
    const unique = [
      ...new Set(teamsData.map((s) => s.country).filter(Boolean)),
    ];
    return [
      { value: "", label: tCommon("filters.all") },
      ...unique.map((c) => ({ value: c, label: c })),
    ];
  }, [tCommon]);

  const filteredSocial = useMemo(() => {
    return teamsData.filter((item) => {
      const matchesSearch =
        !headerSearchValue ||
        item.title.toLowerCase().includes(headerSearchValue.toLowerCase()) ||
        item.country.toLowerCase().includes(headerSearchValue.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        selectedCategory.value === "" ||
        item.country === selectedCategory.value;

      return matchesSearch && matchesCategory;
    });
  }, [selectedCategory, headerSearchValue]);

  const totalItems = filteredSocial.length;
  const safePageSize = pageSize || 6;
  const safeCurrentPage = currentPage || 1;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));

  // Reset currentPage if exceeds totalPages
  useEffect(() => {
    if (safeCurrentPage > totalPages) setCurrentPage(1);
  }, [totalPages]);

  // Paginate
  const paginatedSocial = useMemo(() => {
    const start = (safeCurrentPage - 1) * safePageSize;
    return filteredSocial.slice(start, start + safePageSize);
  }, [filteredSocial, safeCurrentPage, safePageSize]);

  return (
    <div className="mx-auto py-10 pb-10 w-full">
      {/* Filter + ShowingResults */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div className="w-[260px] lg:w-[260px]">
          <ReactSelectInput
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categoryOptions}
            placeholder={tCommon("filters.category")}
          />
        </div>
        <ShowingResults
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          className="ml-auto"
          label={tCommon("teams")}
        />
      </div>

      <div
        className="
  grid gap-4 justify-items-start
    grid-cols-[repeat(auto-fit,minmax(5rem,1fr))]
    sm:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]
    md:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]
    lg:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]
    xl:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]
    2xl:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]
    "
      >
        {paginatedSocial.length > 0 ? (
          paginatedSocial.map((obj, index) => (
            <TeamCard
              key={`social-${obj.id}-${index}`}
              teamInfo={obj}
              contClass="w-full"
            />
          ))
        ) : (
          <p className="text-[var(--textTwo)]">
            {tCommon("messages.noSocials")}
          </p>
        )}
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
