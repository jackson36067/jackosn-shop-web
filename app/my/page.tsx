"use client";

import useMemberStore from "@/stores/MemberStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const myRelaContent = [
  { count: 0, title: "收藏的店铺" },
  { count: 0, title: "收藏的商品" },
  { count: 0, title: "关注的商品" },
  { count: 0, title: "我的足迹" },
];

const myOrderItems = [
  {
    icon: "mingcute:wallet-2-line",
    title: "待付款",
  },
  {
    icon: "mdi:truck",
    title: "待收货",
  },
  {
    icon: "ri:money-cny-box-fill",
    title: "退款/退货",
  },
  {
    icon: "lets-icons:order",
    title: "全部订单",
  },
];

// 没有登录时默认的头像j
const defaultAvatar = "/image/user_avator_default@2x.png";

export default function My() {
  const { memberInfo } = useMemberStore();
  const router = useRouter();
  return (
    <div className="w-full h-full bg-[#f4f4f4]">
      {/* 信息展示 */}
      <div className="pt-10 pb-15 bg-[#ff2d4a]">
        <h1 className="text-white text-3xl text-center mb-15">我的</h1>
        <div className="flex justify-center items-center gap-8">
          <div>
            <Icon icon="weui:setting-outlined" className="text-white w-8 h-8" />
          </div>
          <div
            onClick={() => {
              router.push("/myInfo");
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
          <div>
            <Icon
              icon="fluent:chat-20-regular"
              className="text-white w-8 h-8"
            />
          </div>
        </div>
        <div className="text-white text-xl text-center mt-5">
          <Link href="/login">
            {memberInfo.token ? memberInfo.nickname : "点击登录"}
          </Link>
        </div>
      </div>
      {/* 底部操作区 */}
      <div className="w-[96%] mx-auto p-2">
        <div className="flex justify-around w-full py-3 bg-white -mt-5">
          {myRelaContent.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center text-[#6a6a6a]"
              >
                <div>{item.count}</div>
                <div>{item.title}</div>
              </div>
            );
          })}
        </div>
        <div className="w-full mt-5 bg-white">
          <div className="text-xl pl-5 py-3 border-b-[1px] border-gray-300">
            我的订单
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
        <div className="flex justify-between items-center py-3 px-4 bg-white my-3">
          <p>收货地址管理</p>
          <Icon icon="weui:arrow-outlined" className="w-8 h-8"></Icon>
        </div>
        <div>
          <div className="flex justify-between items-center py-3 px-4 bg-white border-b-[1px] border-gray-300">
            <p>联系客服</p>
            <Icon icon="weui:arrow-outlined" className="w-8 h-8"></Icon>
          </div>
          <div className="flex justify-between items-center py-3 px-4 bg-white border-b-[1px] border-gray-300">
            <p>意见反馈</p>
            <Icon icon="weui:arrow-outlined" className="w-8 h-8"></Icon>
          </div>
        </div>
      </div>
    </div>
  );
}
