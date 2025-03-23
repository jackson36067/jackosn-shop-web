"use client";

import {
  getMemberCouponAPI,
  removeAllMemberCouponByIdsAPI,
} from "@/apis/coupon";
import CouponContent from "@/components/coupon/couponItem";
import CouponTopBar from "@/components/coupon/topbar";
import { UserCouponItem } from "@/types/coupon";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function CouponPage() {
  // 定义接收用户优惠卷参数数据
  const [memberCouponList, setMemberCouponList] = useState<UserCouponItem[]>(
    []
  );
  // 判断删除状态值,用于判断用户操作
  const [deleteState, setDeleteState] = useState(false);
  // 用于接收被选中的优惠卷的id
  const [selectedCouponId, setSelectedCouponId] = useState<number[]>([]);
  // 用于确保值发送一次请求
  const isFetch = useRef<boolean>(false);
  // 发送请求获取数据
  const getMemberCouponList = async () => {
    const res = await getMemberCouponAPI();
    setMemberCouponList(res.data);
  };
  // 传空数组没有条件,那么组件加载时就执行
  useEffect(() => {
    if (isFetch.current) return;
    isFetch.current = true;
    getMemberCouponList();
  }, []);
  // 修改删除状态值
  const changeDeleteState = (newDeleteState: boolean) => {
    setDeleteState(newDeleteState);
  };

  // 接收新的数据 -> 将该函数传递给子组件,子组件一但修改被选中的优惠卷,这里也会更新
  const handelGetNewSeletedCouponId = (newSelectedCouponId: number[]) => {
    setSelectedCouponId(newSelectedCouponId);
  };
  // 移除被选中的优惠卷
  const handleRemoveCheckedCoupon = async () => {
    if (!selectedCouponId.length) {
      toast.info("没有选中删除内容");
      return;
    }
    await removeAllMemberCouponByIdsAPI(selectedCouponId);
    // 重新获取用户优惠卷列表
    getMemberCouponList();
  };
  return (
    <div>
      <CouponTopBar
        memberCouponList={memberCouponList}
        setNewDeleteState={changeDeleteState}
      />
      {memberCouponList.length > 0 ? (
        <CouponContent
          userCouponItems={memberCouponList}
          deleteState={deleteState}
          setSelectedCouponId={handelGetNewSeletedCouponId}
        />
      ) : (
        <div className="w-full font-bold text-2xl text-red-400 text-center mt-10">
          优惠卷空空如也
        </div>
      )}
      {deleteState && (
        <div
          className="fixed bottom-2 right-2 border-red-500 border-[1px] p-1 px-6 rounded-xl text-red-500"
          onClick={() => handleRemoveCheckedCoupon()}
        >
          删除
        </div>
      )}
    </div>
  );
}
