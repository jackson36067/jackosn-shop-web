import httpInstance from "@/utils/http";

/**
 * 获取用户的购物车商品列表
 * @returns
 */
export const getCartGoodsAPI = () => {
  return httpInstance({
    method: "GET",
    url: "/cart/list",
  });
};

/**
 * 更新购物车商品数量或者修改选中状态
 * @param ids
 * @param number  商品数量
 * @param checked  是否选中
 * @returns
 */
export const SetGoodsCheckedAPI = (
  ids: number[],
  checked?: boolean,
  number?: number
) => {
  return httpInstance({
    method: "PUT",
    url: "/cart/update",
    data: {
      ids,
      checked,
      number,
    },
  });
};
