// icons/index.tsx

import Coin from "@/app/icons/coin.svg";
import RankSecondary from "@/app/icons/rankSecondary.svg";
import Crown from "@/app/icons/crown.svg";
import Discord from "@/app/icons/discord.svg";
import Ios from "@/app/icons/ios.svg";
import Android from "@/app/icons/android.svg";
import Asset from "@/app/icons/asset.svg";
import Bank from "@/app/icons/bank.svg";
import Bitcoin from "@/app/icons/bitcoin.svg";
import Benefit from "@/app/icons/benefit.svg";
import Badge from "@/app/icons/badge.svg";
import Card from "@/app/icons/card.svg";
import Chats from "@/app/icons/chats.svg";
import Dollar from "@/app/icons/dollar.svg";
import GameRegister from "@/app/icons/gameRegister.svg";
import GameRegisterTwo from "@/app/icons/gameRegisterTwo.svg";
import Home from "@/app/icons/home.svg";
import Instagram from "@/app/icons/instagram.svg";
import Leaderboard from "@/app/icons/leaderboard.svg";
import Media from "@/app/icons/media.svg";
import News from "@/app/icons/news.svg";
import Nft from "@/app/icons/nft.svg";
import Paypal from "@/app/icons/paypal.svg";
import Search from "@/app/icons/search.svg";
import Social from "@/app/icons/social.svg";
import Streak from "@/app/icons/streak.svg";
import Store from "@/app/icons/store.svg";
import Star from "@/app/icons/star.svg";
import Team from "@/app/icons/team.svg";
import Tiktok from "@/app/icons/tiktok.svg";
import Trophy from "@/app/icons/trophy.svg";
import TrophyStar from "@/app/icons/trophyStar.svg";
import Upload from "@/app/icons/upload.svg";
import Wallet from "@/app/icons/wallet.svg";
import X from "@/app/icons/x.svg";

//

type IconProps = {
  size?: number;
  color?: string;
  className?: string;
  stroke?: any;
  fill?: any;
};

const wrapIcon = (Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>) => {
  const WrappedIcon = ({
    size = 20,
    color = "currentColor",
    stroke = "none",
    className = "",
    fill = "none",
    ...props
  }: IconProps) => (
    <Icon
      width={size}
      height={size}
      className={className}
      // aria-hidden="true"
      // fill={color}
      // stroke={stroke}
      fill={fill ?? "currentColor"} // 👈 use fill if not provided
      stroke={stroke ?? "currentColor"}
      {...props}
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
export const AssetIcon = wrapIcon(Asset);
export const BankIcon = wrapIcon(Bank);
export const BitcoinIcon = wrapIcon(Bitcoin);
export const BenefitIcon = wrapIcon(Benefit);
export const BadgeIcon = wrapIcon(Badge);
export const CardIcon = wrapIcon(Card);
export const ChatsIcon = wrapIcon(Chats);
export const DollarIcon = wrapIcon(Dollar);
export const GameRegisterIcon = wrapIcon(GameRegister);
export const GameRegisterTwoIcon = wrapIcon(GameRegisterTwo);
export const HomeIcon = wrapIcon(Home);
export const InstagramIcon = wrapIcon(Instagram);
export const LeaderboardIcon = wrapIcon(Leaderboard);
export const MediaIcon = wrapIcon(Media);
export const NewsIcon = wrapIcon(News);
export const NftIcon = wrapIcon(Nft);
export const PaypalIcon = wrapIcon(Paypal);
export const SearchIcon = wrapIcon(Search);
export const SocialIcon = wrapIcon(Social);
export const StoreIcon = wrapIcon(Store);
export const StarIcon = wrapIcon(Star);
export const CommunityIcon = wrapIcon(Social);
export const StreakIcon = wrapIcon(Streak);
export const TeamIcon = wrapIcon(Team);
export const TiktokIcon = wrapIcon(Tiktok);
export const TrophyIcon = wrapIcon(Trophy);
export const TrophyStarIcon = wrapIcon(TrophyStar);
export const UploadIcon = wrapIcon(Upload);
export const WalletIcon = wrapIcon(Wallet);
export const XIcon = wrapIcon(X);
