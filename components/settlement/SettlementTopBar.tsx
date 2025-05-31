"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

const SettlementTopBar = () => {
  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 p-3 w-full bg-white">
      <div className="flex justify-between items-center">
        <div>
          <Icon
            icon={"material-symbols:keyboard-arrow-left"}
            fontSize={"1.6rem"}
            onClick={() => router.back()}
          />
        </div>
        <div className="font-bold">确认订单</div>
        <div></div>
      </div>
    </div>
  );
};
export default SettlementTopBar;
