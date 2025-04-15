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
  orderType?: number,
  storeId?: number
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
      storeId,
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

/**
 * 收藏商品 (购物车页收藏或者取消收藏商品需要goodId,iscollect,goodsname参数 , 我的收藏页删除收藏商品需要idList参数)
 * @param goodsId
 * @param isCollect
 * @param goodsName
 * @param idList 收藏商品id
 * @returns
 */
export const doCollectOrCancelCollectGoodsAPI = (data: {
  goodsId?: number;
  isCollect?: boolean;
  goodsName?: string;
  idList?: number[];
}) => {
  return httpInstance({
    method: "POST",
    url: "/goods/collect",
    data,
  });
};

/**
 * 获取收藏商品列表
 * @param name 商品名称
 * @param sortType 排序类型 0. 根据收藏时间升序排序 1. 根据收藏时间降序排序
 * @param collectTime 获取收藏商品天数范围 比如: 一周前, 一天前, 一个月前
 * @returns
 */
export const getCollectGoodsListAPI = (
  name?: string,
  sortType?: number | undefined,
  collectTime?: number | undefined
) => {
  if (!name) name = undefined;
  return httpInstance({
    method: "GET",
    url: "/goods/collect/list",
    params: {
      name,
      sortType,
      collectTime,
    },
  });
};

/**
 * 根据商品id获取商品详情
 * @param id 商品id
 * @returns
 */
export const getGoodsDetailAPI = (id: number) => {
  return httpInstance({
    method: "GET",
    url: `/goods/detail/${id}`,
  });
};

/**
 * 获取用户可能喜欢的商品列表
 * @param idList 商品id数组
 * @returns
 */
export const getUserMayLikeGoodsListAPI = (idList?: number[]) => {
  return httpInstance({
    method: "GET",
    url: `/goods/like`,
    params: {
      idList: idList?.join(","),
    },
  });
};
