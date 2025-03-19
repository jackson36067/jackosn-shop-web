"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

const CartTopBar = (props: { cartGoodsItemsLength: number }) => {
  return (
    <div className="w-full h-[100%] px-5 bg-[#fff]">
      <div className="flex justify-between items-center sm:h-12 h-14 w-full">
        {/* 主题 */}
        <div className="text-current font-bold text-xl">
          购物车{" "}
          <span className="text-sm font-medium">
            ({props.cartGoodsItemsLength})
          </span>
        </div>
        <div>
          <Icon icon={"iconamoon:search-thin"} className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
export default CartTopBar;
