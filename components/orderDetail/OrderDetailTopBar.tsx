"use client";

import { orderStatusMap } from "@/data/orderStatus";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

const OrderDetailTopBar = (props: { orderStatus: number | undefined }) => {
  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 w-full bg-white p-3">
      <div className="flex justify-between items-center">
        <Icon
          icon="material-symbols:keyboard-arrow-left"
          fontSize={"1.6rem"}
          onClick={() => router.back()}
        />
        <p className="font-bold text-xl text-[#131313]">
          {orderStatusMap[props.orderStatus || 100]}
        </p>
        {/* 为了布局 */}
        <div></div>
      </div>
    </div>
  );
};
export default OrderDetailTopBar;
