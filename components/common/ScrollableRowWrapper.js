"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function ScrollableRowWrapper({ children, isReady = false }) {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [shouldCenter, setShouldCenter] = useState(false);
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setShowLeft(el.scrollLeft > 0);
      setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    const checkOverflow = () => {
      setShouldCenter(el.scrollWidth <= el.clientWidth);
    };

    // initial check
    handleScroll();
    checkOverflow();

    // re-check after paint
    requestAnimationFrame(() => checkOverflow());

    el.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => {
      handleScroll();
      checkOverflow();
    });

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [isReady]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const card = el.children[0];
    const style = card ? window.getComputedStyle(card) : null;
    const marginRight = style ? parseFloat(style.marginRight) || 0 : 0;
    const cardWidth = card ? card.offsetWidth + marginRight : 200;

    // include left padding when scrolling left
    const scrollAmount = direction === "left" ? -(cardWidth + 16) : cardWidth; // 16px = example left padding

    el.scrollBy({
      left: scrollAmount,
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

      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth"
      >
        <div
          className={`flex gap-4 px-4 ${
            shouldCenter
              ? "justify-center w-full" // all cards fit → full width + center
              : "justify-start w-max" // overflow → container shrinks to content, scrollable
          }`}
        >
          {children}
        </div>
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
