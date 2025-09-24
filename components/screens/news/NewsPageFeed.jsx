"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";

import ReactSelectInput from "@/components/common/ReactSelectInput";
import Pagination, { ShowingResults } from "@/components/common/Pagination";
import { NewsCard } from "@/components/screens/news/News&UpdatesFeed";
import { newsData } from "@/constants/data";
import { IconLabelInfo } from "@/components/common/CardComp";

export default function NewsPageFeed() {
  const { headerSearchValue } = useAuth();
  const { t: tCommon } = useTranslation("common");
  const { t: tNav } = useTranslation("navigation");
  const { t: tScreen } = useTranslation("screen");

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
    // Flatten all categories from newsData, filter out falsy values
    const allCategories = newsData
      .flatMap((item) => item.categories ?? []) // flatten arrays
      .filter(Boolean);

    // Get unique categories
    const unique = Array.from(new Set(allCategories));

    return [
      { value: "", label: tCommon("filters.all") },
      ...unique.map((c) => ({ value: c, label: c })),
    ];
  }, [newsData, tCommon]);

  // Filter news posts
  const filteredSocial = useMemo(() => {
    return newsData.filter((item) => {
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
        (item.categories ?? []).includes(selectedCategory.value);

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
      <IconLabelInfo
        icon="trend"
        label={tScreen("newsSection.labels.latest_articles")}
        labelStyle={{ color: "var(--textOne" }}
        contStyle={{ marginBottom: 10, padding: "0 5px" }}
      />
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
          label={tNav("news")}
        />
      </div>

      {/* Social cards */}
      {/* <div className="flex flex-wrap gap-4 justify-start w-fit bg-[red]"> */}
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
            <NewsCard
              key={`news-${obj.id}-${index}`}
              newsInfo={obj}
              contClass="w-full" // card will shrink but not exceed max width
            />
          ))
        ) : (
          <p className="text-[var(--textTwo)]">{tCommon("messages.noNews")}</p>
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
