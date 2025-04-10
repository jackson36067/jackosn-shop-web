"use client";

import { getUserMayLikeGoodsListAPI } from "@/apis/goods";
import HomeCategoryGoods from "@/components/home/category/goods";
import PaymentCompleteContent from "@/components/paymentComplete/paymentCompleteContent";
import PaymentCompleteTopBar from "@/components/paymentComplete/topBar";
import { GoodsMessage } from "@/types/goods";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetailPage() {
  // 获取请求参数中的商品id, 用于获取用户可能喜欢的商品列表
  const path = useSearchParams();
  const id = path.get("id");
  // 存储用户可能喜欢的商品列表
  const [userMayLikeGoodsList, setUserMayLikeGoodsList] = useState<
    GoodsMessage[]
  >([]);

  useEffect(() => {
    const getUserMayLikeGoodsList = async () => {
      const res = await getUserMayLikeGoodsListAPI([Number(id)]);
      setUserMayLikeGoodsList(res.data);
    };
    getUserMayLikeGoodsList();
  }, [id]);
  return (
    <div className="flex flex-col h-[100vh]">
      <PaymentCompleteTopBar />
      <PaymentCompleteContent />
      {/* 猜你喜欢提示 */}
      <p className="flex justify-center items-center mx-auto w-50 pt-2 pb-5 bg-white rounded-lg text-orange-400 font-bold text-center mt-5 -mb-3">
        猜你喜欢
      </p>
      {/* TODO: 推荐商品列表 */}
      <div className="flex-1 bg-white pb-5 overflow-y-auto">
        <HomeCategoryGoods goodItems={userMayLikeGoodsList} />
      </div>
    </div>
  );
}
