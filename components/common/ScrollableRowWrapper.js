"use client";
import React, { useState, useRef, useLayoutEffect } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function ScrollableRowWrapper({ children, isReady = false }) {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setShowLeft(el.scrollLeft > 0);
      setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    handleScroll(); // run immediately
    el.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isReady]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("div"); // pick first card
    const cardWidth = card ? card.offsetWidth + 16 : 200; // card width + margin
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Left arrow */}
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-[var(--surface)] shadow-md rounded-full"
        >
          <ChevronLeftIcon style={{ fontSize: 28, color: "var(--text)" }} />
        </button>
      )}

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth scrollbar-hide"
      >
        {children}
      </div>

      {/* Right arrow */}
      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-[var(--surface)] shadow-md rounded-full"
        >
          <ChevronRightIcon style={{ fontSize: 28, color: "var(--text)" }} />
        </button>
      )}
    </div>
  );
}
