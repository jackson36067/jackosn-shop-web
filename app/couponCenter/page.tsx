"use client";

import { getCouponAPI, getPlatformCouponListAPI } from "@/apis/coupon";
import GetCouponContent from "@/components/coupon/getCouponItem";
import CouponCenterTopBar from "@/components/couponCenter/topBar";
import { CouponItem } from "@/types/coupon";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function CouponCenter() {
  const [platformCouponList, setPlatformCouponList] = useState<CouponItem[]>(
    []
  );
  const isFetch = useRef<boolean>(false);
  const getPlatformCouponList = async () => {
    const res = await getPlatformCouponListAPI();
    setPlatformCouponList(res.data);
  };
  useEffect(() => {
    if (isFetch.current) return;
    isFetch.current = true;
    getPlatformCouponList();
  }, []);
  const handelGetCoupon = async (couponId: number) => {
    await getCouponAPI(couponId);
    toast.success("领取成功");
    getPlatformCouponList();
  };
  return (
    <div className="py-5">
      <CouponCenterTopBar />
      {platformCouponList.length > 0 ? (
        <GetCouponContent
          couponList={platformCouponList}
          handleGetCoupon={handelGetCoupon}
        />
      ) : (
        <div className="mt-80 w-full text-center">没有优惠卷可以抢购</div>
      )}
      <GetCouponContent
        couponList={platformCouponList}
        handleGetCoupon={handelGetCoupon}
      />
    </div>
  );
}
