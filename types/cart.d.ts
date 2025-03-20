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
  isContainCoupon: boolean;
  isCollect: boolean;
};
