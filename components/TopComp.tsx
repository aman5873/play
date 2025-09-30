"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Chip from "@/components/common/Chip";

import {
  Users,
  Trophy,
  Medal,
  Play,
  Disc2,
  Gamepad2,
  Newspaper,
  TrendingUp,
  Upload,
  Plus,
  Heart,
  Eye,
  Settings,
} from "lucide-react";

// Map string keys to lucide icons
const iconMap: Record<string, React.ComponentType<any>> = {
  users: Users,
  trophy: Trophy,
  medal: Medal,
  play: Play,
  mission: Disc2,
  game: Gamepad2,
  news: Newspaper,
  trend: TrendingUp,
  upload: Upload,
  add: Plus,
  heart: Heart,
  eye: Eye,
  settings: Settings,
};

// ------------------ Types ------------------
interface ChipItem {
  label?: string;
  type?: string;
  icon?: string;
}

interface ButtonItem {
  label?: string;
  type?: string;
  icon?: string;
  redirect?: string;
}

interface DetailItem {
  label?: string;
  description?: string;
  icon?: string;
}

interface ContentProps {
  chip?: ChipItem[];
  title?: string;
  highlightTitle?: string;
  description?: string;
  button?: ButtonItem[];
  thumbnail?: any;
  details?: DetailItem[];
  backgroundImage?: string;
}

interface ScreenDetailsCompProps {
  content?: ContentProps;
  isCentered?: boolean;
}

interface ButtonCompProps {
  buttons?: ButtonItem[];
}

interface TopBgCompProps {
  content?: ContentProps;
  children?: ReactNode;
}

interface TopCompProps {
  content?: ContentProps;
  contClass?: string;
}

// ------------------ Components ------------------
export const ScreenDetailsComp: React.FC<ScreenDetailsCompProps> = ({
  content,
  isCentered = false,
}) => {
  return (
    <>
      {content?.chip?.length > 0 && (
        <div className="flex flex-wrap justify-center lg:justify-start gap-2">
          {content.chip.map(({ label, type = "primary", icon }, index) => {
            const Icon = icon ? iconMap[icon] : null;
            const classStyle =
              type === "primary"
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-[var(--textOne)] text-[var(--textOne)]";

            return (
              <Chip key={`chip-${index}`} label={label || ""} type={type}>
                {Icon && (
                  <div className={`rounded-xl w-fit p-2 ${classStyle}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                )}
              </Chip>
            );
          })}
        </div>
      )}

      {content?.title && (
        <h1
          className={` ${
            isCentered ? "text-center" : "text-center lg:text-left"
          } text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.75rem] 2xl:text-5xl font-semibold font-nyxerin text-[var(--textOne)]`}
        >
          {content.title}
        </h1>
      )}
      {content?.highlightTitle && (
        <h2
          className={` ${
            isCentered ? "text-center" : "text-center lg:text-left"
          } text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.75rem] 2xl:text-5xl font-bold font-nyxerin text-[var(--primary)]`}
        >
          {content.highlightTitle}
        </h2>
      )}

      {content?.description && (
        <p
          className="font-rajdhani text-sm sm:text-base lg:text-lg xl:text-xl mt-3 leading-relaxed sm:max-w-[40rem] md:max-w-[42rem]"
          style={{
            color: "#ccc",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: isCentered ? "center" : "left",
          }}
        >
          {content.description}
        </p>
      )}
    </>
  );
};

export const ButtonComp: React.FC<ButtonCompProps> = ({ buttons }) => {
  const router = useRouter();

  const handleRedirect = (redirect?: string) => {
    if (!redirect) return;
    router.push(redirect);
  };

  return (
    <>
      {buttons?.length > 0 && (
        <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-4">
          {buttons.map((btn, idx) => {
            const Icon = btn.icon ? iconMap[btn.icon] : null;

            return (
              <AppButton
                key={idx}
                onClick={() => handleRedirect(btn.redirect)}
                type={btn.type}
                label={btn.label}
                Icon={Icon}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export function AppButton({
  onClick,
  type = "primary",
  label,
  Icon = null,
  icon = null,
}) {
  const IconComp = icon ? iconMap[icon] : null;

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 flex items-center justify-center rounded-[100px] border border-[var(--primary)] cursor-pointer text-sm sm:text-base font-rajdhani font-bold transition-all hover:scale-[1.02] hover:opacity-95 duration-300 shadow-md
                  ${
                    type === "primary"
                      ? "bg-[var(--primary)] text-[var(--secondary)]"
                      : "bg-[var(--secondary)] text-[var(--primary)]"
                  }`}
      style={{ minWidth: "120px" }}
    >
      {Icon && (
        <Icon
          className={`w-5 h-5 mr-2 ${
            type === "primary"
              ? "text-[var(--secondary)]"
              : "text-[var(--primary)]"
          }`}
        />
      )}
      {IconComp && (
        <IconComp
          className={`w-5 h-5 mr-1  font-bold${
            type === "primary"
              ? "text-[var(--secondary)]"
              : "text-[var(--primary)]"
          }`}
        />
      )}
      <span>{label}</span>
    </button>
  );
}

export const TopBgComp: React.FC<TopBgCompProps> = ({ content, children }) => {
  const backgroundImage = content?.backgroundImage;

  return (
    <div
      className="relative w-full rounded-lg overflow-hidden flex items-center justify-center p-6 sm:p-8 lg:p-12"
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : {}
      }
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Content */}
      <div className="relative w-full max-w-5xl flex flex-col items-center text-center gap-3 z-10">
        <ScreenDetailsComp content={content} isCentered={true} />
        {children}
        {content?.button?.length > 0 && <ButtonComp buttons={content.button} />}
      </div>
    </div>
  );
};
const TopComp: React.FC<TopCompProps> = ({ content, contClass }) => {
  if (!content) return null;

  return (
    <div
      className={`relative w-full 
      mx-auto rounded-lg gradient-primary 
      p-6 sm:p-8 lg:p-12 xl:px-16 2xl:px-24 
      flex flex-col-reverse lg:flex-row items-center 
      gap-6 lg:gap-12 xl:gap-16 2xl:gap-20 ${contClass || ""}`}
    >
      {/* Text Section */}
      <div
        className="flex flex-[1] flex-col gap-3 text-center lg:text-left 
      w-full xl:max-w-[50%] 2xl:max-w-[55%]"
      >
        <ScreenDetailsComp content={content} />

        <div className="grid grid-cols-3 gap-3 mt-8">
          {content?.details?.map((item, idx) => {
            const Icon = item.icon ? iconMap[item.icon] : null;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center gap-3 p-2"
              >
                {Icon && (
                  <div className="rounded-xl bg-[var(--bgTwo)] border border-[var(--borderTwo)] p-4 xl:p-5">
                    <Icon className="w-6 h-6 xl:w-7 xl:h-7 text-[var(--primary)]" />
                  </div>
                )}
                <h3 className="text-lg xl:text-xl font-bold">{item.label}</h3>
                <p className="text-sm xl:text-base text-gray-300">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <ButtonComp buttons={content?.button} />
      </div>

      {/* Image Section */}
      {content?.thumbnail && (
        <div className="flex flex-[1] justify-center xl:justify-end w-full xl:max-w-[50%] 2xl:max-w-[45%]">
          <div
            className="
              relative aspect-square overflow-hidden flex-shrink-0 
              w-[220px] sm:w-[280px] md:w-[320px] lg:w-[380px] 
              xl:w-[480px] 2xl:w-[540px] 
              rounded-[30px] border border-[var(--borderTwo)] bg-[var(--bgTwo)] backdrop-blur-md shadow-lg"
          >
            <Image
              src={content.thumbnail}
              alt="thumbnail"
              fill
              className="object-cover rounded-[30px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopComp;
