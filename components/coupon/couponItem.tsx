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
  const handleCheckCoupon = (id: number, isCheck: boolean) => {
    // 判断是否选中 ->
    if (isCheck) {
      selectedCouponId.current.push(id);
      setSelectedCouponId([...SelectedCouponId, id]);
      //
    } else {
      selectedCouponId.current = selectedCouponId.current.filter(
        (item) => item !== id
      );
      setSelectedCouponId(SelectedCouponId.filter((item) => item !== id));
    }
    props.setSelectedCouponId(selectedCouponId.current);
  };
  return (
    <div className="mt-10 px-5">
      {props.userCouponItems.map((item) => {
        return (
          <div key={item.storeId}>
            <div className="flex flex-col gap-1">
              <div
                className="flex gap-2 items-center"
                onClick={() =>
                  (window.location.href = `/store?id=${item.storeId}`)
                }
              >
                <Image
                  src={item.avatar}
                  width={30}
                  height={30}
                  alt=""
                  className="rounded-full"
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
                              handleCheckCoupon(couponItem.id, checked === true)
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
                          <div className="text-[12px]">
                            满{couponItem.min}可用
                          </div>
                        </div>
                        <div className="flex-3/4 flex justify-between items-center px-2">
                          <div className="text-[12px] text-red-600">
                            <p className="text-black text-[16px]">店铺优惠卷</p>
                            <p>{couponItem.expireTime}到期</p>
                            <p>限该店铺内商品可用</p>
                          </div>
                          <div className="bg-red-500 text-white p-2 text-[12px] rounded-[6px]">
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
