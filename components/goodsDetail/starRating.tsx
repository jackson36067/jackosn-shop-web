"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

// 商品评分组件
const StarRating = ({ rating }: { rating: number }) => {
  const maxRating = 5; // 总共五颗星
  const filledStars = Math.round(rating); // 当前评分的星数
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <span
        key={i}
        className={cn(
          i <= filledStars ? "text-[#d66c5e]" : "text-gray-300",
          "text-xl"
        )}
      >
        <Icon icon={"material-symbols:star-rounded"} />
      </span>
    );
  }

  return <div className="flex items-center">{stars}</div>;
};
export default StarRating;
