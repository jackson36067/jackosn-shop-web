import { AddCartParams } from "@/types/cart";
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

/**
 * 从购物车中移除商品
 * @param id 商品id
 * @returns
 */
export const removeGoodsFromCartAPI = (id: number) => {
  return httpInstance({
    method: "DELETE",
    url: `/cart/${id}`,
  });
};

/**
 * 新增商品到购物车
 * @param data 新增到购物车的数据对象
 * @returns
 */
export const addGoodsToCartAPI = (data: AddCartParams) => {
  return httpInstance({
    method: "POST",
    url: "/cart/add",
    data,
  });
};

/**
 * 获取用户选中的购物车商品列表
 * @returns
 */
export const getSelectCartGoodsListAPI = () => {
  return httpInstance({
    method: "GET",
    url: "/cart/selected",
  });
};
