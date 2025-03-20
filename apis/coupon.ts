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
export const getStoreCouponAPI = (storeId: number, couponId: number) => {
  return httpInstance({
    method: "POST",
    url: "/coupon/get",
    data: {
      storeId,
      couponId,
    },
  });
};
