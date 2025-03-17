"use client";

import { getCartGoodsAPI } from "@/apis/cart";
import BottomBar from "@/components/cart/BottomBar";
import CartGoods from "@/components/cart/goods";
import CartTopBar from "@/components/cart/TopBar";
import useSelectedGoodsStore from "@/stores/CartSelectedGoods";
import useMemberStore from "@/stores/MemberStore";
import { CartGoodItem } from "@/types/cart";
import { useEffect, useRef, useState } from "react";

export default function Cart() {
  const { setSelectedGoods } = useSelectedGoodsStore();
  const [cartGoods, setCartGoods] = useState<CartGoodItem[]>([]);
  const isFecth = useRef(false);
  const { memberInfo } = useMemberStore();
  const getCartGoods = async () => {
    const res = await getCartGoodsAPI();
    const data: CartGoodItem[] = res.data;
    setCartGoods(data);
    setSelectedGoods(
      data.filter((item) => {
        return item.checked;
      })
    );
  };
  useEffect(() => {
    if (isFecth.current) return;
    isFecth.current = true;
    getCartGoods();
  });
  return (
    <div>
      <CartTopBar />
      <CartGoods CartGoodsItems={cartGoods} />
      {memberInfo.token && (
        <BottomBar
          cartGoodsItems={cartGoods}
          getCartGoodsItems={getCartGoods}
        />
      )}
    </div>
  );
}
