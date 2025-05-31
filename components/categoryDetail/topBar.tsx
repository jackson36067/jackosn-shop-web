"use client";

import useSelectedGoodsStore from "@/stores/CartSelectedGoods";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

const TopBar = (props: { title: string }) => {
  const { selectedGoods } = useSelectedGoodsStore();
  const router = useRouter();
  return (
    <div className="w-full px-5">
      <div className="flex justify-between items-center sm:h-12 h-14 w-full">
        <div
          className="flex items-center text-current"
          onClick={() => {
            router.back();
          }}
        >
          <Icon icon="ep:arrow-left" className="mr-1" />
          返回
        </div>
        {/* 主题 */}
        <div className="text-current">{props.title}</div>
        <div className="relative" onClick={() => router.push("/cart")}>
          <div className="flex justify-center items-center absolute -top-[3px] -right-[3px] w-5 h-5 rounded-full text-white text-sm bg-[#f8312f]">
            {selectedGoods.length || "0"}
          </div>
          <Icon icon={"icon-park-outline:shopping"} className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};
export default TopBar;
