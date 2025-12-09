import React from "react";
import {
  Users,
  Trophy,
  Medal,
  Play,
  Disc2,
  Gamepad2,
  Clock,
  LucideIcon,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  TrendingUp,
  Newspaper,
  Flame,
  Upload,
  Globe,
  Heart,
} from "lucide-react";

interface CardChipProps {
  label: string;
  style?: React.CSSProperties;
  contClass?: string;
}

interface CardCompProps {
  categories: string[];
  maxVisible?: number;
  children?: React.ReactNode;
}

interface CardIconItem {
  icon: keyof typeof iconMap;
  label: string | number;
  description: string;
  color?: string;
}

interface CardIconInfoProps {
  list: CardIconItem[];
  minWidth?: string;
}

interface ProgressBarProps {
  label?: string;
  count: number;
  maxCount: number;
  fillStyle?: React.CSSProperties;
  contStyle?: React.CSSProperties;
  showPercent?: boolean;
  showCount?: boolean;
}

export const iconMap = {
  users: Users,
  trophy: Trophy,
  medal: Medal,
  play: Play,
  mission: Disc2,
  game: Gamepad2,
  clock: Clock,
  calender: Calendar,
  left: ChevronLeft,
  right: ChevronRight,
  eye: Eye,
  trend: TrendingUp,
  news: Newspaper,
  flame: Flame,
  upload: Upload,
  globe: Globe,
  heart: Heart,
} satisfies Record<string, LucideIcon>;

export function CardChip({
  label,
  style,
  contClass = "",
  borderColor = "var(--borderTwo)",
  color = "var(--textOne)",
  bg = "var(--bgTwo)",
  onClick = null,
}: any) {
  if (label)
    return (
      <div
        onClick={onClick}
        className={`bg-[${bg}] ${
          onClick ? "cursor-pointer" : ""
        } border border-[${borderColor}] rounded-[20px] px-2 py-1 text-center flex items-center justify-center text-sm  text-[${color}] flex-shrink-0 min-w-[45px] w-fit capitalize ${contClass}`}
        style={style}
      >
        {label}
      </div>
    );
}

export function CardSection({ label = "", children, contClass = "" }) {
  return (
    <div
      className={`gradient-one border p-2 sm:p-4  gap:-2 gap-4  rounded-[16px] flex flex-col  border-[var(--borderThree)] ${contClass}`}
    >
      {label && (
        <h1 className="text-lg lg:text-xl font-semibold text-[var(--textOne)]">
          {label}
        </h1>
      )}
      {children}
    </div>
  );
}
export function CardIconInfo({ list, minWidth = "7.5rem" }: CardIconInfoProps) {
  return (
    <div className="grid grid-cols-2 gap-6 my-2">
      {list?.map((item, idx) => {
        const Icon = iconMap[item.icon];

        return (
          <div
            key={idx}
            className={`flex items-center gap-2 rounded-xl ${
              (idx + 1) % 2 === 0 ? "justify-self-end" : ""
            }`}
          >
            {Icon && (
              <div className="rounded-xl bg-[var(--bgThree)] p-2 sm:p-3 flex items-center justify-center">
                <Icon
                  className="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7"
                  style={{ color: item.color || "var(--textOne)" }}
                />
              </div>
            )}
            <div
              className="flex flex-col items-start text-left"
              style={{ minWidth }}
            >
              <h3
                className="text-base sm:text-lg xl:text-xl 2xl:text-2xl font-bold"
                style={{ color: item.color || "var(--textOne)" }}
              >
                {item.label}
              </h3>
              <p className="text-xs sm:text-sm md:text-base xl:text-lg 2xl:text-xl text-[var(--textTwo)]">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function IconLabelInfo({
  icon,
  label,
  labelStyle = {},
  contStyle = {},
}) {
  const Icon = iconMap[icon];
  return (
    <div className="flex gap-2 text-[var(--primary)]" style={contStyle}>
      {Icon && <Icon className="w-6 h-6" />}
      <h3 className="text-lg font-bold" style={labelStyle}>
        {label}
      </h3>
    </div>
  );
}

export function SectionDetails({
  list,
  contClass,
}: {
  list?: any[];
  contClass?: any;
}) {
  if (!list || list?.length === 0) return null;

  return (
    <div
      className={`flex flex-wrap gap-6 w-full  mx-auto my-2 border-1 border-[var(--borderThree)] gradient-one rounded-xl mx-2 sm:mx-1 mt-2 py-5 ${contClass}`}
    >
      {list.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-1 flex-col items-center justify-center text-center "
        >
          <h3
            className="text-xl font-bold"
            style={{ color: item.color || "var(--textOne)" }}
          >
            {item.label}
          </h3>
          <p className="text-sm text-[var(--textOne)] w-fit  min-w-[100px]">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ProgressBar({
  label,
  count,
  maxCount,
  fillStyle = {},
  contStyle = {},
  showPercent = false,
  showCount = true,
}: ProgressBarProps) {
  const safeCount = Math.max(0, Math.min(count, maxCount)); // ensure count is within 0-maxCount
  const percentage = maxCount > 0 ? (safeCount / maxCount) * 100 : 0;

  return (
    <div className="w-full space-y-1 my-1">
      {/* Label */}
      {showCount && (
        <div className="flex justify-between text-md font-semibold text-[var(--textTwo)]">
          <span>{label}</span>
          <span className="text-sm">
            {showPercent ? `${count}%` : `${safeCount}/${maxCount}`}
          </span>
        </div>
      )}

      {/* Progress bar container */}
      <div
        className={`w-full h-4 rounded-lg  bg-[var(--bgThree)] overflow-hidden`}
        style={{ ...contStyle }}
      >
        <div
          className={`h-full gradient-fill transition-all duration-500`}
          style={{ width: `${percentage}%`, ...fillStyle }}
        />
      </div>
    </div>
  );
}

export function CategoryCardComp({
  categories,
  maxVisible = 2,
  children,
}: CardCompProps) {
  const visibleCategories = categories?.slice(0, maxVisible);
  const remainingCount = categories?.length - maxVisible;

  const allowWrap = maxVisible > 2;

  if (visibleCategories?.length > 0)
    return (
      <div
        className={`flex gap-2 mt-1 ${
          allowWrap ? "flex-wrap" : "flex-nowrap overflow-x-auto scrollbar-hide"
        }`}
      >
        {visibleCategories?.map((category, index) => (
          <CardChip label={category} key={index} />
        ))}

        {remainingCount > 0 && <CardChip label={`+${remainingCount}`} />}

        {children}
      </div>
    );
}
