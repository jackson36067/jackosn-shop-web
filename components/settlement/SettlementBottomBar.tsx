"use client";

import { Button } from "../ui/button";

const SettlementBottomBar = (props: {
  allDiscount: number;
  totalPrice: number;
  handlePalceOrder: () => void;
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white p-3">
      <div className="flex justify-end item-center gap-4">
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm">
            合计:{" "}
            <span className="font-bold text-[1rem] text-orange-500">￥</span>
            <span className="text-[1.3rem] text-orange-500 font-bold">
              {props.totalPrice}
            </span>
          </p>
          {props.allDiscount > 0 && (
            <p className="text-sm text-orange-500">
              含优惠卷共减￥{props.allDiscount}
            </p>
          )}
        </div>
        <Button
          className="bg-orange-500 text-white"
          onClick={() => props.handlePalceOrder()}
        >
          提交订单
        </Button>
      </div>
    </div>
  );
};
export default SettlementBottomBar;
