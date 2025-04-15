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
  cartIdList?: number[];
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

export interface OrderItem {
  id: number; // 订单id
  orderSn: string; // 订单编号
  orderStatus: number; // 订单类型 1.待付款 2.代发货 3.待收货 4.已完成
  orderPrice: number; // 订单总价格
  orderGoodsList: orderGoodsItem[];
}

export interface orderGoodsItem {
  id: number; // 订单商品id;
  goodsId: number; // 商品id
  picUrl: string; // 商品图片
  goodsName: string; // 商品名称
  specifications: string[]; // 商品规格
  number: number; // 商品数量
  price: number; // 商品价格
  storeId: number; // 商品店铺id
  storeName: string; // 商品店铺名称
}

export interface orderDataItem {
  unPaymentOrderNumber: number;
  unShippedOrderNumber: number;
  unReceiptOrderNumber: number;
  completedOrderNumber: number;
  refundOrderNumber: number;
}

export interface orderTypeItem {
  icon: string;
  title: string;
  path: string;
  count: number;
}

export interface orderDetailData {
  id: number;
  orderId: number;
  orderSn: string;
  address: string;
  mobile: string;
  consignee: string;
  orderStatus: number;
  goodsPrice: number;
  orderPrice: number;
  freightPrice: number;
  couponPrice: number;
  orderGoodsList: orderGoodsItem[];
}
