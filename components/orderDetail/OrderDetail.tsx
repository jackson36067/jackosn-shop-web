"use client";

import { getUserMayLikeGoodsListAPI } from "@/apis/goods";
import { getOrderDetailDataAPI } from "@/apis/order";
import OrderDetailContent from "@/components/orderDetail/OrderDetailContent";
import OrderDetailTopBar from "@/components/orderDetail/OrderDetailTopBar";
import { GoodsMessage } from "@/types/goods";
import { orderDetailData } from "@/types/order";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function OrderDetail() {
  // 从路径参数中获取订单id
  const pathParams = useSearchParams();
  // 订单id
  const id = pathParams.get("id");
  // 订单详情信息
  const [orderDetail, setOrderDetail] = useState<orderDetailData | null>(null);
  // 推荐商品
  const [recommendGoodsList, setRecommendGoodsList] = useState<GoodsMessage[]>(
    []
  );
  const [loadingRecommenGoods, setLoadingRecommendGoods] =
    useState<boolean>(true);

  // 获取订单详情信息
  useEffect(() => {
    const getOrderDetailData = async () => {
      const res = await getOrderDetailDataAPI(Number(id));
      setOrderDetail(res.data);
    };
    getOrderDetailData();
    getRecommendGoods();
  }, [id]);

  // 获取订单推荐商品列表
  const getRecommendGoods = async () => {
    // 保证出现加载动画
    setLoadingRecommendGoods(true);
    const res = await getUserMayLikeGoodsListAPI();
    setRecommendGoodsList(res.data);
    // 请求结束后停止加载动画
    setLoadingRecommendGoods(false);
  };

  return (
    <Suspense>
      <div>
        <OrderDetailTopBar orderStatus={orderDetail?.orderStatus} />
        <OrderDetailContent
          orderDetail={orderDetail}
          recommendGoodsList={recommendGoodsList}
          loadingRecommend={loadingRecommenGoods}
          changeRecommendGoodsList={() => getRecommendGoods()}
        />
      </div>
    </Suspense>
  );
}
