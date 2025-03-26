export type browseHistoryItem = {
  id: number;
  browseTime: string;
  data: goodsHistory[] | storeHistory[];
};

export type goodsHistory = {
  id: number;
  browseId: number;
  goodsName: string;
  price: number;
  picUrl: string;
};

export type storeHistory = {
  id: number;
  browseId: number;
  storeName: string;
  avatar: string;
  followNumber: number;
  goodsHistoryVOList: goodsHistory[];
};
