// icons/index.tsx

import Coin from "@/app/icons/coin.svg";
import RankSecondary from "@/app/icons/rankSecondary.svg";
import Crown from "@/app/icons/crown.svg";
import Discord from "@/app/icons/discord.svg";
//

type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const wrapIcon = (Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>) => {
  const WrappedIcon = ({
    size = 20,
    color = "currentColor",
    className = "",
  }: IconProps) => (
    <Icon
      width={size}
      height={size}
      fill={color}
      className={className}
      aria-hidden="true"
    />
  );

  WrappedIcon.displayName = Icon.displayName || "WrappedIcon"; // optional, for DevTools
  return WrappedIcon;
};

export const CoinIcon = wrapIcon(Coin);
export const RankSecondaryIcon = wrapIcon(RankSecondary);
export const CrownIcon = wrapIcon(Crown);
export const DiscordIcon = wrapIcon(Discord);
