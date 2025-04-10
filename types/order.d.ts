export interface AddOrderItem {
  consignee: string; // 收货人
  mobile: string; // 收货人电话号码
  address: string; // 收货人详细地址
  message: string; // 订单留言
  goodsPrice: number; // 商品总价格
  freightPrice: number; // 运费
  couponPrice: number; // 优惠卷抵押价格
  orderPrice: number; // 订单最终价格
  payStatus: boolean; // 是否付款
  orderGoodsList: AddOrderGoodsItem[];
  useCouponIdList: number[];
}

export interface AddOrderGoodsItem {
  goodsId: number; // 商品id
  goodsName: string; // 商品名称
  goodsSn: string; // 商品编号
  productId: number; // 商品规格id
  number: number; // 商品个数
  price: nubmer; // 商品价格
  specification: Record<string, string>; // 商品规格详情信息
  picUrl: string; // 商品图片
}
