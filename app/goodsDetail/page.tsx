"use client";

import { addGoodsToCartAPI } from "@/apis/cart";
import { getUserCanUseCouponListAPI } from "@/apis/coupon";
import {
  doCollectOrCancelCollectGoodsAPI,
  getGoodsDetailAPI,
} from "@/apis/goods";
import GoodsDetailBottomBar from "@/components/goodsDetail/bottom";
import GoodsDetailContent from "@/components/goodsDetail/goodsDetailContent";
import GoodsDetailTopBar from "@/components/goodsDetail/topBar";
import useMemberStore from "@/stores/MemberStore";
import useSelectedAddressStore from "@/stores/selectAddressStore";
import { AddressSelectedType } from "@/types/address";
import { CouponItem } from "@/types/coupon";
import { GoodsDetail, SkuData } from "@/types/goods";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function GoodsDetailPage() {
  // 从URL中获取id参数
  const searchParmas = useSearchParams();
  const id = searchParmas.get("id");
  // 是否已经发送请求
  const isFetch = useRef<boolean>(false);
  // 商品详情
  const [goodsDetail, setGoodsDetail] = useState<GoodsDetail | null>(null);
  // 是否显示回到顶部按钮
  const [showButton, setShowButton] = useState(false);
  // 用于接收用户点击地址后传递的地址信息
  const [selectAddress, setSelectAddress] =
    useState<AddressSelectedType | null>(null);
  // 用户是否收藏商品
  const [isCollect, setIsCollect] = useState(false);
  // 选中的sku-spe组,用于保存数据
  const [selectedSkuGroup, setSelectedSkuGroup] = useState<Record<
    string,
    string
  > | null>(null);
  // 选中的规格的个数
  const [count, setCount] = useState<number>(0);
  // 选中的规格的信息
  const [skuInfo, setSkuInfo] = useState<SkuData | null>(null);
  // 是否展示选择地址弹窗, 用于bottom组件选择地址
  const [openAddressDarwer, setOpenAddressDrawer] = useState<boolean>(false);
  // 用于保存用户领取的店铺优惠卷
  const [storeCouponList, setStoreCouponList] = useState<CouponItem[]>([]);
  // 用于保存用户领取的平台优惠卷
  const [platformCouponList, setPlatformCouponList] = useState<CouponItem[]>(
    []
  );
  // 保存优惠总价格
  const [allDiscount, setAllDiscount] = useState<number>(0);
  // 保存被选中的平台优惠卷
  const [selectedPlatformCouponList, setSelectedPlatformCouponList] = useState<
    CouponItem[]
  >([]);

  // 获取商品详情数据
  const getGoodsDetail = async () => {
    const res = await getGoodsDetailAPI(Number(id));
    const data: GoodsDetail = res.data;
    setGoodsDetail(data);
    // 设置是否收藏商品
    setIsCollect(res.data.isCollect);
    // 封装默任地址
    setSelectAddress({
      id: data.defaultAddressId,
      tel: data.tel,
      name: data.consignee,
      address: data.defaultAddress,
      isDefault: data.defaultAddress ? 0 : 1,
    });
    // 判断是否有默认选中的sku单件
    // 有 -> 设置默认选中sku单件信息
    setSelectedSkuGroup(
      data.goodsProductList.find((item) => item.defaultSelected)?.specs || null
    );
    const result = await getUserCanUseCouponListAPI(data.storeId);
    const couponList: CouponItem[] = result.data;
    if (couponList) {
      setStoreCouponList(couponList.filter((item) => item.storeId != null));
      setPlatformCouponList(couponList.filter((item) => item.storeId === null));
      setAllDiscount(
        couponList
          .filter((item) => item.storeId != null)
          .map((item) => item.discount)
          .reduce((prev, item) => {
            return prev + item;
          }, 0)
      );
    }
  };

  useEffect(() => {
    if (isFetch.current) return;
    isFetch.current = true;
    getGoodsDetail();
  }, []);

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
    await doCollectOrCancelCollectGoodsAPI({
      goodsId: Number(id),
      goodsName: goodsDetail?.name,
      isCollect: isCollect,
    });
    getGoodsDetail();
  };

  // 选择地址后并且点击确认后,改变地址信息
  const handleSelectedAddress = (address: AddressSelectedType) => {
    setSelectAddress(address);
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
  const handleSelectedSkuInfo = (
    info: Record<string, string>,
    count: number,
    skuData: SkuData | null
  ) => {
    setSelectedSkuGroup(info);
    setCount(count);
    setSkuInfo(skuData);
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

  // 当用户选择了平台优惠卷
  const handleSelectPlatformCoupon = (couponList: CouponItem[]) => {
    setSelectedPlatformCouponList(couponList);
    const platfomrCouponDiscount = couponList
      .map((item) => item.discount)
      .reduce((prev, item) => prev + item);
    setAllDiscount(allDiscount + platfomrCouponDiscount);
  };

  return (
    <div className="pb-5">
      <GoodsDetailTopBar showButton={showButton} />
      <GoodsDetailContent
        goodsDetail={goodsDetail} // 商品详情信息
        showButton={showButton} // 控制是否展示回到顶部按钮
        selectedAddress={selectAddress}
        skuGroups={goodsDetail?.goodsSpecificationList || []} // 商品规格列表, 通过传递给子组件传递给skuSelector组件
        skuData={goodsDetail?.goodsProductList || []} // 商品sku列表, 通过传递给子组件传递给skuSelector组件
        slectedSkuInfo={selectedSkuGroup || {}} // 默认选中的sku组件,或者上一次选中的sku单件
        handleSelectedAddress={(address: AddressSelectedType) =>
          handleSelectedAddress(address)
        }
        handleSelectSku={(
          info: Record<string, string>,
          count: number,
          skuData: SkuData | null
        ) => handleSelectedSkuInfo(info, count, skuData)} // 当选择好商品规格后将规格信息传递给父组件用于保存上一次选择记录
        openAddressDarwer={openAddressDarwer}
        changeAddressDrawerStatus={() =>
          setOpenAddressDrawer(!openAddressDarwer)
        }
      />
      <GoodsDetailBottomBar
        storeId={goodsDetail?.storeId || 0} // 商品店铺id
        isCollect={isCollect || false} // 商品是否被收藏
        skuGroups={goodsDetail?.goodsSpecificationList || []} // 商品规格列表, 通过传递给子组件传递给skuSelector组件
        skuData={goodsDetail?.goodsProductList || []} // 商品sku列表, 通过传递给子组件传递给skuSelector组件
        slectedSkuInfo={selectedSkuGroup || {}} // 默认选中的sku组件,或者上一次选中的sku单件
        skuInfo={skuInfo}
        count={count}
        storeCouponList={storeCouponList}
        platformCouponList={platformCouponList}
        allDiscount={allDiscount}
        handleCollect={() => handleMemberCollectGoods()} // 收藏或者取消收藏商品
        handleCheckSKuInfo={(
          info: Record<string, string>,
          count: number,
          skuData: SkuData
        ) => handleAddGoodsToCart(info, count, skuData)} // 当选择好商品后将商品添加到购物车
        handleSelectSku={(
          info: Record<string, string>,
          count: number,
          skuData: SkuData
        ) => handleSelectedSkuInfo(info, count, skuData)} // 当选择好商品规格后将规格信息传递给父组件用于保存上一次选择记录
        selecteAddress={selectAddress}
        openAddressDrawer={() => {
          setOpenAddressDrawer(true);
        }}
        checkSelectPlatformCouponList={(couponList: CouponItem[]) =>
          handleSelectPlatformCoupon(couponList)
        }
      />
    </div>
  );
}
