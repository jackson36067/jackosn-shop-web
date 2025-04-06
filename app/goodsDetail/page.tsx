"use client";

import {
  doCollectOrCancelCollectGoodsAPI,
  getGoodsDetailAPI,
} from "@/apis/goods";
import GoodsDetailBottomBar from "@/components/goodsDetail/bottom";
import GoodsDetailContent from "@/components/goodsDetail/goodsDetailContent";
import GoodsDetailTopBar from "@/components/goodsDetail/topBar";
import { GoodsDetail } from "@/types/goods";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GoodsDetailPage() {
  // 从URL中获取id参数
  const searchParmas = useSearchParams();
  const id = searchParmas.get("id");
  const [goodsDetail, setGoodsDetail] = useState<GoodsDetail | null>(null);
  // 是否显示回到顶部按钮
  const [showButton, setShowButton] = useState(false);
  // 用户是否收藏商品
  const [isCollect, setIsCollect] = useState(false);

  // 获取商品详情数据
  const getGoodsDetail = async () => {
    const res = await getGoodsDetailAPI(Number(id));
    setGoodsDetail(res.data);
    // 设置是否收藏商品
    setIsCollect(res.data.isCollect);
  };
  useEffect(() => {
    getGoodsDetail();
  }, []);

  // 监听窗口Y轴方向移动, 如果大于200px则显示回到顶部按钮,以及改变顶部导航栏颜色
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 用户收藏商品
  const handleMemberCollectGoods = async () => {
    // 用户点击收藏商品或者取消收藏商品, 发送请求
    await doCollectOrCancelCollectGoodsAPI({
      goodsId: Number(id),
      goodsName: goodsDetail?.name,
      isCollect: isCollect,
    });
    getGoodsDetail(); // 重新获取商品详情数据
  };

  // 用户点击地址选择按钮,跳转到地址选择页面
  return (
    <div className="pb-5">
      <GoodsDetailTopBar showButton={showButton} />
      <GoodsDetailContent goodsDetail={goodsDetail} showButton={showButton} />
      <GoodsDetailBottomBar
        storeId={goodsDetail?.storeId || 0}
        isCollect={isCollect || false}
        handleCollect={() => handleMemberCollectGoods()}
      />
    </div>
  );
}
