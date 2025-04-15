"use client";

import { orderGoodsItem } from "@/types/order";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { Button } from "../ui/button";

const OrderGoodsContent = (props: {
  orderStatus: number | undefined;
  goodsItems: orderGoodsItem[] | undefined;
}) => {
  return (
    <div>
      {props.goodsItems?.map((goodsItem) => {
        return (
          <div
            className="flex flex-col bg-white border-b-[1px] border-b-gray-300 last:border-0 pb-3"
            key={goodsItem.id}
          >
            {/* 店铺信息以及订单状态 */}
            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center gap-1">
                <p className="font-[600]">{goodsItem.storeName}</p>
                <Icon
                  icon={"material-symbols-light:keyboard-arrow-right"}
                  fontSize={"1.6rem"}
                />
              </div>
            </div>
            <div className="flex mt-3 gap-2">
              {/* 商品图片 */}
              <div>
                <Image
                  src={goodsItem.picUrl}
                  alt=""
                  width={50}
                  height={50}
                  className="w-25 h-25"
                ></Image>
              </div>
              {/* 商品相关信息 */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* 商品名称 */}
                  <p className="max-w-80 truncate text-gray-400">
                    {goodsItem.goodsName}
                  </p>
                  {/* 商品规格列表 */}
                  <div className="flex items-center gap-2">
                    {goodsItem.specifications?.map((item, index) => {
                      return (
                        <div
                          className="border-[1px] border-gray-300 text-sm text-gray-400 rounded-lg p-1"
                          key={index}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  {/* 商品价格 */}
                  <p className="text-lg font-bold">
                    ￥<span className="text-xl">{goodsItem.price}</span>
                  </p>
                  {/* 商品数量 */}
                  <p className="text-gray-400">x{goodsItem.number}</p>
                </div>
              </div>
            </div>
            {/* 操作按钮 */}
            <div className="flex justify-end gap-2 mt-3">
              {props.orderStatus === 1 && (
                <div>
                  <Button className="bg-[#ffede1] text-orange-500">
                    继续付款
                  </Button>
                </div>
              )}
              {props.orderStatus === 5 && (
                <div>
                  <Button className="bg-[#ffede1] text-orange-500">
                    再来一单
                  </Button>
                </div>
              )}
              {props.orderStatus === 2 && (
                <div>
                  <Button className="bg-[#ffede1] text-orange-500">
                    催发货
                  </Button>
                </div>
              )}
              {props.orderStatus === 3 && (
                <div>
                  <Button className="bg-[#ffede1] text-orange-500">
                    确认收货
                  </Button>
                </div>
              )}
              {props.orderStatus === 4 && (
                <div>
                  <Button className="bg-[#ffede1] text-orange-500">评价</Button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default OrderGoodsContent;
