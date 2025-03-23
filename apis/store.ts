import httpInstance from "@/utils/http";

/**
 * 获取店铺信息
 * @param storeParams
 * @returns
 */
export const getStoerInfoAPI = (storeParams: { id: number }) => {
  return httpInstance({
    method: "GET",
    url: `/store/info/${storeParams.id}`,
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

/**
 * 获取关注店铺列表
 * @returns
 */
export const getFollowStoreListAPI = (name?: string) => {
  return httpInstance({
    method: "GET",
    url: "/store/follow/list",
    params: {
      name,
    },
  });
};

/**
 * 取消关注店铺
 * @param idList 店铺id数组
 * @returns
 */
export const cancelFollowStoreAPI = (idList: number[]) => {
  return httpInstance({
    method: "DELETE",
    url: "/store/cancel/follow",
    data: {
      idList,
    },
  });
};
