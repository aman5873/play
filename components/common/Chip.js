import React from "react";

export default function Chip({ label, contClass }) {
  if (label)
    return (
      <p
        className={`font-sans text-[0.7rem] md:text-[0.8rem]  m-0 mt-3 ${contClass}`}
        style={{
          background: "var(--title)",
          color: "var(--background)",
          width: "fit-content",
          borderRadius: 14,
          padding: "2px 8px",
          marginBottom: 5,
        }}
      >
        {label}
      </p>
    );
}
