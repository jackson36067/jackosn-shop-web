// 接收storeInfo参数
export type StoreInfo = {
  id: number;
  name: string;
  avatar: string;
  isFollow: boolean;
  fansNumber: number;
};

export type FollowStoreItem = {
  id: number;
  name: string;
  avatar: string;
  followTime: string;
  storeId: number;
};
