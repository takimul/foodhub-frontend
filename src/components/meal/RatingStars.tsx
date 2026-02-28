"use client";

import { Star } from "lucide-react";

interface Props {
  rating: number;
}

export function RatingStars({ rating }: Props) {
  const rounded = Math.round(rating);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={18}
          className={
            i <= rounded ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
        />
      ))}
      <span className="text-sm text-gray-500 ml-2">({rating.toFixed(1)})</span>
    </div>
  );
}
