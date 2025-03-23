"use client";

import { CartGoodItem } from "@/types/cart";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CheckCircle, Circle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import useMemberStore from "@/stores/MemberStore";
import { useEffect, useState } from "react";
import useSelectedGoodsStore from "@/stores/CartSelectedGoods";
import { removeGoodsFromCartAPI, SetGoodsCheckedAPI } from "@/apis/cart";
import { IconRight } from "react-day-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { getStoreCouponAPI, getUnGetStoreCouponListAPI } from "@/apis/coupon";
import { SotreCouponItem } from "@/types/coupon";
import { toast } from "sonner";
import { doCollectOrCancelCollectGoodsAPI } from "@/apis/goods";

// 购物车有数据时
const CartContent = ({
  items,
  setCartItems,
  getCartGoodsItems,
}: {
  items: CartGoodItem[];
  setCartItems: (items: CartGoodItem[]) => void;
  getCartGoodsItems: () => void;
}) => {
  // 用于保存被选中的购物车商品
  const { selectedGoods, setSelectedGoods } = useSelectedGoodsStore();
  // 记录被点击打开的drawerId,防止打开多个,也可以用于控制drawer的打开与关闭
  const [openId, setOpenId] = useState<number | null>(null);
  // 记录通过点击id获取到的优惠卷列表
  const [storeCouponList, setStoreCouponList] = useState<SotreCouponItem[]>([]);

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

  // 从购物车中移除商品
  const handleRemoveGoodsFromCart = async (id: number) => {
    await removeGoodsFromCartAPI(id);
    // 重新获取购物车数据
    getCartGoodsItems();
  };

  // 获取商家提供未领取的优惠卷列表
  const getUnGetCouponList = async (storeId: number) => {
    // 根据店家id获取优惠卷数据
    const res = await getUnGetStoreCouponListAPI(storeId);
    setStoreCouponList(res.data);
  };

  // 监听优惠卷弹窗的开启事件
  const handleDrawerOpenChange = (isOpen: boolean, item: CartGoodItem) => {
    // 判断是关闭还是开启,修改开启drawer的id
    setOpenId(isOpen ? item.id : null);
    // 如果是开启弹窗就发送请求获取数据,并且第一次获取后就不需要再发起请求获取了
    if (isOpen && !storeCouponList.length) {
      getUnGetCouponList(item.storeId);
    }
  };

  // 关注并且领取优惠卷
  const handleGetStoreCoupon = async (couponId: number, storeId: number) => {
    await getStoreCouponAPI(storeId, couponId);
    toast.success("成功领取优惠卷");
    // 重新获取优惠卷
    // getUnGetCouponList(storeId);
    // 或者直接从数据中移除这一个数据
    setStoreCouponList(
      storeCouponList.filter((item) => {
        return item.id !== couponId;
      })
    );
  };

  // 收藏商品或者取消收藏商品
  const handleCollectOrCancleCollectGoods = async (
    goodsId: number,
    isCollect: boolean
  ) => {
    // 发起请求收藏或者取消收藏商品
    await doCollectOrCancelCollectGoodsAPI(goodsId, isCollect);
    // 重新获取购物车商品数据
    getCartGoodsItems();
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
              <div
                className="flex gap-2 items-center"
                onClick={() =>
                  (window.location.href = `/store?id=${item.storeId}`)
                }
              >
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
                  <Drawer
                    direction="bottom"
                    open={openId === item.id}
                    onOpenChange={(isOpen) =>
                      handleDrawerOpenChange(isOpen, item)
                    }
                  >
                    <DrawerTrigger className="flex items-center gap-1">
                      <div>领卷</div>
                      <IconRight className="w-3 h-3" />
                    </DrawerTrigger>
                    <DrawerContent className="px-5">
                      <DrawerTitle className="pt-3 text-center">
                        优惠
                      </DrawerTitle>
                      <DrawerDescription className="text-sm text-gray-400 pt-3">
                        领卷
                      </DrawerDescription>
                      <div className="pb-180">
                        {storeCouponList.map((couponItem) => {
                          return (
                            <div
                              key={couponItem.id}
                              className="w-[100%] bg-[#ffece5]/90 rounded-lg mt-5 p-2"
                            >
                              <div className="flex items-center">
                                <div className="flex-2/3 flex flex-col gap-1 border-dashed border-r-[0.05rem] border-gray-600 text-sm text-orange-600">
                                  <div>
                                    ￥
                                    <span className="font-bold text-3xl px-1">
                                      {couponItem.discount}
                                    </span>
                                    {couponItem.title}
                                  </div>
                                  <div>订单金额满{couponItem.min}元可使用</div>
                                  <div>
                                    领取后{couponItem.expireDay}天内可使用
                                  </div>
                                </div>
                                <div className="flex-1/3 flex justify-center pl-2">
                                  <button
                                    className="rounded-2xl bg-orange-600 text-white p-2"
                                    onClick={() =>
                                      handleGetStoreCoupon(
                                        couponItem.id,
                                        item.storeId
                                      )
                                    }
                                  >
                                    关注并领取
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </DrawerContent>
                  </Drawer>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Icon icon={"icon-park:more"} fontSize={28}></Icon>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-500 text-white rounded-lg text-center">
                    <div
                      className="py-2 border-b-[1px] border-white"
                      onClick={() =>
                        handleCollectOrCancleCollectGoods(
                          item.goodsId,
                          item.isCollect
                        )
                      }
                    >
                      {item.isCollect ? "取消收藏" : "收藏"}
                    </div>
                    <div
                      className="py-2"
                      onClick={() => handleRemoveGoodsFromCart(item.id)}
                    >
                      删除
                    </div>
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

const CartGoods = (props: {
  CartGoodsItems: CartGoodItem[];
  getCartGoodsItems: () => void;
}) => {
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
        <CartContent
          items={cartItems}
          setCartItems={setCartItems}
          getCartGoodsItems={props.getCartGoodsItems}
        />
      ) : (
        EmptyCartCategory()
      )}
    </div>
  );
};

export default CartGoods;
