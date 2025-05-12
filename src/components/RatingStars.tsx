import React, { useState } from 'react';
import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  ratingsCount?: number;
  userRating?: number;
  onRate?: (rating: number) => void;
  readOnly?: boolean;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  ratingsCount,
  userRating,
  onRate,
  readOnly = false
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const displayRating = hoverRating !== null ? hoverRating : userRating || rating;

  const renderStars = () => {
    const stars = [];
    const totalStars = 5;

    for (let i = 1; i <= totalStars; i++) {
      const starValue = i;
      const filled = starValue <= displayRating;
      const halfFilled = !filled && starValue <= displayRating + 0.5;

      stars.push(
        <span
          key={i}
          onMouseEnter={() => !readOnly && setHoverRating(starValue)}
          onMouseLeave={() => !readOnly && setHoverRating(null)}
          onClick={() => !readOnly && onRate && onRate(starValue)}
          className={`cursor-${readOnly ? 'default' : 'pointer'}`}
        >
          {halfFilled ? (
            <StarHalf className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400" />
          ) : (
            <Star
              className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          )}
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="flex gap-0.5 sm:gap-1 items-center select-none">
      {renderStars()}
      {ratingsCount !== undefined && rating !== 0 && 
        <span className="text-xs sm:text-sm text-muted-foreground ml-1">
          {rating.toFixed(1)}
        </span>
      }
    </div>
  );
};

export default RatingStars;
