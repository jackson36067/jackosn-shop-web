export type GoodsMessage = {
  id: number;
  goodSn: string;
  name: string;
  brief?: string; // 简介
  picUrl: string;
  isNew?: boolean;
  isHot?: boolean;
  counterPrice: number; // 初始价格
  retailPrice: number; // 零售价格
};

// 商品分页对象
export type GoodsPageResult = {
  data: GoodsMessage[];
  isRemain: boolean;
};

// 收藏商品对象类型
export type CollectGoodsItem = {
  id: number; // 收藏商品信息id
  goodsId: number; // 商品id
  name: string; // 商品名称
  picUrl: string; // 商品图片
  price: number; // 商品价格
  storeId: number; // 商品店铺id
  storeName: string; // 商品店铺名称
  collectNumber: number; // 商品收藏人数
};
