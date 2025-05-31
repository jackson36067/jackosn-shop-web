"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

const PaymentCompleteContent = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col mt-15 h-full w-full">
        {/* 支付成功提示 */}
        <div className="flex flex-col gap-5 items-center">
          <div className="flex items-center justify-center gap-2 w-full text-xl font-bold">
            <Icon
              icon={"healthicons:yes"}
              className="text-orange-500"
              fontSize={"1.8rem"}
            />
            <p>支付成功</p>
          </div>
          <div className="flex items-center justify-center gap-18 w-full text-gray-400">
            <p onClick={() => router.push("/")}>回到首页</p>
            <p className="ml-3" onClick={() => router.push(`/order?type=${2}`)}>
              查看订单
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentCompleteContent;
