import React from 'react';

interface ShopRatingProps {
    averageRating: number;
    numberOfRatings: number;
}

const ShopRating = ({ averageRating, numberOfRatings }: ShopRatingProps) => {
    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating % 1 >= 0.5 ? 1 : 0;
    const totalStars = 5;

    return (
        <div className="flex items-center gap-2">
            {numberOfRatings && numberOfRatings > 0 ? (
                <div className="flex items-center relative">
                    {/* Base layer of gray stars */}
                    {Array.from({ length: totalStars }).map((_, index) => (
                        <div key={`base-${index}`} className="w-5 h-5 text-neutral-200 absolute inline-block" style={{ left: `${index * 1.25}rem` }}>★</div>
                    ))}
                    {/* Full blue stars */}
                    {Array.from({ length: fullStars }).map((_, index) => (
                        <div key={`full-${index}`} className="w-5 h-5 text-neutral-400 absolute inline-block" style={{ left: `${index * 1.25}rem` }}>★</div>
                    ))}
                    {/* Half blue star */}
                    {halfStar > 0 && (
                        <div className="w-5 h-5 text-neutral-400 absolute inline-block" style={{ left: `${fullStars * 1.25}rem` }}>
                            <div className="absolute inset-0 clip-star-half">★</div>
                        </div>
                    )}
                    {/* Adjusting positioning of empty stars if needed (already with color, can be removed if not needed) */}
                    {Array.from({ length: totalStars - fullStars - halfStar }).map((_, index) => (
                        <div key={`empty-${index}`} className="w-5 h-5 text-blue-400 absolute inline-block" style={{ left: `${(fullStars + halfStar) * 1.25 + index * 1.25}rem` }}>★</div>
                    ))}
                </div>
            ) : (
                <div className='text-neutral-400'>No ratings yet</div>
            )}
        </div>
    );
};

export default ShopRating;
