import { goodsAttributeItem } from "./goodsAttribute";

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

export type GoodsDetail = {
  id: number; // 商品id
  storeId: number; // 商品店铺id
  name: string; // 商品名称
  brief: string; // 商品简介
  gallery: string[]; // 商品图片
  counterPrice: number; // 商品原价
  retailPrice: number; // 商品现价
  detail: string;
  isCollect: boolean; // 是否收藏
  goodsCommentVOList: GoodsComment[]; // 商品评论列表
  totalCommentNumber: number;
  goodCommentNumber: number; // 商品好评数
  naturalCommentNumber: number; // 商品中评数
  badCommentNumber: number; // 商品差评数
  hasPictureCommentNumber: number; // 商品有图评论数
  defaultAddress: string; // 默认地址
  goodsAttributeList: goodsAttributeItem[];
};

export type goodsSkuInfo = {
  specsList: SkuGroup[];
  skuList: SkuData[];
};

export type SkuOption = {
  value: string; // 唯一值
  picUrl?: string;
};

export type SkuGroup = {
  name: string; // 中文组名，如“颜色分类”
  options: SkuOption[];
};

export type SkuData = {
  id: number;
  goodsId: number;
  price: number;
  number: number;
  url: string;
  specs: Record<string, string>; // key 是中文名，如 { "颜色分类": "雪山白", "轴体名称": "红轴" }
};
