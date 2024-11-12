import React from "react";
import { FaRegStarHalf } from "react-icons/fa";

interface HalfIconProps {
  direction?: "vertical" | "horizontal";
  className?: string;
}

const HalfIcon = ({
  direction = "vertical",
  className = "",
}: HalfIconProps) => {
  return (
    <div className="relative inline-block">
      {/* Container for the clipped icon */}
      <div
        className={`
          relative 
          overflow-hidden
          ${direction === "vertical" ? "w-4 h-8" : "w-8 h-4"}
          ${className}
        `}
      >
        {/* The actual icon, positioned to show only half */}
        <FaRegStarHalf
          className={`
            absolute 
            ${direction === "vertical" ? "h-8 -left-4" : "w-8 -top-4"}
            text-yellow-500
          `}
        />
      </div>
    </div>
  );
};
export default HalfIcon;
