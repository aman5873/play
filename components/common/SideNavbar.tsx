"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Trophy,
  Disc2,
  Gamepad2,
  Newspaper,
  Users,
  TrendingUp,
  Store,
  Gift,
  BadgeCent,
} from "lucide-react";
import { useTranslation } from "react-i18next";

type NavItem = {
  key: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  active?: boolean;
};

// --------------------- NAV ITEMS ---------------------
const navItems: NavItem[] = [
  { key: "home", label: "Home", href: "/", icon: Home, active: true },
  {
    key: "tournaments",
    label: "Tournaments",
    href: "/tournaments",
    icon: Trophy,
    active: true,
  },
  {
    key: "games",
    label: "Games",
    href: "/games",
    icon: Gamepad2,
    active: true,
  },
  {
    key: "missions",
    label: "Missions",
    href: "/missions",
    icon: Disc2,
    active: false,
  },
  { key: "news", label: "News", href: "/news", icon: Newspaper, active: false },
  {
    key: "social",
    label: "Social Hub",
    href: "/social",
    icon: Users,
    active: false,
  },
  {
    key: "levels",
    label: "Levels",
    href: "/levels",
    icon: TrendingUp,
    active: false,
  },
  {
    key: "store",
    label: "Online Store",
    href: "/store",
    icon: Store,
    active: false,
  },
  {
    key: "benefits",
    label: "Benefits",
    href: "/benefits",
    icon: Gift,
    active: false,
  },
  {
    key: "nft",
    label: "NFT Marketplace",
    href: "/nft",
    icon: BadgeCent,
    active: false,
  },
  {
    key: "communities",
    label: "Communities",
    href: "/communities",
    icon: Users,
    active: false,
  },
];

// --------------------- COMMON SIDEBAR NAV ---------------------
function SidebarNav({
  navItems,
  onClick,
  variant = "desktop",
}: {
  navItems: NavItem[];
  onClick?: () => void;
  variant?: "desktop" | "mobile";
}) {
  const pathname = usePathname();
  const { t: tNav } = useTranslation("navigation");

  return (
    <nav className="flex flex-col gap-2 font-rajdhani font-semibold">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActiveRoute = pathname === item.href;

        const label = tNav(item.key); // <-- translate the key

        if (!item.active) {
          return (
            <div
              key={item.key}
              className="flex items-center gap-3 text-[var(--textTwo)] cursor-not-allowed py-2 px-3 border-[1px] border-[transparent] rounded-md"
            >
              <span className="w-[25px] h-[25px] flex items-center justify-center rounded-md">
                <Icon size={variant === "mobile" ? 22 : 17} />
              </span>
              <span>{label}</span>
            </div>
          );
        }

        return (
          <Link
            key={item.key}
            href={item.href}
            onClick={onClick}
            className={`flex items-center gap-3 py-2 px-3 rounded-md transition-colors border-[1px]
              ${
                isActiveRoute
                  ? "gradient-selected text-[var(--primary)] border-[var(--primary)]"
                  : "text-[var(--textOne)] hover:text-[var(--primary)] border-transparent"
              }
            `}
          >
            <span className="w-[25px] h-[25px] flex items-center justify-center rounded-md">
              <Icon size={variant === "mobile" ? 22 : 17} />
            </span>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

// --------------------- DESKTOP SIDEBAR ---------------------
export function Sidebar() {
  return (
    <div className="hidden lg:flex flex-col h-full w-64 flex-shrink-0 bg-[var(--secondary)] p-4 overflow-y-auto">
      <Link href="/" className="flex items-center justify-center mb-8">
        <Image
          src="/logo.png"
          alt="Brand Logo"
          width={86}
          height={50}
          className="rounded-md"
          priority
        />
      </Link>
      <SidebarNav navItems={navItems} />
    </div>
  );
}

// --------------------- MOBILE SIDEBAR ---------------------
export function MobileSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-64 h-full bg-[var(--secondary)] p-4"
            onClick={(e) => e.stopPropagation()}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Link href="/" className="flex items-center justify-center mb-8">
              <Image
                src="/logo.png"
                alt="Brand Logo"
                width={86}
                height={50}
                className="rounded-md"
                priority
              />
            </Link>

            <SidebarNav
              navItems={navItems}
              onClick={onClose}
              variant="mobile"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
