"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "../ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getDateMonthsAgo } from "@/utils/dateUtils";
import { formatDateForLocalDateTime } from "@/utils/dateFormat";
import { useRouter } from "next/navigation";

const OrderPlaceTimeButtonItems: { title: string; value: number }[] = [
  {
    title: "近1个月",
    value: 1,
  },
  {
    title: "近3个月",
    value: 3,
  },
  {
    title: "近6个月",
    value: 6,
  },
  {
    title: "近9个月",
    value: 9,
  },
];
const OrderTopBar = (props: {
  changePlaceOrderTimeRange: (begin: string, end: string) => void;
  changeOrderSnOrGoodsName: (value: string) => void;
}) => {
  // 是否代开弹窗
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  // 搜索订单-订单商品名称/订单编号
  const [goodsNameOrOrderSn, setGoodsNameOrOrderSn] = useState<string>("");
  // 选择的时间范围, 数据代表x个月前
  const [selectPlaceOrderTimeRangeButton, setPlaceOrderTimeRangeButton] =
    useState<number>(0);
  const router = useRouter();
  // 选择好时间范围后改变值
  const handleSelectPlaceOrderTimeRange = (value: number) => {
    setPlaceOrderTimeRangeButton(value);
  };
  // 点击确认获取指定时间范围的订单
  const handleCheckPlaceOrderTimeOrder = () => {
    // 将选择好的时间范围传递给父组件
    props.changePlaceOrderTimeRange(
      // 将Date数据格式化为 yyyy-MM-dd hh:mm:ss
      formatDateForLocalDateTime(
        getDateMonthsAgo(selectPlaceOrderTimeRangeButton) // 获取距离今天多少个月前的Date日期
      ),
      formatDateForLocalDateTime(new Date())
    );
    // 关闭弹窗
    setDrawerOpen(false);
  };
  // 重置时间范围的订单
  const resetPlaceOrderTimeRange = () => {
    setPlaceOrderTimeRangeButton(0);
  };
  return (
    <div className="fixed top-0 left-0 flex items-center gap-3 p-3 w-full bg-white">
      <Icon
        icon={"material-symbols:keyboard-arrow-left"}
        fontSize={"1.6rem"}
        onClick={() => router.push("my")}
      />
      {/* 搜索框 */}
      <div className="flex-1 relative">
        <Icon
          icon={"material-symbols:search-rounded"}
          className="absolute top-2 left-2 text-gray-500"
          fontSize={"1.5rem"}
        />
        <Input
          placeholder="搜索订单"
          className="bg-gray-200 py-2 pl-10 text-gray-500"
          value={goodsNameOrOrderSn}
          onInput={(event: React.FormEvent<HTMLInputElement>) => {
            const inputValue = (event.target as HTMLInputElement).value;
            setGoodsNameOrOrderSn(inputValue);
          }}
        />
        {goodsNameOrOrderSn && (
          <div>
            <Icon
              className="absolute right-15 top-1"
              icon={
                "material-symbols-light:disabled-by-default-outline-rounded"
              }
              fontSize={"1.6rem"}
              // 点击后清空输入框的值,重新获取订单数据
              onClick={() => {
                setGoodsNameOrOrderSn("");
                props.changeOrderSnOrGoodsName("");
              }}
            />
            <button
              className="absolute right-0 top-0 bg-orange-500 h-full px-2 rounded-sm text-white"
              // 点击搜索后,将输入框的值传递给父组件
              onClick={() => {
                props.changeOrderSnOrGoodsName(goodsNameOrOrderSn);
              }}
            >
              搜索
            </button>
          </div>
        )}
      </div>
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger>
          {/* 筛选图标 */}
          <Icon icon={"clarity:filter-line"} fontSize={"1.6rem"} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle className="text-center">订单筛选</DrawerTitle>
          <DrawerDescription></DrawerDescription>
          <div className="px-3 mt-3 pb-10">
            <p className="font-[600]">下单时间</p>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {OrderPlaceTimeButtonItems.map((item) => {
                return (
                  <Button
                    className={cn(
                      "bg-[#f6f6f6] text-[#141b23]",
                      selectPlaceOrderTimeRangeButton === item.value &&
                        "bg-[#f2f6f9] border-[1px] border-orange-500"
                    )}
                    key={item.value}
                    onClick={() => handleSelectPlaceOrderTimeRange(item.value)}
                  >
                    {" "}
                    {item.title}
                  </Button>
                );
              })}
            </div>
          </div>
          <DrawerFooter className="w-full">
            <div className="w-full flex items-center gap-2 text-white">
              <Button
                className="flex-1/2 bg-[#ffad00]"
                onClick={() => resetPlaceOrderTimeRange()}
              >
                重置
              </Button>
              <Button
                className="flex-1/2 bg-[#ff5c01]"
                onClick={() => handleCheckPlaceOrderTimeOrder()}
              >
                确认
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default OrderTopBar;
