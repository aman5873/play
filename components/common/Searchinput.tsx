"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  debounceMs?: number;
  placeholder?: string;
  className?: string;
  type?: any;
}

export default function SearchInput({
  value,
  onChange,
  debounceMs = 300,
  placeholder = "Search...",
  className = "",
  type = "primary",
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(value);

  // Sync external
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (internalValue !== value) {
        onChange(internalValue);
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [internalValue, debounceMs, onChange, value]);

  const handleClear = () => {
    setInternalValue("");
    onChange(""); // trigger parent reset immediately
  };

  return (
    <div
      className={`flex relative items-center rounded-[100px] px-2 ${className}`}
      style={
        type === "primary"
          ? {
              backgroundColor: "var(--bgOne)",
              border: "2px solid var(--borderOne)",
            }
          : {
              backgroundColor: "var(--bgTwo)",
              border: "2px solid var(--borderTwo)",
            }
      }
    >
      <Search size={18} color="var(--textOne)" />

      <input
        type="text"
        placeholder={placeholder}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        className="ml-2 relative bg-transparent outline-none px-1 py-1 w-full sm:w-40 md:w-72"
        style={{
          color: "var(--textOne)",
          caretColor: "var(--textOne)",
        }}
      />

      {/* ❌ Clear Icon (shows only when text exists) */}
      {internalValue?.length > 0 && (
        <button
          onClick={handleClear}
          className="absolute right-2 cursor-pointer ml-2 p-1 rounded-full hover:bg-[var(--borderOne)] transition"
        >
          <X size={16} color="var(--textOne)" />
        </button>
      )}
    </div>
  );
}
