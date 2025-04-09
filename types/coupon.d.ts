export type CouponItem = {
  id: number;
  title: string;
  discount: number;
  min: number;
  expireDay: number;
  storeId: number;
};

export type UserCouponItem = {
  storeId: number;
  name: string; // 店铺名称
  avatar: string; // 店铺头像
  memberCouponItemVOList: memberCouponItemVOList[];
};

export type memberCouponItemVOList = {
  id: number;
  min: number;
  expireTime: string;
  title: string;
  discount: number;
};

export type memberCouponMemberType = {
  type: string;
  memberCouponList: memberCouponItemVOList[] | UserCouponItem[];
};
