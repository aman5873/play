import { Star, StarHalf } from "lucide-react";

interface RatingCompProps {
  avg_rating: number; // e.g. 3.5
  count?: number; // number of reviews
  maxStars?: number; // optional, default 5
}

export function RatingComp({
  avg_rating,
  count,
  maxStars = 5,
}: RatingCompProps) {
  const stars = [];

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
    <div className="flex-1">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex">{stars}</div>
          <span className="text-sm text-[var(--subtitle)]">
            {avg_rating.toFixed(1)}/5
          </span>
        </div>
      </div>
      {count && (
        <p className="text-base mt-1 text-[var(--subtitle)]">
          {count} user review{count !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
