import { UserCouponItem } from "@/types/coupon";
import { Checkbox } from "../ui/checkbox";
import { useRef, useState } from "react";
import Image from "next/image";
import { IconRight } from "react-day-picker";

const CouponContent = (props: {
  userCouponItems: UserCouponItem[];
  deleteState: boolean;
  setSelectedCouponId: (newSelectedCouponId: number[]) => void;
}) => {
  // 用于接收被选中的优惠卷的id
  const selectedCouponId = useRef<number[]>([]);
  const [SelectedCouponId, setSelectedCouponId] = useState<number[]>([]);
  // 监听checkbox更改
  const handleCheckCoupon = (idList: number[], isCheck: boolean) => {
    // 判断是否选中 ->
    if (isCheck) {
      selectedCouponId.current = [...selectedCouponId.current, ...idList];
      setSelectedCouponId([...SelectedCouponId, ...idList]);
      //
    } else {
      selectedCouponId.current = selectedCouponId.current.filter(
        (item) => !idList.includes(item)
      );
      setSelectedCouponId(
        SelectedCouponId.filter((item) => !idList.includes(item))
      );
    }
    props.setSelectedCouponId(selectedCouponId.current);
  };
  return (
    <div className="mt-10 px-5">
      {props.userCouponItems.map((item) => {
        return (
          <div key={item.storeId}>
            <div className="flex flex-col gap-2">
              <div
                className="flex gap-2 items-center"
                onClick={() =>
                  (window.location.href = `/store?id=${item.storeId}`)
                }
              >
                {props.deleteState && (
                  <div className="flex items-center pr-2">
                    <Checkbox
                      checked={item.memberCouponItemVOList
                        .map((item) => item.id)
                        .every((item) => SelectedCouponId.includes(item))}
                      onCheckedChange={(checked) =>
                        handleCheckCoupon(
                          item.memberCouponItemVOList.map((item) => item.id),
                          checked === true
                        )
                      }
                      className="rounded-full w-5 h-5 border-[1px] border-gray-500"
                      onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    />
                  </div>
                )}
                <Image
                  src={item.avatar}
                  width={30}
                  height={30}
                  alt=""
                  className="rounded-full w-10 h-10"
                ></Image>
                <div>{item.name}</div>
                <div>
                  <IconRight className="w-3 h-3" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                {item.memberCouponItemVOList.map((couponItem) => {
                  return (
                    <div
                      key={couponItem.id}
                      className="flex-1 flex items-center"
                    >
                      {props.deleteState && (
                        <div className="flex-1/10">
                          <Checkbox
                            checked={SelectedCouponId.includes(couponItem.id)}
                            onCheckedChange={(checked) =>
                              handleCheckCoupon(
                                [couponItem.id],
                                checked === true
                              )
                            }
                            className="rounded-full w-5 h-5 border-[1px] border-gray-500"
                          />
                        </div>
                      )}
                      <div className="flex flex-9/10 items-center bg-[#ffece5]/90 rounded-lg">
                        <div className="flex-1/4 flex flex-col items-center justify-center border-r-[1px] border-red-500 border-dashed py-4 text-red-600">
                          <div className="font-bold text-lg">
                            ￥
                            <span className="text-2xl">
                              {couponItem.discount}
                            </span>
                          </div>
                          <div className="text-[0.8rem]">
                            满{couponItem.min}可用
                          </div>
                        </div>
                        <div className="flex-3/4 flex justify-between items-center px-2">
                          <div className="text-[0.8rem] text-red-600">
                            <p className="text-black text-[1rem]">店铺优惠卷</p>
                            <p>{couponItem.expireTime}到期</p>
                            <p>限该店铺内商品可用</p>
                          </div>
                          <div className="bg-red-500 text-white p-2 text-[0.8rem] rounded-[0.4rem]">
                            使用
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CouponContent;
