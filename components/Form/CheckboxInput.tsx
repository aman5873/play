"use client";
import React from "react";

interface CheckboxProps {
  label?: string;
  description?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  variant?: "primary" | "primaryTwo" | "secondary"; // unified variants
}

export default function CheckboxInput({
  label,
  description = "",
  checked = false,
  onChange,
  variant = "primary", // default to primary
}: CheckboxProps) {
  const primaryStyle = variant === "primary";
  const primaryTwoStyle = variant === "primaryTwo";
  const secondaryStyle = variant === "secondary";

  // Border & background colors based on variant
  const borderColor = primaryStyle
    ? "var(--borderTwo)" // primary border
    : primaryTwoStyle
    ? "var(--borderOne)" // primaryTwo border
    : "var(--textTwo)"; // secondary border

  const bgColorChecked = primaryStyle
    ? "var(--primary)" // primary checked bg
    : primaryTwoStyle
    ? "var(--bgTwo)" // primaryTwo checked bg
    : "var(--bgThree)"; // secondary checked bg

  const textColor = "var(--textOne)";
  const descriptionColor = "var(--textTwo)";

  return (
    <label className="flex flex-col cursor-pointer gap-1">
      {label && (
        <span style={{ color: textColor }} className="select-none">
          {label}
        </span>
      )}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="w-5 h-5 rounded border-2 focus:outline-none transition-colors duration-200"
          style={{
            borderColor: borderColor,
            backgroundColor: checked ? bgColorChecked : "transparent",
            color: textColor,
          }}
        />
        {description && (
          <span style={{ color: descriptionColor }} className="text-sm">
            {description}
          </span>
        )}
      </div>
    </label>
  );
}
