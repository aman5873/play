// icons/index.tsx

import Coin from "@/app/icons/coin.svg";
import RankSecondary from "@/app/icons/rankSecondary.svg";
import Crown from "@/app/icons/crown.svg";
import Discord from "@/app/icons/discord.svg";
import Ios from "@/app/icons/ios.svg";
import Android from "@/app/icons/android.svg";

//

type IconProps = {
  size?: number;
  color?: string;
  className?: string;
  stroke?: any;
};

const wrapIcon = (Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>) => {
  const WrappedIcon = ({
    size = 20,
    color = "currentColor",
    stroke = "",
    className = "",
  }: IconProps) => (
    <Icon
      width={size}
      height={size}
      fill={color}
      className={className}
      aria-hidden="true"
      stroke={stroke}
    />
  );

  WrappedIcon.displayName = Icon.displayName || "WrappedIcon"; // optional, for DevTools
  return WrappedIcon;
};

export const CoinIcon = wrapIcon(Coin);
export const RankSecondaryIcon = wrapIcon(RankSecondary);
export const CrownIcon = wrapIcon(Crown);
export const DiscordIcon = wrapIcon(Discord);
export const AndroidIcon = wrapIcon(Android);
export const IosIcon = wrapIcon(Ios);
