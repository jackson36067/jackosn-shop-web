export type CartGoodItem = {
  id: number;
  userId: number;
  goodsId: number;
  goodsSn: string;
  goodsName: string;
  productId: number; // 商品sku id
  price: number;
  number: number;
  specifications: string;
  checked: boolean;
  picUrl: string;
  remark: string;
  storeId: number;
  storeName: string;
  isFollow: boolean;
  isContainCoupon: boolean;
  isCollect: boolean;
};

export type AddCartParams = {
  goodsId: number;
  goodsSn: string;
  goodsName: string;
  price: number;
  productId: number;
  number: number;
  specification: Record<string, string>;
  picUrl: string;
  remark: string;
};

export interface SelectedCartItem {
  id: number;
  goodsId: number;
  productId: number;
  goodsName: string;
  goodsSn: string;
  specifications: Record<string, string>;
  number: number;
  price: number;
  picUrl: string;
}
