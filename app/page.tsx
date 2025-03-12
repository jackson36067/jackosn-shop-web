"use client";

import Banner from "@/components/home/Banner";
import Category from "@/components/home/Category";
import NavBar from "@/components/home/NavBar";
import TopSearch from "@/components/home/TopSearch";
import ToTopButton from "@/components/home/ToTop";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const BannerItems = [
  { img: "/upload/banner1.webp" },
  { img: "/upload/banner2.webp" },
  { img: "/upload/ban3.webp" },
  { img: "/upload/ban4.webp" },
  { img: "/upload/ban5.webp" },
];

const NavBarMenuItems = [
  {
    img: "/upload/0eb1a5b728c38a2f3c6b77102fd4c219.webp",
    title: "分类",
    path: "/",
  },
  {
    img: "/upload/059acb7b0a57ad610b54923cfcc916c0.webp",
    title: "服装服饰",
    path: "/",
  },
  {
    img: "/upload/3062fd920f70109cc16d76c9ccd1e0ba.webp",
    title: "洗发护发",
    path: "/",
  },
  {
    img: "/upload/7e27e3f34d74fdc7ab7fc1910d5e7e10.webp",
    title: "功能箱包",
    path: "/",
  },
];

const categoryItems = [
  {
    titleImg: "/image/pic_floor01_title@2x.png",
    mainImg: "/image/pic_floor01_1@2x.png",
    mediumImg: ["/image/pic_floor01_2@2x.png", "/image/pic_floor01_3@2x.png"],
    rightImg: ["/image/pic_floor01_4@2x.png", "/image/pic_floor01_5@2x.png"],
    direction: "y",
  },
  {
    titleImg: "/image/pic_floor02_title@2x.png",
    mainImg: "/image/pic_floor02_1@2x.png",
    mediumImg: ["/image/pic_floor02_2@2x.png", "/image/pic_floor02_3@2x.png"],
    rightImg: ["/image/pic_floor02_4@2x.png", "/image/pic_floor02_5@2x.png"],
    direction: "x",
  },
  {
    titleImg: "/image/pic_floor03_title@2x.png",
    mainImg: "/image/pic_floor03_1@2x.png",
    mediumImg: ["/image/pic_floor03_2@2x.png", "/image/pic_floor03_3@2x.png"],
    rightImg: ["/image/pic_floor03_4@2x.png", "/image/pic_floor03_5@2x.png"],
    direction: "x",
  },
];

export default function Home() {
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
        <NavBar NavBarMenuItems={NavBarMenuItems} />
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
