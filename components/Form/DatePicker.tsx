"use client";

import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import type { Instance as FlatpickrInstance } from "flatpickr/dist/types/instance";
import { Calendar as CalendarIcon } from "lucide-react";
import "flatpickr/dist/flatpickr.min.css";
import "./datePicker.css";

type Props = {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
  mode?: "single" | "range";
  required?: boolean;
  isError?: boolean;
  errorMessage?: string;
  variant?: "primary" | "secondary"; // ✅ unified variant
  readOnly?: boolean;
};

export default function DatePicker({
  id,
  label,
  placeholder,
  value,
  onChange,
  mode = "single",
  required = false,
  isError = false,
  errorMessage,
  variant = "primary",
  readOnly = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const fpRef = useRef<FlatpickrInstance | null>(null);

  const errMessage =
    errorMessage || (label ? `${label} is required` : "This field is required");

  useEffect(() => {
    if (!inputRef.current) return;

    fpRef.current?.destroy();

    const instance = flatpickr(inputRef.current, {
      mode,
      dateFormat: "Y-m-d",
      appendTo: document.body,
      clickOpens: !readOnly,
      allowInput: !readOnly,
      onChange: (dates, _str, inst) => {
        const out = dates[0] ? inst.formatDate(dates[0], "Y-m-d") : "";
        onChange?.(out);
      },
      onOpen: () => {
        if (readOnly) instance.close();
        const el = instance.calendarContainer;
        if (el) {
          el.style.zIndex = "100010";
          el.style.position = "absolute";
          el.style.backgroundColor = "var(--bgTwo)";
          el.style.border = "1px solid var(--borderTwo)";
          el.style.borderRadius = "10px";
          el.style.color = "var(--textOne)";
        }
      },
      onReady: (_dates, _str, inst) => {
        const container = inst.calendarContainer;
        if (!container) return;
        if (container.querySelector(".flatpickr-footer")) return;

        const footer = document.createElement("div");
        footer.className =
          "flatpickr-footer flex justify-between items-center px-3 py-2 border-t text-sm text-[var(--textOne)]";

        const todayBtn = document.createElement("button");
        todayBtn.textContent = "Today";
        todayBtn.className =
          "text-[var(--primary)] hover:underline transition-colors";
        todayBtn.onclick = () => {
          if (!readOnly) {
            const today = new Date();
            inst.setDate(today, true);
          }
        };

        const clearBtn = document.createElement("button");
        clearBtn.textContent = "Clear";
        clearBtn.className = "text-red-500 hover:underline transition-colors";
        clearBtn.onclick = () => {
          if (!readOnly) {
            inst.clear();
            onChange?.("");
          }
        };

        footer.appendChild(todayBtn);
        footer.appendChild(clearBtn);
        container.appendChild(footer);
      },
    });

    fpRef.current = instance;

    return () => {
      instance.destroy();
      fpRef.current = null;
    };
  }, [mode, onChange, readOnly]);

  useEffect(() => {
    if (!fpRef.current) return;
    if (value) {
      fpRef.current.setDate(value, false);
    } else {
      fpRef.current.clear();
    }
  }, [value]);

  // 🎨 Switched primary ↔ secondary styles
  const isPrimary = variant === "primary";

  const baseClasses = `
    w-full px-3 py-2 rounded-[10px] border 
    ${
      isError
        ? "border-red-500"
        : isPrimary
        ? "border-[var(--borderOne)]"
        : "border-[var(--borderTwo)]"
    }
    ${
      isPrimary
        ? "bg-[var(--bgOne)] text-[var(--textOne)] placeholder:text-[var(--placeholder)]"
        : "bg-[var(--bgTwo)] text-[var(--textOne)] placeholder:text-[var(--placeholder)]"
    }
    outline-none transition-all duration-200
    ${
      isPrimary
        ? "focus:border-[var(--borderTwo)] focus:bg-[var(--bgTwo)]"
        : "focus:border-[var(--borderOne)] focus:bg-[var(--bgOne)]"
    }
  `;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-[var(--textOne)] text-md font-medium"
        >
          {label} {required && "*"}
        </label>
      )}

      <div className={`relative group transition-all duration-200 ease-in-out`}>
        <input
          id={id}
          ref={inputRef}
          value={value || ""}
          required={required}
          placeholder={placeholder || "Select date"}
          readOnly
          onKeyDown={(e) => e.preventDefault()}
          className={`${baseClasses} group-hover:border-[var(--borderOne)]`}
        />

        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--textTwo)] group-hover:text-[var(--primary)] transition-colors">
          <CalendarIcon size={18} />
        </span>
      </div>

      {isError && <p className="text-red-500 text-sm mt-1">{errMessage}</p>}
    </div>
  );
}
