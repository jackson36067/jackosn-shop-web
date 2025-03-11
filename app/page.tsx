"use client";

import Banner from "@/components/home/Banner";
import Category from "@/components/home/Category";
import NavBar from "@/components/home/NavBar";
import TopSearch from "@/components/home/TopSearch";
import ToTopButton from "@/components/home/ToTop";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const BannerItems = [
  { img: "/image/banner1.png", alt: "服装" },
  { img: "/image/banner2.png", alt: "家具" },
  { img: "/image/banner3.png", alt: "好货" },
];

const NavBarMenuItems = [
  { img: "/image/icon_index_nav_4@2x.png", alt: "分类", path: "/category" },
  { img: "/image/icon_index_nav_3@2x.png", alt: "秒杀拍", path: "" },
  { img: "/image/icon_index_nav_2@2x.png", alt: "超市购", path: "" },
  { img: "/image/icon_index_nav_1@2x.png", alt: "母婴品", path: "" },
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
