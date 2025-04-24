"use client";

import useMemberStore from "@/stores/MemberStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IconRight } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { memberLogoutAPI } from "@/apis/member";
import { toast } from "sonner";
import { orderDataItem, orderTypeItem } from "@/types/order";
import { useEffect, useState } from "react";
import { getOrderCountDataAPI } from "@/apis/order";

const myRelaContent = [
  { icon: "mingcute:store-line", title: "收藏", path: "/collectGoods" },
  { icon: "ep:goods", title: "关注店铺", path: "/followStore" },
  { icon: "ic:sharp-history", title: "足迹", path: "browserHistory" },
];

// 没有登录时默认的头像
const defaultAvatar = "/image/user_avator_default@2x.png";

export default function My() {
  const { memberInfo, clearMemberInfo } = useMemberStore();
  const router = useRouter();

  const handleMemberLogout = async () => {
    await memberLogoutAPI();
    toast.success("登出成功");
    clearMemberInfo();
  };

  const [myOrderItems, setMyOrderItem] = useState<orderTypeItem[]>([
    {
      icon: "material-symbols-light:paid-outline",
      title: "待支付",
      path: `/order?type=1`,
      count: 0,
    },
    {
      icon: "mage:shop",
      title: "待发货",
      path: "/order?type=2",
      count: 0,
    },
    {
      icon: "material-symbols:local-shipping-outline",
      title: "待收货",
      path: "/order?type=3",
      count: 0,
    },
    {
      icon: "basil:chat-outline",
      title: "已完成",
      path: "/order?type=4",
      count: 0,
    },
    {
      icon: "mingcute:refund-cny-fill",
      title: "退款/售后",
      path: "/order?type=5",
      count: 0,
    },
  ]);

  // 获取用户订单数量数据
  useEffect(() => {
    const getOrderTypeCountData = async () => {
      const res = await getOrderCountDataAPI();
      const data: orderDataItem = res.data;

      setMyOrderItem([
        {
          icon: "material-symbols-light:paid-outline",
          title: "待支付",
          path: `/order?type=1`,
          count: data ? data.unPaymentOrderNumber : 0,
        },
        {
          icon: "mage:shop",
          title: "待发货",
          path: "/order?type=2",
          count: data ? data.unShippedOrderNumber : 0,
        },
        {
          icon: "material-symbols:local-shipping-outline",
          title: "待收货",
          path: "/order?type=3",
          count: data ? data.unReceiptOrderNumber : 0,
        },
        {
          icon: "basil:chat-outline",
          title: "已完成",
          path: "/order?type=4",
          count: data ? data.completedOrderNumber : 0,
        },
        {
          icon: "mingcute:refund-cny-fill",
          title: "退款/售后",
          path: "/order?type=5",
          count: data ? data.refundOrderNumber : 0,
        },
      ]);
    };
    getOrderTypeCountData();
  }, []);
  return (
    <div className="w-full h-full bg-[#f4f4f4] pb-28">
      {/* 信息展示 */}
      <div className="pt-10 pb-15 bg-[#ff2d4a]">
        {/* 用户头像 */}
        <div className="flex justify-center items-center">
          <div
            onClick={() => {
              if (!memberInfo.token) {
                router.push("/login");
              } else {
                router.push("/myInfo");
              }
            }}
          >
            <Image
              src={
                memberInfo.token
                  ? memberInfo.avatar ?? defaultAvatar
                  : defaultAvatar
              }
              alt=""
              className="w-20 h-20 rounded-full border-white border-2"
              width={30}
              height={30}
            />
          </div>
        </div>
        {/* 用户名称 */}
        <div className="text-white text-xl text-center mt-5">
          <div
            onClick={() => {
              if (!memberInfo.token) router.push("/login");
            }}
            className={memberInfo.token && "font-bold"}
          >
            {memberInfo.token ? memberInfo.nickname : "点击登录"}
          </div>
        </div>
      </div>
      {/* 底部操作区 */}
      <div className="w-full px-5 bg-white rounded-lg rounded-b-none -mt-5">
        <div className="flex justify-between w-full p-3">
          {myRelaContent.map((item, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-1"
                onClick={() => (window.location.href = item.path)}
              >
                <Icon icon={item.icon} fontSize={"1.4rem"} />
                <div>{item.title}</div>
              </div>
            );
          })}
        </div>
        <div className="w-full">
          <div className="flex justify-between pt-3">
            <div className="font-bold">我的订单</div>
            <div
              className="flex items-center gap-1"
              onClick={() => (window.location.href = "/order?type=0")}
            >
              <p className="text-sm">全部订单</p>
              <IconRight className="w-3 h-3" />
            </div>
          </div>
          <div className="flex justify-between w-full py-3 bg-white">
            {myOrderItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="relative flex flex-col justify-center items-center"
                  onClick={() => (window.location.href = item.path)}
                >
                  <div>
                    <Icon
                      icon={item.icon}
                      fontSize={"1.8rem"}
                      fontWeight={700}
                    />
                  </div>
                  <div className="text-sm">{item.title}</div>

                  {item.count > 0 && (
                    <div className="absolute top-0 right-1 w-4 h-4 rounded-full text-sm bg-red-600 text-white text-center">
                      {item.count}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="flex justify-between items-center py-3 border-b-[1px] border-gray-300"
          onClick={() => (window.location.href = "/address")}
        >
          <p>收货地址管理</p>
          <Icon icon="weui:arrow-outlined" className="w-8 h-8"></Icon>
        </div>
        <div>
          <div
            className="flex justify-between items-center py-3 border-b-[1px] border-gray-300"
            onClick={() => (window.location.href = "/coupon")}
          >
            <p>优惠卷管理</p>
            <Icon icon="weui:arrow-outlined" className="w-8 h-8"></Icon>
          </div>
          <div
            className="flex justify-between items-center py-3 bg-white border-b-[1px] border-gray-300"
            onClick={() => (window.location.href = "/couponCenter")}
          >
            <p>领卷中心</p>
            <Icon icon="weui:arrow-outlined" className="w-8 h-8"></Icon>
          </div>
        </div>
        <div className="my-3">
          <div className="flex justify-between items-center py-3 border-b-[1px] border-gray-300">
            <p>联系客服</p>
            <Icon icon="weui:arrow-outlined" className="w-8 h-8"></Icon>
          </div>
          <div className="flex justify-between items-center py-3 border-b-[1px] border-gray-300">
            <p>意见反馈</p>
            <Icon icon="weui:arrow-outlined" className="w-8 h-8"></Icon>
          </div>
        </div>
        {/* 进入修改手机号以及邮箱页 */}
        <div
          className="flex justify-between items-center py-3 mb-8"
          onClick={() => (window.location.href = "/account")}
        >
          <p>账号安全</p>
          <Icon icon="weui:arrow-outlined" className="w-8 h-8"></Icon>
        </div>
        {memberInfo.token && (
          <div>
            <Button
              className="w-full bg-[#ff2d4a]"
              size={"lg"}
              onClick={() => handleMemberLogout()}
            >
              退出登录
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
