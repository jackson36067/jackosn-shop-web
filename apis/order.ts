import { AddOrderItem } from "@/types/order";
import httpInstance from "@/utils/http";

/**
 * 购买商品,生成订单
 * @param data
 * @returns
 */
export const purchaseGoodsAPI = (data: AddOrderItem) => {
  return httpInstance({
    method: "POST",
    url: "/order",
    data,
  });
};

/**
 *
 * @param type 订单类型 0.全部 1.待支付 2.代发货 3.待收货 4.已完成
 * @param goodsNameOrOrderSnParam 订单编号或者订单中商品的名称
 * @param placeOrderBeginTimeParam 下单时间范围
 * @returns
 */
export const getOrderListAPI = (
  type: number,
  goodsNameOrOrderSnParam?: string,
  placeOrderBeginTimeParam?: string,
  placeOrderEndTimeParam?: string
) => {
  const params: Record<string, object | string | number> = { type };
  if (goodsNameOrOrderSnParam) {
    params.goodsNameOrOrderSn = goodsNameOrOrderSnParam;
  }
  if (placeOrderBeginTimeParam) {
    params.placeOrderTime = placeOrderBeginTimeParam;
  }
  if (placeOrderEndTimeParam) {
    params.placeOrderTimeEndParam = placeOrderEndTimeParam;
  }
  return httpInstance({
    method: "GET",
    url: "/order/list",
    params,
  });
};
