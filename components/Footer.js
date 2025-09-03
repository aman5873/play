import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-center py-4 text-sm px-10">
      <div
        style={{
          borderTop: "0.5px solid var(--subtitle)",
          opacity: 0.5,
          marginBottom: 16,
        }}
      />
      © {currentYear} IMM Play. All rights reserved.
    </footer>
  );
}
