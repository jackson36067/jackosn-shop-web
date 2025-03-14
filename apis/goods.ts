import httpInstance from "@/utils/http";

/**
 * 获取热销 | 新品
 * @param type 0-新品 1-热销商品
 * @param isAll 是否全部获取
 * @param page 页数
 * @param pageSize 页码大小
 * @returns
 */
export const GetHotOrNewGoodsAPI = (
  type: number,
  isAll: boolean,
  page?: number,
  pageSize?: number
) => {
  return httpInstance({
    method: "GET",
    url: "/goods",
    params: {
      type,
      isAll,
      page,
      pageSize,
    },
  });
};

/**
 * 根据分类id获取所有所有商品
 * @param id 分类id
 * @param page 页码
 * @param pageSize 页码数
 * @returns
 */
export const GetGoodsByCategoryIdAPI = (
  id: number,
  page: number,
  pageSize: number
) => {
  return httpInstance({
    method: "GET",
    url: `/goods/category/${id}`,
    params: {
      page,
      pageSize,
    },
  });
};
