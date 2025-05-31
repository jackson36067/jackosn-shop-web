"use client";
export const dynamic = "force-dynamic"; // ✅ 强制关闭预渲染

import { getMemberDefaultAddressAPI } from "@/apis/address";
import { getSelectCartGoodsListAPI } from "@/apis/cart";
import { getUserCanUseCouponListAPI } from "@/apis/coupon";
import { purchaseGoodsAPI } from "@/apis/order";
import LoadingComponent from "@/components/common/loading";
import SettlementBottomBar from "@/components/settlement/SettlementBottomBar";
import SettlementContent from "@/components/settlement/SettlementContent";
import SettlementTopBar from "@/components/settlement/SettlementTopBar";
import useSelectedGoodsStore from "@/stores/CartSelectedGoods";
import { AddressItem, AddressSelectedType } from "@/types/address";
import { SelectedCartItem } from "@/types/cart";
import { CouponItem } from "@/types/coupon";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Settlement() {
  // 默认地址值, 后续选择了就是选择的地址值
  const [defalultAddress, setDefaultAddress] =
    useState<AddressSelectedType | null>(null);
  // 选中的商品列表
  const [selectedCartGoodsList, setSelectedCartGoodsList] = useState<
    SelectedCartItem[]
  >([]);
  // 可用的优惠卷
  const [canUseCouponList, setCanUseCopuonList] = useState<CouponItem[]>([]);
  // 在store中获取被选中的商品
  const { selectedGoods, removeSelectedGoods } = useSelectedGoodsStore();
  // 选中的优惠卷
  const [selectedCouponList, setSelectedCouponList] = useState<CouponItem[]>(
    []
  );
  // 订单商品总费用
  const [totalPrice, setTotalPrice] = useState<number>(0);
  // 选择优惠卷后折扣总费用
  const [allDiscount, setAllDiscount] = useState<number>(0);
  // 是否展示生成订单加载组件
  const [showLoding, setShowLoding] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // 获取用户默认地址
    const getMemberDefaultAddress = async () => {
      const res = await getMemberDefaultAddressAPI();
      const data: AddressItem = res.data;
      const {
        id,
        tel,
        name,
        province,
        city,
        county,
        addressDetail,
        isDefault,
      } = data;
      setDefaultAddress({
        id: id,
        tel: tel,
        address: `${province}${city}${county}${addressDetail}`,
        name: name,
        isDefault: isDefault,
      });
    };
    getMemberDefaultAddress();

    // 获取用户购物车选中商品信息
    const getSelectedCartGoodsList = async () => {
      const res = await getSelectCartGoodsListAPI();
      const data: SelectedCartItem[] = res.data;
      setSelectedCartGoodsList(data);
      setTotalPrice(
        data.reduce((prev, item) => {
          return prev + item.price * item.number;
        }, 0)
      );
    };
    getSelectedCartGoodsList();

    // 获取用户可以使用的优惠卷列表
    const getCanUseCouponList = async () => {
      // 使用 forEach 和 Map 去重
      const uniqueArr: number[] = [];
      const map = new Map<number, boolean>();
      selectedGoods
        .map((item) => item.storeId)
        .forEach((value) => {
          if (!map.has(value)) {
            map.set(value, true);
            uniqueArr.push(value);
          }
        });
      const res = await getUserCanUseCouponListAPI(uniqueArr);
      setCanUseCopuonList(res.data);
    };
    getCanUseCouponList();
  }, [selectedGoods]);

  // 接收子组件传递选好的优惠卷列表
  const handleCheckSelectedCoupon = (selectedCoupon: CouponItem[]) => {
    setSelectedCouponList(selectedCoupon);
    // 计算选择后的总价格
    setAllDiscount(
      selectedCoupon
        .map((item) => item.discount)
        .reduce((prev, item) => prev + item)
    );
  };

  // 点击子组件提交订单完成下单操作
  const handlePlaceOrder = async () => {
    await purchaseGoodsAPI({
      consignee: defalultAddress?.name || "",
      mobile: defalultAddress?.tel || "",
      address: defalultAddress?.address || "",
      message: "",
      goodsPrice: totalPrice,
      freightPrice: 0,
      couponPrice: allDiscount,
      orderPrice: totalPrice - allDiscount,
      payStatus: true,
      orderGoodsList:
        selectedCartGoodsList.length > 0
          ? selectedCartGoodsList.map((item) => {
              return {
                goodsId: item.goodsId,
                goodsName: item.goodsName,
                goodsSn: item.goodsSn,
                productId: item.productId,
                number: item.number,
                price: item.price,
                specification: item.specifications,
                picUrl: item.picUrl,
              };
            })
          : [],
      useCouponIdList:
        selectedCouponList.length > 0
          ? selectedCouponList.map((item) => item.id)
          : [],
      cartIdList:
        selectedCartGoodsList.length > 0
          ? selectedCartGoodsList.map((item) => item.id)
          : [],
    });
    // 清除保存在本地选中的商品
    removeSelectedGoods(selectedCartGoodsList.map((item) => item.id));
    // 给出生成订单提示
    setShowLoding(true);
    setTimeout(() => {
      setShowLoding(false);
    }, 2000);
    // 支付后生成订单返回订单编号
    // 使用 forEach 和 Map 对商品id 去重
    const uniqueArr: number[] = [];
    const map = new Map<number, boolean>();
    selectedCartGoodsList
      .map((item) => item.goodsId)
      .forEach((value) => {
        if (!map.has(value)) {
          map.set(value, true);
          uniqueArr.push(value);
        }
      });
    // 拼接路径参数
    const str = uniqueArr.map((item) => `ids=${item}`).join("&");
    router.push(`/paymentComplete?${str}`);
    // window.location.href = `/paymentComplete?${str}`;
  };
  return (
    <Suspense>
      <div>
        <SettlementTopBar />
        <SettlementContent
          defaultAddress={defalultAddress}
          selectedGoodsList={selectedCartGoodsList}
          canUseCouponItems={canUseCouponList}
          changeSelectAddress={(address: AddressSelectedType | null) =>
            setDefaultAddress(address)
          }
          checkSelectCouponList={(selectedCoupon: CouponItem[]) =>
            handleCheckSelectedCoupon(selectedCoupon)
          }
        />
        <SettlementBottomBar
          allDiscount={allDiscount}
          totalPrice={totalPrice}
          handlePalceOrder={() => handlePlaceOrder()}
        />
        {/* 下单提示组件 */}
        {showLoding && <LoadingComponent title="下单中..." />}
      </div>
    </Suspense>
  );
}
