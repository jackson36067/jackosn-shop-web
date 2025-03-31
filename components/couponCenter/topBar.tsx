"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

const CouponCenterTopBar = () => {
  return (
    <div className="px-3">
      <div className="flex justify-between items-center ">
        <div>
          <Icon
            icon={"iconamoon:arrow-left-2-thin"}
            fontSize={"1.4rem"}
            onClick={() => window.history.back()}
          ></Icon>
        </div>
        <div>抢卷中心</div>
        <div></div>
      </div>
    </div>
  );
};
export default CouponCenterTopBar;
