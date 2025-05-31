"use client";

import { AddressSelectedType } from "@/types/address";
import GoodsConsigneeInfo from "../common/goodsConsigneeInfo";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useState } from "react";
import { Button } from "../ui/button";
import { SelectedCartItem } from "@/types/cart";
import Image from "next/image";
import { CouponItem } from "@/types/coupon";
import { Checkbox } from "../ui/checkbox";
import AddressView from "../address/addressView";

const SettlementContent = (props: {
  defaultAddress: AddressSelectedType | null;
  selectedGoodsList: SelectedCartItem[];
  canUseCouponItems: CouponItem[];
  changeSelectAddress: (address: AddressSelectedType | null) => void;
  checkSelectCouponList: (selectedCouponList: CouponItem[]) => void;
}) => {
  // 选中的地址
  const [selectAddress, setSelectAddress] =
    useState<AddressSelectedType | null>(null);
  // 选中的优惠卷
  const [selectedCouponList, setSelectedCouponList] = useState<CouponItem[]>(
    []
  );

  // 点击地址后更改选择的地址
  const handleSelectedAddress = (address: AddressSelectedType) => {
    setSelectAddress(address);
  };

  // 点击确认按钮后,将选中的地址传递给父组件
  const handleChangeAddress = () => {
    props.changeSelectAddress(selectAddress);
  };

  // 选中或者取消选中优惠卷
  const handleSelectedPlatformCoupon = (checked: boolean, item: CouponItem) => {
    if (checked) {
      const isAleaderSelect = selectedCouponList.includes(item);
      if (isAleaderSelect) {
        return;
      }
      setSelectedCouponList([...selectedCouponList, item]);
    } else {
      const newCouponList = selectedCouponList.filter(
        (item) => item.id !== item.id
      );
      setSelectedCouponList(newCouponList);
    }
  };

  // 当点击优惠卷弹窗确认按钮后,将最终选中的优惠卷列表传递给父组件
  const handleCheckSelectCoupon = () => {
    props.checkSelectCouponList(selectedCouponList);
  };
  return (
    <div className="mt-13 p-3 bg-white">
      {/* 地址信息 */}
      <Drawer>
        <DrawerTrigger className="w-full">
          <div className="flex items-center justify-between gap-2 py-2 border-b-[1px] border-b-gray-200">
            <GoodsConsigneeInfo
              consignee={props.defaultAddress?.name}
              mobile={props.defaultAddress?.tel}
              address={props.defaultAddress?.address}
            />
            <div>
              <Icon icon={"ri:arrow-right-s-line"} fontSize={"1.6rem"} />
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <AddressView
            selectedAddres={props.defaultAddress}
            addressSelectedPage={true}
            selectedAddress={(address: AddressSelectedType) =>
              handleSelectedAddress(address)
            }
          />
          <DrawerFooter className="pt-30">
            <DrawerClose asChild>
              <Button
                className="bg-orange-500 text-white"
                onClick={() => handleChangeAddress()}
              >
                确认
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {/* 购物车选中商品信息 */}
      <div className="mt-3">
        {/* 购物车选中商品列表 */}
        {props.selectedGoodsList.map((item) => {
          return (
            <div className="flex gap-2" key={item.id}>
              <div>
                <Image
                  src={item.picUrl}
                  alt=""
                  width={50}
                  height={50}
                  className="w-30 h-30"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>{item.goodsName}</div>
                  <div className="font-bold">
                    ￥<span className="text-lg">{item.price}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-2 items-center">
                    {Object.entries(item.specifications).map(([key, value]) => (
                      <p key={key} className="text-gray-500 text-sm">
                        {value}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p>x{item.number}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* 商品总金额 */}
        <div className="flex justify-between items-center mt-6 px-3">
          <p>商品金额</p>
          <p className="text-gray-500">
            {props.selectedGoodsList.length > 0 &&
              props.selectedGoodsList
                ?.map((item) => item.price)
                ?.reduce((prev, item) => {
                  return prev + item;
                })}
            元
          </p>
        </div>
        {/* 订单所需运费 */}
        <div className="flex justify-between items-center mt-6 px-3">
          <p>运费</p>
          <p className="text-gray-500">0元</p>
        </div>
        <Drawer>
          <DrawerTrigger className="w-full">
            <div className="flex justify-between items-center mt-6 px-3">
              <p>优惠卷</p>
              <p className="text-gray-500">
                {props.canUseCouponItems.length > 0 ? "选择优惠卷" : "不可用"}
              </p>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>优惠卷</DrawerHeader>
            <DrawerDescription></DrawerDescription>
            {/* 优惠卷是否可选 */}
            <div className="mt-10 pb-100 px-3">
              {props.canUseCouponItems.length > 0 ? (
                props.canUseCouponItems.map((item) => {
                  return (
                    <div
                      className="flex items-center justify-between text-lg font-[600]"
                      key={item.id}
                    >
                      <p>{item.title}</p>
                      <Checkbox
                        className="rounded-full border-gray-400 w-5 h-5"
                        checked={selectedCouponList?.includes(item)}
                        onCheckedChange={(checked) =>
                          handleSelectedPlatformCoupon(checked === true, item)
                        }
                      />
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-gray-500 text-lg">
                  优惠卷列表为空
                </div>
              )}
            </div>
            {props.canUseCouponItems.length > 0 && (
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button
                    className="w-full bg-orange-500 text-white"
                    onClick={() => handleCheckSelectCoupon()}
                  >
                    确认
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            )}
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
export default SettlementContent;
