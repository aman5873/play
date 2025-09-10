import React from "react";

export default function Chip({
  label,
  contClass = "",
  type = "primary",
  children,
}) {
  if (!label) return null;

  return (
    <div
      className={`flex items-center justify-center gap-1 py-1 mt-3 w-fit rounded-[50px] font-sans text-[0.7rem] md:text-[0.8rem] border
  ${
    type === "primary-gradient"
      ? "border-[var(--primary)] text-[var(--primary)] gradient-selected px-4"
      : type === "primary"
      ? "border-[var(--primary)] text-[var(--primary)]  px-4"
      : "border-[var(--textOne)] text-[var(--textOne)]  px-3"
  }
  ${contClass}`}
    >
      {children && <span className="flex items-center">{children}</span>}
      <span>{label}</span>
    </div>
  );
}
