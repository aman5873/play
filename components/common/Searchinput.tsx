"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  debounceMs?: number;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  debounceMs = 300,
  placeholder = "Search...",
  className = "",
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(value);

  // Sync with external value
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      if (internalValue !== value) {
        onChange(internalValue);
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [internalValue, debounceMs, onChange, value]);

  return (
    <div
      className={`flex items-center rounded-[100px] px-2 ${className}`}
      style={{
        backgroundColor: "var(--bgOne)",
        border: "2px solid var(--borderOne)",
      }}
    >
      <Search size={18} color="var(--textOne)" />
      <input
        type="text"
        placeholder={placeholder}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        className="ml-2 bg-transparent outline-none px-1 py-1 w-full sm:w-40 md:w-72"
        style={{
          color: "var(--textOne)",
          caretColor: "var(--textOne)",
        }}
      />
    </div>
  );
}
