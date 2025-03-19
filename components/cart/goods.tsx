"use client";

import { CartGoodItem } from "@/types/cart";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CheckCircle, Circle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import useMemberStore from "@/stores/MemberStore";
import { useEffect, useState } from "react";
import useSelectedGoodsStore from "@/stores/CartSelectedGoods";
import { SetGoodsCheckedAPI } from "@/apis/cart";
import { IconRight } from "react-day-picker";
import { DropdownMenu } from "../ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

// 购物车有数据时
const CartContent = ({
  items,
  setCartItems,
}: {
  items: CartGoodItem[];
  setCartItems: (items: CartGoodItem[]) => void;
}) => {
  const { selectedGoods, setSelectedGoods } = useSelectedGoodsStore();

  // 点击选中按钮后执行
  const doCheckGoods = async (item: CartGoodItem) => {
    // 给点击的商品是否选中取反
    const newItems = items.map((i) =>
      i.id === item.id ? { ...i, checked: !i.checked } : i
    );
    // 更新选中购物车商品
    setCartItems(newItems);
    // 过滤出被选择的商品
    const checkedGoodsItems = newItems.filter((item) => {
      return item.checked;
    });
    // 发送请求修改商品的选中
    await SetGoodsCheckedAPI([item.id], !item.checked);
    setSelectedGoods(checkedGoodsItems);
  };

  // 点击增加或减少商品数量后执行
  const handleUpdateGoodsNumber = async (item: CartGoodItem, type: number) => {
    // 判断商品数量是否为1,如果为1,还是减的话则不执行
    if (type === 0 && item.number === 1) {
      return;
    }
    if (type === 1) {
      // 点击增加商品数量
      item.number += 1;
      // 更新购物车商品
    } else {
      // 点击减少商品数量
      item.number -= 1;
    }
    const newItems = items.map((i) =>
      i.id === item.id ? { ...i, number: item.number } : i
    );
    // 更新购物车商品
    setCartItems(newItems);
    // 如果商品被选中,则更新选中购物车商品
    if (item.checked) {
      // 更新选中购物车商品
      const newSelectedItems = selectedGoods.map((i) =>
        i.id === item.id ? { ...i, number: item.number } : i
      );
      setSelectedGoods(newSelectedItems);
    }
    // 发送请求修改商品数量
    await SetGoodsCheckedAPI([item.id], undefined, item.number);
  };
  return (
    <div className="pb-60 overflow-auto">
      {items.map((item) => {
        return (
          <div
            key={item.id}
            className="flex flex-col gap-3 mt-3 py-4 px-2 border rounded-lg bg-white"
          >
            <div className="flex justify-between items-center pl-10 pr-4">
              <div className="flex gap-2 items-center">
                <div>
                  <span className="text-[#d4392b] text-xl mr-2 font-mono">
                    jm
                  </span>
                  {item.storeName}
                </div>
                <IconRight className="w-3 h-3" />
              </div>

              <div className="flex items-center justify-end gap-4 text-sm text-gray-400">
                {item.isContainCoupon && (
                  <div className="flex items-center gap-1">
                    <div>领卷</div>
                    <IconRight className="w-3 h-3" />
                  </div>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Icon icon={"icon-park:more"} fontSize={28}></Icon>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="px-6 bg-gray-500 text-white rounded-lg">
                    <div className="py-2 border-b-[1px] border-white">收藏</div>
                    <div className="py-2">删除</div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex items-center gap-1 ">
              {/* 选中按钮 */}
              <button className="mr-3" onClick={() => doCheckGoods(item)}>
                {item.checked ? (
                  <CheckCircle className="text-red-500 w-6 h-6" />
                ) : (
                  <Circle className="text-gray-300 w-6 h-6" />
                )}
              </button>

              {/* 商品图片 */}
              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-md">
                <img src={item.picUrl} className="text-gray-400 w-16 h-16" />
              </div>

              {/* 商品信息 */}
              <div className="ml-4 flex-1">
                <p className="text-current font-medium truncate w-40">
                  {item.goodsName}
                </p>
                <p className="text-sm text-gray-500 truncate w-40">
                  {item.specifications}
                </p>
                <p className="text-lg font-bold text-red-500 mt-1">
                  ¥{item.price}
                </p>
              </div>

              {/* 数量控制 */}
              <div className="flex items-center mt-12">
                <button
                  onClick={() => handleUpdateGoodsNumber(item, 0)}
                  className="w-7 h-7 flex items-center justify-center border rounded-l-md bg-gray-100"
                >
                  <Icon icon={"stash:minus-light"} />
                </button>
                <span className="w-8 text-center">{item.number}</span>
                <button
                  onClick={() => handleUpdateGoodsNumber(item, 1)}
                  className="w-7 h-7 flex items-center justify-center border rounded-r-md bg-gray-100"
                >
                  <Icon icon={"mdi-light:plus"} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// 购物车为空时
const EmptyCartCategory = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-[700px]">
      <img src="/image/cart_empty@2x.png" className="w-28 h-28" />
      <p>你还没有添加任何任何商品</p>
    </div>
  );
};

// 未登录时
const noTokenContent = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4 h-[700px]">
        <p>请先登录</p>
        <Button className="bg-[#d4392b] p-6 text-xl">
          <Link href={"/login"}>点击登录</Link>
        </Button>
      </div>
    </div>
  );
};

const CartGoods = (props: { CartGoodsItems: CartGoodItem[] }) => {
  const { memberInfo } = useMemberStore();
  // 判断购物车商品是否全部选中
  const [cartItems, setCartItems] = useState(props.CartGoodsItems);
  useEffect(() => {
    setCartItems(props.CartGoodsItems);
  }, [props.CartGoodsItems]); // 仅当 props.CartGoodsItems 变化时更新 cartItems
  return (
    // 先判断有没有登录,再判断购物车是否为空
    <div>
      {!memberInfo.token ? (
        noTokenContent()
      ) : props.CartGoodsItems.length ? (
        <CartContent items={cartItems} setCartItems={setCartItems} />
      ) : (
        EmptyCartCategory()
      )}
    </div>
  );
};

export default CartGoods;
