"use client";

import { cn } from "@/lib/utils";
import useSelectedGoodsStore from "@/stores/CartSelectedGoods";
import useSelectedAddressStore from "@/stores/selectAddressStore";
import { Icon } from "@iconify/react/dist/iconify.js";

const GoodsDetailTopBar = (props: { showButton: boolean }) => {
  const { selectedGoods } = useSelectedGoodsStore();
  const { clearSelectedAddress } = useSelectedAddressStore();
  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-999 flex items-center justify-between w-full p-3",
        props.showButton && "bg-white"
      )}
    >
      {/* 返回键 */}
      <div
        className={cn(
          "p-1 rounded-sm",
          props.showButton ? "bg-white text-black" : "bg-black/40 text-white"
        )}
        onClick={() => {
          // 返回上一页
          window.history.back();
          // 清空选中的地址
          clearSelectedAddress();
        }}
      >
        <Icon icon={"mdi:keyboard-arrow-left"} fontSize={"1.6rem"} />
      </div>

      {/* 分享以及购物车标签 */}
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "p-1 rounded-sm",
            props.showButton ? "bg-white text-black" : "bg-black/40 text-white"
          )}
        >
          <Icon icon={"ri:share-forward-line"} fontSize={"1.6rem"} />
        </div>
        <div
          className={cn(
            "relative p-1 rounded-sm",
            props.showButton ? "bg-white text-black" : "bg-black/40 text-white"
          )}
          onClick={() => (window.location.href = "/cart")}
        >
          <Icon icon={"lucide:shopping-cart"} fontSize={"1.6rem"} />
          {selectedGoods.length > 0 && (
            <div className="absolute -top-2 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex justify-center items-center">
              {selectedGoods.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoodsDetailTopBar;
