import httpInstance from "@/utils/http";

/**
 * 获取条件获取商品
 * @param type 0-新品 1-热销商品
 * @param isAll 是否全部获取
 * @param page 页数
 * @param pageSize 页码大小
 * @param name 商品名称
 * @param sortType 排序类型 default-综合排序 sales-销量排序 price-价格排序
 * @param orderType 价格排序类型 0-升序 1-降序
 * @returns
 */
export const GetHotOrNewGoodsAPI = (
  type: number,
  isAll: boolean,
  page?: number,
  pageSize?: number,
  name?: string,
  sortType?: string,
  orderType?: number
) => {
  return httpInstance({
    method: "GET",
    url: "/goods",
    params: {
      type,
      isAll,
      page,
      pageSize,
      name,
      sortType,
      orderType,
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

export const doCollectOrCancelCollectGoodsAPI = (
  goodsId: number,
  isCollect: boolean
) => {
  return httpInstance({
    method: "POST",
    url: "/goods/collect",
    data: {
      goodsId,
      isCollect,
    },
  });
};
