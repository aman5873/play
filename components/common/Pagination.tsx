"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next"; // ✅ using i18n

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  scrollToTop?: boolean;
}

interface ShowingResultsProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  className?: string;
  label?: string;
}

export const ShowingResults: React.FC<ShowingResultsProps> = ({
  currentPage,
  pageSize,
  totalItems,
  className = "",
  label = "",
}) => {
  const { t: tCommon } = useTranslation("common");

  if (totalItems === 0)
    return (
      <p className={`text-sm text-[var(--textOne)] ${className}`}>
        {tCommon("messages.noData")}
      </p>
    );

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalItems);

  return (
    <p className={`text-sm text-[var(--textOne)] ${className}`}>
      {tCommon("pagination.showing", {
        start: startIndex,
        end: endIndex,
        total: totalItems,
        label,
      })}
    </p>
  );
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  scrollToTop = true,
}) => {
  const { t: tCommon } = useTranslation("common");

  if (totalPages <= 1) return null;

  const handleChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);

    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-3 mt-8">
      {/* Prev Button */}
      <button
        className="flex cursor-pointer items-center gap-1 text-[var(--textOne)] hover:text-[var(--primary)] transition-colors disabled:opacity-50 disabled:hover:text-[var(--textOne)]"
        onClick={() => handleChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={18} />
        <span>{tCommon("pagination.prev")}</span> {/* ✅ translated text */}
      </button>

      {/* Page Numbers */}
      <AnimatePresence mode="wait">
        {getPageNumbers().map((page) => (
          <motion.button
            key={page}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            onClick={() => handleChange(page)}
            className={`px-3 py-1 cursor-pointer rounded-lg transition-colors ${
              currentPage === page
                ? "bg-[var(--primary)] text-[var(--secondary)] font-bold"
                : "text-[var(--textOne)] hover:text-[var(--primary)]"
            }`}
          >
            {page}
          </motion.button>
        ))}
      </AnimatePresence>

      {/* Next Button */}
      <button
        className="flex cursor-pointer items-center gap-1 text-[var(--textOne)] hover:text-[var(--primary)] transition-colors disabled:opacity-50 disabled:hover:text-[var(--textOne)]"
        onClick={() => handleChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span>{tCommon("pagination.next")}</span> {/* ✅ translated text */}
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
