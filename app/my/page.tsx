"use client";

import useMemberStore from "@/stores/MemberStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IconRight } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { memberLogoutAPI } from "@/apis/member";
import { toast } from "sonner";

const myRelaContent = [
  { icon: "mingcute:store-line", title: "收藏", path: "/collectGoods" },
  { icon: "ep:goods", title: "关注店铺", path: "/followStore" },
  { icon: "ic:sharp-history", title: "足迹", path: "browserHistory" },
];

const myOrderItems = [
  {
    icon: "mingcute:wallet-2-line",
    title: "待支付",
  },
  {
    icon: "mdi:truck",
    title: "待发货",
  },
  {
    icon: "ri:money-cny-box-fill",
    title: "待收货",
  },
  {
    icon: "lets-icons:order",
    title: "已完成",
  },
];

// 没有登录时默认的头像j
const defaultAvatar = "/image/user_avator_default@2x.png";

export default function My() {
  const { memberInfo, clearMemberInfo } = useMemberStore();
  const router = useRouter();

  const handleMemberLogout = async () => {
    await memberLogoutAPI();
    toast.success("登出成功");
    clearMemberInfo();
    setTimeout(() => {
      router.push("/login");
    }, 200);
  };
  return (
    <div className="w-full h-full bg-[#f4f4f4] pb-28">
      {/* 信息展示 */}
      <div className="pt-10 pb-15 bg-[#ff2d4a]">
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
        <div className="text-white text-xl text-center mt-5">
          <div
            onClick={() => {
              if (!memberInfo.token) router.push("/login");
            }}
          >
            {memberInfo.token ? memberInfo.nickname : "点击登录"}
          </div>
        </div>
      </div>
      {/* 底部操作区 */}
      <div className="w-[96%] mx-auto p-2">
        <div className="flex justify-around w-full py-3 bg-white -mt-5">
          {myRelaContent.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-center items-center gap-2 text-[#6a6a6a]"
                onClick={() => (window.location.href = item.path)}
              >
                <Icon icon={item.icon} fontSize={"1.3rem"} />
                <div>{item.title}</div>
              </div>
            );
          })}
        </div>
        <div className="w-full mt-5 bg-white">
          <div className="flex justify-between px-5 py-3 border-b-[1px] border-gray-300">
            <div className="text-xl">我的订单</div>
            <div className="flex items-center gap-1 text-gray-500">
              <p>全部订单</p>
              <IconRight className="w-3 h-3" />
            </div>
          </div>
          <div className="flex justify-around w-full py-3 bg-white">
            {myOrderItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center"
                >
                  <div>
                    <Icon
                      icon={item.icon}
                      className="w-12 h-12 text-[#ff2d4a]"
                    />
                  </div>
                  <div>{item.title}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="flex justify-between items-center py-3 px-4 bg-white my-3"
          onClick={() => (window.location.href = "/address")}
        >
          <p>收货地址管理</p>
          <Icon icon="weui:arrow-outlined" className="w-8 h-8"></Icon>
        </div>
        <div>
          <div
            className="flex justify-between items-center py-3 px-4 bg-white border-b-[1px] border-gray-300"
            onClick={() => (window.location.href = "/coupon")}
          >
            <p>优惠卷管理</p>
            <Icon icon="weui:arrow-outlined" className="w-8 h-8"></Icon>
          </div>
          <div
            className="flex justify-between items-center py-3 px-4 bg-white border-b-[1px] border-gray-300"
            onClick={() => (window.location.href = "/couponCenter")}
          >
            <p>领卷中心</p>
            <Icon icon="weui:arrow-outlined" className="w-8 h-8"></Icon>
          </div>
        </div>
        <div className="my-3">
          <div className="flex justify-between items-center py-3 px-4 bg-white border-b-[1px] border-gray-300">
            <p>联系客服</p>
            <Icon icon="weui:arrow-outlined" className="w-8 h-8"></Icon>
          </div>
          <div className="flex justify-between items-center py-3 px-4 bg-white border-b-[1px] border-gray-300">
            <p>意见反馈</p>
            <Icon icon="weui:arrow-outlined" className="w-8 h-8"></Icon>
          </div>
        </div>
        {/* 进入修改手机号以及邮箱页 */}
        <div
          className="flex justify-between items-center py-3 px-4 bg-white mb-8"
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
