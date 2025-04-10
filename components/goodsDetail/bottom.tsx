"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import SkuSelector from "../goodsSku/SkuSelector";
import { SkuData, SkuGroup } from "@/types/goods";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { AddressSelectedType } from "@/types/address";
import { CouponItem } from "@/types/coupon";

const GoodsDetailBottomBar = (props: {
  storeId: number;
  isCollect: boolean;
  skuGroups: SkuGroup[];
  skuData: SkuData[];
  slectedSkuInfo: Record<string, string>;
  skuInfo: SkuData | null;
  count: number;
  storeCouponList: CouponItem[];
  platformCouponList: CouponItem[];
  allDiscount: number;
  handleCollect: () => void;
  handleCheckSKuInfo: (
    info: Record<string, string>,
    count: number,
    skuData: SkuData
  ) => void;
  handleSelectSku: (
    info: Record<string, string>,
    count: number,
    skuData: SkuData
  ) => void;
  selecteAddress: AddressSelectedType | null;
  openAddressDrawer: () => void;
  checkSelectPlatformCouponList: (couponList: CouponItem[]) => void;
  purchaseGoos: () => void;
}) => {
  // 选中的sku-spe组,用于保存数据
  const [selectedSkuGroup, setSelectedSkuGroup] = useState<Record<
    string,
    string
  > | null>(null);
  // 选中的sku单件
  const [skuInfo, setSkuInfo] = useState<SkuData | null>(null);
  // 选中的sku单件数量
  const [selectedSkuCount, sestSelectedSkuCount] = useState<number>(0);
  // 购物车弹窗是否打开
  const [cartDrawer, setCartDrawer] = useState<boolean>(false);
  // 购买弹窗是否打开
  const [purchaseDrawer, setPurchaseDrawer] = useState<boolean>(false);

  // 子组件修改规格后触发该函数,接收新选的规格数据,封装选择的数据
  const handleSelectedSkuInfo = (
    info: Record<string, string>,
    count: number,
    skuData: SkuData
  ) => {
    setSkuInfo(skuData);
    setSelectedSkuGroup(info);
    sestSelectedSkuCount(count);
    // 修改默认被选中商品
    props.handleSelectSku(info, count, skuData);
  };

  // 点击确认后将选中的商品规格数据发送给父组件
  const handelCheckedSelectdSku = () => {
    if (!selectedSkuGroup) {
      toast.info("请选择规格");
      return;
    }
    props.handleCheckSKuInfo(
      selectedSkuGroup || {},
      selectedSkuCount,
      skuInfo ?? ({} as SkuData)
    );
    setCartDrawer(false);
  };

  const handleOpenAddressDrawer = () => {
    props.openAddressDrawer();
  };
  // TODO:实现支付完成订单
  const handlePurchase = () => {
    setPurchaseDrawer(false);
    props.purchaseGoos();
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 z-99 flex items-center justify-between bg-white p-3 border-t-[1px] border-t-gray-400">
      <div className="flex items-center gap-4">
        <div
          className="flex flex-col gap-1 items-center"
          onClick={() => (window.location.href = `/store?id=${props.storeId}`)}
        >
          <Icon icon={"clarity:store-line"} fontSize={"1.4rem"} />
          <p className="text-[0.8rem] text-gray-500">店铺</p>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <Icon icon={"ant-design:message-outlined"} fontSize={"1.4rem"} />
          <p className="text-[0.8rem] text-gray-500">客服</p>
        </div>
        <div
          className="flex flex-col gap-1 items-center"
          onClick={() => {
            props.handleCollect();
          }}
        >
          <Icon
            icon={!props.isCollect ? "hugeicons:star" : "mingcute:star-fill"}
            fontSize={"1.4rem"}
            color={props.isCollect ? "red" : undefined}
          />
          <p className="text-[0.8rem] text-gray-500">收藏</p>
        </div>
      </div>
      <div className="w-[70%] flex items-center text-white">
        {/* 加入购物车 */}
        <Drawer open={cartDrawer} onOpenChange={setCartDrawer}>
          <DrawerTrigger className="w-[50%]">
            <div className="flex items-center justify-around w-full h-13 rounded-xl rounded-r-none bg-[#f5c73d]">
              加入购物车
            </div>
          </DrawerTrigger>
          <DrawerContent className="px-3">
            <DrawerHeader>
              <DrawerTitle></DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <SkuSelector
              groups={props.skuGroups}
              skus={props.skuData}
              onSelectedSkuInfo={(
                info: Record<string, string>,
                count: number,
                skuData: SkuData
              ) => handleSelectedSkuInfo(info, count, skuData)}
              defaultSelectedSku={props.slectedSkuInfo}
              showCouponSelect={false}
            />
            <DrawerFooter>
              <Button
                className="w-full bg-orange-500 text-white"
                onClick={() => handelCheckedSelectdSku()}
              >
                加入购物车
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        {/* 立即购买 */}
        <Drawer open={purchaseDrawer} onOpenChange={setPurchaseDrawer}>
          <DrawerTrigger className="w-[50%]">
            <div className="flex items-center justify-around w-full h-13 rounded-xl rounded-l-none bg-[#d66c5e]">
              立即购买
            </div>
          </DrawerTrigger>
          <DrawerContent className="px-3">
            <DrawerHeader>
              <DrawerTitle></DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <div
              className="flex items-center justify-between gap-2 py-2 border-b-[1px] border-b-gray-200"
              onClick={() => handleOpenAddressDrawer()}
            >
              <div className="flex items-center gap-4">
                <Icon icon={"mynaui:location"} fontSize={"1.6rem"} />
                <div className="font-[600]">
                  <p>
                    {props.selecteAddress?.name} {props.selecteAddress?.tel}
                  </p>
                  <p className="max-w-65 truncate">
                    {props.selecteAddress?.address}
                  </p>
                </div>
              </div>
              <div>
                <Icon icon={"ri:arrow-right-s-line"} fontSize={"1.6rem"} />
              </div>
            </div>
            <SkuSelector
              groups={props.skuGroups}
              skus={props.skuData}
              storeCouponList={props.storeCouponList}
              platformCouponList={props.platformCouponList}
              allDiscount={props.allDiscount}
              onSelectedSkuInfo={(
                info: Record<string, string>,
                count: number,
                skuData: SkuData
              ) => handleSelectedSkuInfo(info, count, skuData)}
              defaultSelectedSku={props.slectedSkuInfo}
              showCouponSelect={true}
              checkSelectPlatformCoupon={(couponList: CouponItem[]) =>
                props.checkSelectPlatformCouponList(couponList)
              }
            />
            <DrawerFooter>
              <Button
                className="w-full bg-orange-500 text-white font-bold"
                onClick={() => handlePurchase()}
              >
                立即支付
                <span className="text-xl">
                  ￥
                  {(props.skuInfo?.price || 0) * props.count -
                    props.allDiscount}
                </span>
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
export default GoodsDetailBottomBar;
