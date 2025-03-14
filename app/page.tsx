"use client";

import { getColumnListAPI } from "@/apis/column";
import Banner from "@/components/home/Banner";
import Category from "@/components/home/Category";
import NavBar from "@/components/home/NavBar";
import TopSearch from "@/components/home/TopSearch";
import ToTopButton from "@/components/home/ToTop";
import { NavBarMenuItem } from "@/types/column";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

const BannerItems = [
  { img: "/upload/banner1.webp" },
  { img: "/upload/banner2.webp" },
  { img: "/upload/ban3.webp" },
  { img: "/upload/ban4.webp" },
  { img: "/upload/ban5.webp" },
];

const categoryItems = [
  {
    title: "新品上线",
    prompt: "更多新品上线",
    type: 0,
    goods: [],
  },
  {
    title: "产品热销",
    prompt: "更多热销商品",
    type: 1,
    goods: [],
  },
];

export default function Home() {
  // 获取navBar数据
  const [columnList, setColumnList] = useState<NavBarMenuItem[]>([]);
  const getColumnList = async () => {
    const res = await getColumnListAPI();
    const data: NavBarMenuItem[] = res.data;
    data.forEach((item) => {
      item.path = `/columnGoods?id=${item.id}`;
    });
    setColumnList(data);
  };
  const hasFetched = useRef(false); // 追踪是否已经发送请求
  useEffect(() => {
    if (hasFetched.current) return; // 如果已经请求过，则不再执行
    hasFetched.current = true;
    getColumnList();
  }, []);

  // 是否显示回到顶部按钮
  const [showButton, setShowButton] = useState(false);
  // 监听窗口Y轴方向移动
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
  return (
    <div className="w-full">
      <div className="overflow-auto">
        {/* 顶部搜索栏 */}
        <TopSearch />
        {/* 轮播图 */}
        <Banner BannerItems={BannerItems} />
        {/* 可选菜单 */}
        <NavBar NavBarMenuItems={columnList} />
        {/* 分类列表 */}
        <Category categoryItems={categoryItems} />
        {/* 底部提示 */}
        <div className="flex justify-center text-[#999] text-2xl mt-4 items-center">
          <Icon icon="line-md:emoji-smile-wink"></Icon>
          我是有底线的!
        </div>
      </div>
      {/* 回到顶部提示框 */}
      {showButton && <ToTopButton />}
    </div>
  );
}
