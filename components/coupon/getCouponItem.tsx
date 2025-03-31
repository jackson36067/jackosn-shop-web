"use client";

import { CouponItem } from "@/types/coupon";

const GetCouponContent = (props: {
  couponList: CouponItem[];
  isFollow?: boolean;
  storeId?: number;
  handleGetCoupon: (couponId: number, storeId?: number) => void;
}) => {
  const handleGetCoupon = (couponId: number, storeId?: number) => {
    props.handleGetCoupon(couponId, storeId);
  };
  return (
    <div>
      {props.couponList.map((couponItem) => {
        return (
          <div
            key={couponItem.id}
            className="w-[100%] bg-[#ffece5]/90 rounded-lg mt-5 p-2"
          >
            <div className="flex items-center">
              <div className="flex-2/3 flex flex-col gap-1 border-dashed border-r-[0.05rem] border-gray-600 text-sm text-orange-600">
                <div>
                  ￥
                  <span className="font-bold text-3xl px-1">
                    {couponItem.discount}
                  </span>
                  {couponItem.title}
                </div>
                <div>订单金额满{couponItem.min}元可使用</div>
                <div>领取后{couponItem.expireDay}天内可使用</div>
              </div>
              <div className="flex-1/3 flex justify-center pl-2">
                <button
                  className="rounded-2xl bg-orange-600 text-white p-2"
                  onClick={() => handleGetCoupon(couponItem.id, props.storeId)}
                >
                  {window.location.pathname === "/couponCenter"
                    ? "抢购"
                    : props.isFollow
                    ? "领取"
                    : "关注并领取"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default GetCouponContent;
