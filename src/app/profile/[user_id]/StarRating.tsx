import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

function StarRating({ rating }: { rating: number }) {
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
                  className="text-yellow-500"
                />
              ) : (
                <FaRegStar
                  size={20}
                  className="text-yellow-500"
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
