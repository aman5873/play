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

    // pick first visible child and include its margin-right
    const card = el.children[0];
    const style = card ? window.getComputedStyle(card) : null;
    const marginRight = style ? parseFloat(style.marginRight) || 0 : 0;
    const cardWidth = card ? card.offsetWidth + marginRight : 200;

    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-[var(--surface)] shadow-md rounded-full"
        >
          <ChevronLeftIcon style={{ fontSize: 28, color: "var(--text)" }} />
        </button>
      )}

      {/* nowrap + overflow-x-auto + min-w-0 so it doesn't force parent width */}
      <div
        ref={scrollRef}
        className="flex flex-nowrap overflow-x-auto scrollbar-hide scroll-smooth space-x-4 py-2 w-full min-w-0"
      >
        {children}
      </div>

      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-[var(--surface)] shadow-md rounded-full"
        >
          <ChevronRightIcon style={{ fontSize: 28, color: "var(--text)" }} />
        </button>
      )}
    </div>
  );
}
