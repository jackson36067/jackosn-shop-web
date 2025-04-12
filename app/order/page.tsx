"use client";

import { getOrderListAPI } from "@/apis/order";
import OrderContent from "@/components/order/OrderContent";
import OrderTypeSelector from "@/components/order/OrderTypeSelector";
import OrderTopBar from "@/components/order/topBar";
import { cn } from "@/lib/utils";
import { OrderItem } from "@/types/order";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderPage() {
  const pathParmas = useSearchParams();
  // 订单类型 0.全部 1.待付款 2.代发货 3.待收货 4.已完成
  const [type, setType] = useState<number>(Number(pathParmas.get("type")));
  // 订单列表
  const [orderList, setOrderList] = useState<OrderItem[]>([]);
  // 是否展示加载组件
  const [isLoding, setIsLoding] = useState<boolean>(true);
  useEffect(() => {
    setIsLoding(true);
    const getOrderList = async () => {
      const res = await getOrderListAPI(type);
      setOrderList(res.data);
      setIsLoding(false);
    };
    getOrderList();
  }, [type]);
  return (
    <div className="w-full h-full">
      <OrderTopBar />
      <OrderTypeSelector
        type={type}
        changeOrderType={(type: number) => setType(type)}
      />
      {/* 加载组件以及订单列表组件 */}
      {isLoding ? (
        <div className={cn("flex justify-center h-[100vh]")}>
          <Image src={"/image/loading.svg"} width={50} height={50} alt="" />
        </div>
      ) : (
        <div>
          {/* 订单为空组件以及订单列表组件 */}
          {orderList.length > 0 ? (
            <OrderContent orderItems={orderList} />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Icon
                icon={"akar-icons:file"}
                fontSize={"3rem"}
                className="text-gray-400"
              />
              <p className="text-gray-400 text-[0.9rem] font-[400]">
                您没有相关的订单
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
