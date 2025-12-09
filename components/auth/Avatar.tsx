"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface AvatarProps {
  user?: {
    name?: string;
    email?: string;
    avatar_url?: string;
    level?: any;
  };
  size?: number; // size in px
  isHeader?: boolean;
  contClass?: string;
}

export default function Avatar({
  user,
  size = 80,
  isHeader = false,
  contClass = "",
}: AvatarProps) {
  const { t: tCommon } = useTranslation("common");

  // ✅ Memoized avatar icon, re-renders whenever user or avatar_url changes
  const AvatarIcon = useMemo(() => {
    const fallbackChar =
      user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U";

    return (
      <div
        className={`relative rounded-full overflow-hidden bg-[var(--secondary)] flex items-center justify-center text-[var(--primary)] font-bold ${contClass}`}
        style={{ width: size, height: size }}
      >
        {user?.avatar_url ? (
          <Image
            key={user.avatar_url} // 👈 re-renders when avatar changes
            src={user.avatar_url}
            alt={fallbackChar}
            fill
            className="object-cover"
          />
        ) : (
          <span style={{ fontSize: size / 2 }} className="select-none">
            {fallbackChar}
          </span>
        )}
      </div>
    );
  }, [user, user?.avatar_url, user?.name, user?.email, size, contClass]);

  // ✅ Header layout (unchanged)
  if (isHeader) {
    return (
      <div className="flex items-center p-1 sm:px-3 sm:py-1.5 gap-2 rounded-[100px] border-[2px] border-[var(--borderOne)] bg-[var(--bgOne)] text-[var(--textOne)] hover:bg-[var(--bgTwo)] hover:border-[var(--borderTwo)]">
        {AvatarIcon}
        <div className="hidden sm:flex flex-col text-[var(--textOne)] text-sm">
          <span
            className="font-semibold"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {user?.name}
          </span>
          {/* <span className="text-[var(--textTwo)] text-[12px]">
            {tCommon("level")} {user?.level ?? "-"}
          </span> */}
        </div>
      </div>
    );
  }

  return AvatarIcon;
}
