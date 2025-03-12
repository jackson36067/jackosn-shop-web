import { GoodsMessage } from "./goods";

export type NavBarMenuItem = {
  id: nubmer;
  bgPic: string;
  name: string;
  path: string;
};

export type ColumnDetailInfo = {
  id: number;
  name: string;
  detailPic: string;
  goodsMessageVOList: GoodsMessage[];
};
