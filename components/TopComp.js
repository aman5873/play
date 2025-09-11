"use client";
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
} from "lucide-react";

const iconMap = {
  users: Users,
  trophy: Trophy,
  medal: Medal,
  play: Play,
  mission: Disc2,
  game: Gamepad2,
  news: Newspaper,
  trend: TrendingUp,
  upload: Upload,
};

export function ScreenDetailsComp({ content, isCentered }) {
  return (
    <>
      {content?.chip?.length > 0 && (
        <div className="flex flex-wrap justify-center lg:justify-start gap-2">
          {content.chip.map(({ label, type = "primary", icon }, index) => {
            const Icon = iconMap[icon];
            const classStyle =
              type === "primary"
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-[var(--textOne)] text-[var(--textOne)]";

            return (
              <Chip key={`chip-${index}`} label={label} type={type}>
                {Icon && (
                  <div className={`rounded-xl w-fit p-2 ${classStyle}`}>
                    <Icon className=" w-5 h-5 " />
                  </div>
                )}
              </Chip>
            );
          })}
        </div>
      )}
      {/* Titles */}
      <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold font-nyxerin text-[var(--textOne)]">
        {content?.title}
      </h1>
      {content?.highlightTitle && (
        <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl font-bold font-nyxerin text-[var(--primary)]">
          {content.highlightTitle}
        </h2>
      )}
      {/* Description */}
      {content?.description && (
        <p
          className="font-rajdhani text-sm sm:text-base lg:text-lg mt-3 leading-relaxed sm:max-w-[40rem] md:max-w-[42rem]"
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
}

export function ButtonComp({ buttons }) {
  const router = useRouter();
  const handleRedirect = (redirect) => {
    if (!redirect) return;
    router.push(redirect);
  };
  return (
    <>
      {buttons?.length > 0 && (
        <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-5">
          {buttons.map((btn, idx) => {
            const Icon = iconMap[btn?.icon];
            return (
              <button
                key={idx}
                onClick={() => handleRedirect(btn.redirect)}
                className={`px-4 py-2 flex items-center justify-center rounded-[100px] border border-[var(--primary)] cursor-pointer text-sm sm:text-base font-rajdhani font-bold transition-all hover:scale-[1.02] hover:opacity-95 duration-300 shadow-md
                  ${
                    btn.type === "primary"
                      ? "bg-[var(--primary)] text-[var(--secondary)]"
                      : "bg-[var(--secondary)] text-[var(--primary)]"
                  }`}
                style={{
                  minWidth: "120px",
                }}
              >
                {Icon && (
                  <Icon
                    className={`w-5 h-5  mr-2 ${
                      btn.type === "primary"
                        ? "text-[var(--secondary)]"
                        : "text-[var(--primary)]"
                    } `}
                  />
                )}
                <span> {btn.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

export function TopBgComp({ content, children }) {
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
      {/* Full Black Backdrop */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Content */}
      <div className="relative w-full max-w-5xl flex flex-col items-center text-center gap-3 z-10">
        {/* Screen Details */}
        <ScreenDetailsComp content={content} />

        {/* Children content (details grid, image, etc.) */}
        {children}

        {/* Buttons */}
        {content?.button?.length > 0 && <ButtonComp buttons={content.button} />}
      </div>
    </div>
  );
}

export default function TopComp({ content, contClass = "" }) {
  if (!content) return null;

  return (
    <div
      className={`relative w-full rounded-lg gradient-primary p-6 sm:p-8 lg:p-12 flex flex-col-reverse flex-xlg-row items-center gap-6 lg:gap-12 ${contClass}`}
    >
      {/* Text Section */}
      <div className="flex flex-1 flex-col gap-3 text-center lg:text-left max-w-2xl">
        {/* Chips */}
        <ScreenDetailsComp content={content} />
        <div className="grid grid-cols-3 gap-2 mt-8">
          {content?.details?.map((item, idx) => {
            const Icon = iconMap[item.icon]; // map string → component
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center gap-2 p-1"
              >
                {Icon && (
                  <div className="rounded-xl bg-[var(--bgTwo)] border border-[var(--borderTwo)] p-4">
                    <Icon className=" w-5 h-5 text-[var(--primary)] " />
                  </div>
                )}
                <h3 className="text-xl font-bold">{item.label}</h3>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <ButtonComp buttons={content?.button} />
      </div>

      {/* Image Section */}
      {content?.thumbnail && (
        <div className="flex-1 justify-center flex">
          <div
            className="relative aspect-square overflow-hidden flex-shrink-0 w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[400px] 
             rounded-[30px] border border-[var(--borderTwo)] bg-[var(--bgTwo)] backdrop-blur-md shadow-lg "
          >
            <Image
              src={content?.thumbnail}
              alt="thumbnail"
              fill
              className="object-cover rounded-[30px]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
