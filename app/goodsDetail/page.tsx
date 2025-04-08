"use client";

import { addGoodsToCartAPI } from "@/apis/cart";
import {
  doCollectOrCancelCollectGoodsAPI,
  getGoodsDetailAPI,
} from "@/apis/goods";
import GoodsDetailBottomBar from "@/components/goodsDetail/bottom";
import GoodsDetailContent from "@/components/goodsDetail/goodsDetailContent";
import GoodsDetailTopBar from "@/components/goodsDetail/topBar";
import useMemberStore from "@/stores/MemberStore";
import useSelectedAddressStore from "@/stores/selectAddressStore";
import { GoodsDetail, SkuData } from "@/types/goods";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function GoodsDetailPage() {
  // 从URL中获取id参数
  const searchParmas = useSearchParams();
  const id = searchParmas.get("id");
  // 用于触发获取商品详情函数
  const [reGetGoodsDetail, setReGetGoodsDetail] = useState<boolean>(true);
  const [goodsDetail, setGoodsDetail] = useState<GoodsDetail | null>(null);
  // 是否显示回到顶部按钮
  const [showButton, setShowButton] = useState(false);
  // 用户是否收藏商品
  const [isCollect, setIsCollect] = useState(false);
  // 选中的sku-spe组,用于保存数据
  const [selectedSkuGroup, setSelectedSkuGroup] = useState<Record<
    string,
    string
  > | null>(null);

  useEffect(() => {
    // 获取商品详情数据
    const getGoodsDetail = async () => {
      const res = await getGoodsDetailAPI(Number(id));
      const data: GoodsDetail = res.data;
      setGoodsDetail(data);
      // 设置是否收藏商品
      setIsCollect(res.data.isCollect);
      // 判断是否有默认选中的sku单件
      // 有 -> 设置默认选中sku单件信息
      setSelectedSkuGroup(
        data.goodsProductList.find((item) => item.defaultSelected)?.specs ||
          null
      );
    };
    getGoodsDetail();
    // 当对商品进行操作时用于触发该函数, 比如收藏商品时, 通过该变量重新触发该函数获取商品
    if (reGetGoodsDetail) {
      return;
    }
  }, [id, reGetGoodsDetail]);

  // 监听窗口Y轴方向移动, 如果大于200px则显示回到顶部按钮,以及改变顶部导航栏颜色
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
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
    setReGetGoodsDetail(!reGetGoodsDetail);
    await doCollectOrCancelCollectGoodsAPI({
      goodsId: Number(id),
      goodsName: goodsDetail?.name,
      isCollect: isCollect,
    });
  };

  // 清空选择地址
  const { clearSelectedAddress } = useSelectedAddressStore();
  // 监听刷新页面,将选中地址清除,防止刷新后选中地址以及商品详情页展示地址不一致
  useEffect(() => {
    const handleBeforeUnload = () => {
      clearSelectedAddress();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [clearSelectedAddress]);

  // 当子组件GoodsDetailCoontent选择商品规格时触发, 显示选择的商品规格
  const handleSelectedSkuInfo = (info: Record<string, string>) => {
    setSelectedSkuGroup(info);
  };

  // 登录用户数据
  const { memberInfo } = useMemberStore();

  // 当子组件GoodsDetailBottom将选择的规格商品添加至购物车时触发
  const handleAddGoodsToCart = async (
    info: Record<string, string>,
    count: number,
    skuData: SkuData
  ) => {
    // 判断用户是否登录
    if (!memberInfo.token) {
      toast.info("请先登录");
      return;
    }
    // 发送请求添加商品到购物车中
    await addGoodsToCartAPI({
      goodsId: goodsDetail!.id,
      goodsName: goodsDetail!.name,
      goodsSn: goodsDetail!.goodsSn,
      price: skuData.price,
      number: count,
      specification: info,
      picUrl: skuData.url,
      remark: goodsDetail!.brief,
      productId: skuData.id,
    });
    toast.success("添加成功");
  };

  return (
    <div className="pb-5">
      <GoodsDetailTopBar showButton={showButton} />
      <GoodsDetailContent
        goodsDetail={goodsDetail} // 商品详情信息
        showButton={showButton} // 控制是否展示回到顶部按钮
        skuGroups={goodsDetail?.goodsSpecificationList || []} // 商品规格列表, 通过传递给子组件传递给skuSelector组件
        skuData={goodsDetail?.goodsProductList || []} // 商品sku列表, 通过传递给子组件传递给skuSelector组件
        slectedSkuInfo={selectedSkuGroup || {}} // 默认选中的sku组件,或者上一次选中的sku单件
        handleSelectSku={(info: Record<string, string>) =>
          handleSelectedSkuInfo(info)
        } // 当选择好商品规格后将规格信息传递给父组件用于保存上一次选择记录
      />
      <GoodsDetailBottomBar
        storeId={goodsDetail?.storeId || 0} // 商品店铺id
        isCollect={isCollect || false} // 商品是否被收藏
        skuGroups={goodsDetail?.goodsSpecificationList || []} // 商品规格列表, 通过传递给子组件传递给skuSelector组件
        skuData={goodsDetail?.goodsProductList || []} // 商品sku列表, 通过传递给子组件传递给skuSelector组件
        slectedSkuInfo={selectedSkuGroup || {}} // 默认选中的sku组件,或者上一次选中的sku单件
        handleCollect={() => handleMemberCollectGoods()} // 收藏或者取消收藏商品
        handleCheckSKuInfo={(
          info: Record<string, string>,
          count: number,
          skuData: SkuData
        ) => handleAddGoodsToCart(info, count, skuData)} // 当选择好商品后将商品添加到购物车
        handleSelectSku={(info: Record<string, string>) =>
          handleSelectedSkuInfo(info)
        } // 当选择好商品规格后将规格信息传递给父组件用于保存上一次选择记录
      />
    </div>
  );
}
