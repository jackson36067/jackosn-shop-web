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
