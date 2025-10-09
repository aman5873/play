import React from "react";
import { useTranslation } from "react-i18next";
import { Wallet } from "lucide-react";
import Link from "next/link";

import { walletData } from "@/constants/data";

export default function WalletChipComp() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <Link
      href="/wallet"
      className="hidden sm:flex cursor-pointer flex items-center px-5 py-1 gap-2 rounded-full border-[2px] border-[var(--borderOne)] bg-[var(--bgOne)] text-[var(--textOne)] hover:bg-[var(--bgTwo)] hover:border-[var(--borderTwo)]"
    >
      <Wallet size={25} className="text-[var(--primary)]" />
      <div className="flex flex-col">
        <span
          className="text-[var(--textTwo)] text-[12px]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {tScreen("wallet.labels.walletBalance")}
        </span>
        <span className="text-md text-[var(--textOne)] font-semibold">
          {walletData?.balance}
        </span>
      </div>
    </Link>
  );
}
