"use client";

import { memberCouponMemberType } from "@/types/coupon";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const CouponTopBar = (props: {
  memberCouponList: memberCouponMemberType[];
  setNewDeleteState: (newDeleteState: boolean) => void;
}) => {
  // TODO: 点击删除调用父组件的函数将state传递过去
  const state = useRef(false);
  const router = useRouter();
  // 点击更新删除状态
  const handleChangeDeleteState = () => {
    // 更新删除状态的值
    state.current = !state.current;
    // 将数据通过函数传递给父组件
    props.setNewDeleteState(state.current);
  };
  return (
    <div className="flex justify-between items-center py-3 px-5">
      <div className="text-current flex gap-3 items-center">
        <Icon
          icon="fluent-mdl2:back"
          className="w-4 h-4"
          onClick={() => router.back()}
        />
        <div className="font-bold">我的权益</div>
      </div>
      {!!props.memberCouponList.length && (
        <div
          className="text-gray-500"
          onClick={() => handleChangeDeleteState()}
        >
          {state.current ? "取消" : "删除"}
        </div>
      )}
    </div>
  );
};
export default CouponTopBar;
