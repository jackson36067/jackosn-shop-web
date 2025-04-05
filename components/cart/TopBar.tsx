"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

const CartTopBar = (props: { cartGoodsItemsLength: number }) => {
  return (
    <div className="w-full h-[100%] px-2 bg-[#fff]">
      <div className="flex justify-between items-center sm:h-12 h-14 w-full">
        {/* 主题 */}
        <div className="flex items-center gap-2">
          <div onClick={() => window.history.back()}>
            <Icon icon="iconamoon:arrow-left-2" fontSize={"1.6rem"} />
          </div>
          <div className="text-current font-bold text-xl">
            购物车{" "}
            <span className="text-sm font-medium">
              ({props.cartGoodsItemsLength})
            </span>
          </div>
        </div>

        <div>
          <Icon icon={"iconamoon:search-thin"} className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
export default CartTopBar;
