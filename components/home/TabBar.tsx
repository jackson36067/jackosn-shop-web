"use client";

import { getMemberUnReadMessageCountAPI } from "@/apis/message";
import useSelectedGoodsStore from "@/stores/CartSelectedGoods";
import useUnReadMessageStore from "@/stores/unReadMessageStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface TabBarItem {
  title: string;
  path: string;
  icon: string;
  activeIcon: string;
  sum: number;
}

// 只有这些路径显示tabBar
const showTabBarPath = ["/", "/category", "/my", "/cart", "/message"];

const TabBar = () => {
  const [TabBarItems, setTabBarItems] = useState<TabBarItem[]>([]);
  const { selectedGoods } = useSelectedGoodsStore();
  const { unReadMessageCount, setUnReadMessageCount } = useUnReadMessageStore();
  const pathname = usePathname();
  useEffect(() => {
    const getUnReadMessageCount = async () => {
      const res = await getMemberUnReadMessageCountAPI();
      setUnReadMessageCount(res.data);
    };
    getUnReadMessageCount();
    setTabBarItems([
      {
        title: "首页",
        path: "/",
        icon: "/image/icon_home@3x.png",
        activeIcon: "/image/icon_home_active@3x.png",
        sum: 0,
      },
      {
        title: "分类",
        path: "/category",
        icon: "/image/icon_category@3x.png",
        activeIcon: "/image/icon_category_active@3x.png",
        sum: 0,
      },
      {
        title: "消息",
        path: "/message",
        icon: "/image/message.png",
        activeIcon: "/image/active_message.png",
        sum: unReadMessageCount || 0,
      },
      {
        title: "购物车",
        path: "/cart",
        icon: "/image/icon_cart@3x.png",
        activeIcon: "/image/icon_cart_active@3x.png",
        sum: selectedGoods.length || 0,
      },
      {
        title: "我的",
        path: "/my",
        icon: "/image/icon_me@3x.png",
        activeIcon: "/image/icon_me_active@3x.png",
        sum: 0,
      },
    ]);
  }, [selectedGoods.length, setUnReadMessageCount, unReadMessageCount]);
  return (
    showTabBarPath.includes(pathname) && (
      <div className="fixed bottom-0 z-9999 w-full bg-white border-t-1 border-slate-700 py-3">
        <div className="flex justify-around items-center">
          {TabBarItems.map((item, index) => {
            return (
              <Link
                key={index}
                className="flex flex-col items-center"
                href={item.path}
              >
                <div className="relative">
                  {item.sum! > 0 && (
                    <div className="absolute -top-1 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex justify-center items-center">
                      {item.sum}
                    </div>
                  )}
                  <img
                    src={pathname === item.path ? item.activeIcon : item.icon}
                    className="w-8 h-8"
                  />
                </div>
                <div
                  className={
                    pathname === item.path ? "text-[#ff2d4a]" : "#343434"
                  }
                >
                  {item.title}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    )
  );
};
export default TabBar;
