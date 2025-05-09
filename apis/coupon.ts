import httpInstance from "@/utils/http";

/**
 * 获取用户未获取的店家提供的优惠卷列表
 * @param id 店家id
 * @returns
 */
export const getUnGetStoreCouponListAPI = (id: number) => {
  return httpInstance({
    method: "GET",
    url: `/coupon/store/${id}`,
  });
};

/**
 * 用户得到该优惠卷
 * @param storeId 店家id
 * @param couponId 优惠卷id
 * @returns
 */
export const getCouponAPI = (couponId: number, storeId?: number) => {
  return httpInstance({
    method: "POST",
    url: "/coupon/get",
    data: {
      storeId,
      couponId,
    },
  });
};

/**
 * 获取用户所有优惠卷
 * @returns
 */
export const getMemberCouponAPI = () => {
  return httpInstance({
    method: "GET",
    url: "/coupon/member",
  });
};

/**
 * 根据用户优惠卷移除用户优惠卷,支持多删
 * @param idList 用户优惠卷id
 * @returns
 */
export const removeAllMemberCouponByIdsAPI = (idList: number[]) => {
  return httpInstance({
    method: "PUT",
    url: "/coupon/remove",
    data: {
      idList,
    },
  });
};

/**
 * 获取平台提供的优惠卷
 * @returns
 */
export const getPlatformCouponListAPI = () => {
  return httpInstance({
    method: "GET",
    url: "/coupon/center",
  });
};

/**
 * 获取用户可以使用的优惠卷
 * @param id 店铺id
 * @returns
 */
export const getUserCanUseCouponListAPI = (storeIds: number[]) => {
  return httpInstance({
    method: "GET",
    url: `/coupon/use`,
    params: {
      storeIds: storeIds.join(","),
    },
  });
};
