import { Star, StarHalf } from "lucide-react";
import { useTranslation } from "react-i18next";

interface RatingCompProps {
  avg_rating: number; // e.g. 3.5
  count?: number; // number of reviews
  maxStars?: number; // optional, default 5
  isBold?: boolean;
}

export function RatingComp({
  avg_rating,
  count,
  maxStars = 5,
  isBold = false,
}: RatingCompProps) {
  const stars = [];
  const { t: tCommon } = useTranslation("common");

  for (let i = 1; i <= maxStars; i++) {
    if (avg_rating >= i) {
      stars.push(<Star key={i} className="w-5 h-5 text-yellow-400" />);
    } else if (avg_rating + 0.5 >= i) {
      stars.push(<StarHalf key={i} className="w-5 h-5 text-yellow-400" />);
    } else {
      // For empty stars, just push a transparent or gray star if you like
      stars.push(
        <Star key={i} className="w-5 h-5 text-yellow-100 opacity-30" />
      );
    }
  }

  return (
    <div className="flex flex-1 items-center gap-2">
      <div className="flex">{stars}</div>
      <span
        className={
          isBold
            ? "text-sm text-[var(--textOne)] font-semibold"
            : "text-sm text-[var(--textTwo)]"
        }
      >
        {avg_rating?.toFixed(1)}/5
      </span>
      {count && (
        <p className="text-base m-0 text-[var(--textTwo)]">
          ({count} {count !== 1 ? tCommon("review") : tCommon("reviews")})
        </p>
      )}
    </div>
  );
}
