import httpInstance from "@/utils/http";

/**
 * 获取店铺信息
 * @param storeParams
 * @returns
 */
export const getStoerInfoAPI = (storeParams: { id: number }) => {
  return httpInstance({
    method: "GET",
    url: `/store/${storeParams.id}`,
  });
};

/**
 * 关注或者取关店铺
 * @param id 店铺id
 * @param isFollow 是否关注
 * @returns
 */
export const followStoreAPI = (id: number, isFollow: boolean) => {
  return httpInstance({
    method: "POST",
    url: "/store/follow",
    data: {
      id,
      isFollow,
    },
  });
};
