"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";

import ReactSelectInput from "@/components/common/ReactSelectInput";
import Pagination, { ShowingResults } from "@/components/common/Pagination";
import { SocialCard } from "@/components/screens/social/SocialHubFeed";
import { socialData } from "@/constants/data";

export default function SocialPageFeed() {
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
      ...new Set(socialData.map((s) => s.category).filter(Boolean)),
    ];
    return [
      { value: "", label: tCommon("filters.all") },
      ...unique.map((c) => ({ value: c, label: c })),
    ];
  }, [tCommon]);

  // Filter social posts
  const filteredSocial = useMemo(() => {
    return socialData.filter((item) => {
      const matchesSearch =
        !headerSearchValue ||
        item.channel.title
          .toLowerCase()
          .includes(headerSearchValue.toLowerCase()) ||
        item.channel.description
          .toLowerCase()
          .includes(headerSearchValue.toLowerCase()) ||
        item.category.toLowerCase().includes(headerSearchValue.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        selectedCategory.value === "" ||
        item.category === selectedCategory.value;

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex-1 min-w-[170px] max-w-[260px] sm:w-auto">
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
          label={tCommon("socials")}
        />
      </div>

      {/* Social cards */}
      <div className="flex flex-wrap justify-center sm:justify-start gap-4">
        {paginatedSocial.map((obj, index) => (
          <SocialCard
            key={`social-${obj.id}-${index}`}
            socialInfo={obj}
            contClass="w-full 
            [@media(min-width:460px)_and_(max-width:619px)]:w-[90%] [@media(min-width:620px)]:w-[17.7rem]
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
  );
}
