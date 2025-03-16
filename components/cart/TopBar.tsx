"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

const CartTopBar = () => {
  return (
    <div className="w-full h-[100%] px-5 bg-[#fff]">
      <div className="flex justify-between items-center sm:h-12 h-14 w-full">
        <div></div>
        {/* 主题 */}
        <div className="text-current">购物车</div>
        <div>
          <Icon icon={"iconamoon:search-thin"} className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
export default CartTopBar;
