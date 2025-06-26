import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

function StarRating({ rating }: { rating: number }) {
  const getStarColor = (starNumber: number) => {
    if (starNumber <= 3) {
      return { className: "text-red-500", stroke: "#f87171" };
    } else if (starNumber <= 7) {
      return { className: "text-yellow-500", stroke: "#facc15" };
    } else {
      return { className: "text-blue-500", stroke: "#60a5fa" };
    }
  };

  return (
    <div>
      <div className="mt-2 flex flex-row items-center justify-center">
        {[...Array(10)].map((_, index) => {
          const starIndex = index + 1;
          //console.log("starindex", starIndex);
          return (
            <div
              className="relative"
              key={index}
            >
              {starIndex <= rating ? (
                <FaStar
                  size={20}
                  className={getStarColor(rating).className}
                />
              ) : (
                <FaRegStar
                  size={20}
                  className={getStarColor(rating).className}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StarRating;
