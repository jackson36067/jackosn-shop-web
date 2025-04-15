"use client";

import { OrderItem } from "@/types/order";
import { orderStatusMap } from "@/data/orderStatus";
import OrderGoodsContent from "./OrderGoods";

const OrderContent = (props: { orderItems: OrderItem[] }) => {
  return (
    <div className="mt-30">
      {props.orderItems.map((item) => {
        return (
          <div
            key={item.id}
            className="p-3 bg-white mt-2 first:mt-0 rounded-md"
            onClick={() =>
              (window.location.href = `/orderDetail?id=${item.id}`)
            }
          >
            {/* 订单信息 */}
            <div className="flex items-center justify-between">
              <p>订单编号: {item.orderSn}</p>
              <p className="text-orange-500">
                {orderStatusMap[item.orderStatus]}
              </p>
            </div>
            {/* 订单商品列表 */}
            <div>
              <OrderGoodsContent
                goodsItems={item.orderGoodsList}
                orderStatus={item.orderStatus}
              />
            </div>
            {/* 订单价格 */}
            <div className="flex justify-end mt-3">
              <p className="font-bold">
                {item.orderStatus == 1
                  ? "需付款￥"
                  : item.orderStatus === 5
                  ? "应付￥"
                  : "实付￥"}
                <span className="text-xl">{item.orderPrice}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default OrderContent;
