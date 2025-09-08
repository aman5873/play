"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// Inline SVG flags for EN and ES
const languages = [
  {
    key: "en",
    label: "English",
    icon: (
      <svg
        className="w-4 h-4 rounded-sm"
        viewBox="0 0 640 480"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="#fff" d="M0 0h640v480H0z" />
        <path fill="#FFF" d="M0 0l640 480M640 0L0 480" strokeWidth="60" />
        <path fill="#C8102E" d="M0 0l640 480M640 0L0 480" strokeWidth="40" />
        <path fill="#FFF" d="M270 0h100v480H270zM0 190h640v100H0z" />
        <path fill="#C8102E" d="M290 0h60v480h-60zM0 210h640v60H0z" />
      </svg>
    ),
  },
  {
    key: "es",
    label: "Español",
    icon: (
      <svg
        className="w-4 h-4 rounded-sm"
        viewBox="0 0 60 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="40" fill="#AA151B" />
        <rect y="10" width="60" height="20" fill="#F1BF00" />
      </svg>
    ),
  },
];

export default function LanguageToggle() {
  const { lang, switchLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (key: string) => {
    switchLang(key);
    setOpen(false);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      {/* Dropdown button */}
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex items-center gap-2 px-3 py-1 border-2 rounded-[100px] border-[var(--borderOne)] bg-[var(--bgOne)] text-[var(--textOne)] hover:bg-[var(--bgTwo)] hover:border-[var(--borderTwo)] transition-colors"
      >
        {languages.find((l) => l.key === lang)?.icon}
        <span>{lang.toUpperCase()}</span>
        <ChevronDown size={18} />
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute right-0 mt-2 w-36 bg-[var(--bgThree)] border border-[var(--borderThree)] rounded-md shadow-lg overflow-hidden z-50"
          >
            {languages.map((l) => (
              <button
                key={l.key}
                onClick={() => handleSelect(l.key)}
                className={`cursor-pointer w-full flex items-center gap-2 px-4 py-2 text-[var(--textOne)] hover:bg-[var(--bgOne)] transition-colors ${
                  l.key === lang ? "font-bold text-[var(--primary)]" : ""
                }`}
              >
                {l.icon}
                <span>{l.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
