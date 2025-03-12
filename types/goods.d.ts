export type GoodsMessage = {
  id: number;
  goodSn: string;
  name: string;
  brief: string; // 简介
  picUrl: string;
  isNew: boolean;
  isHot: boolean;
  counterPrice: number; // 初始价格
  retailPrice: number; // 零售价格
};
