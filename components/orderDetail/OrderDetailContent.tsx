"use client";

import { orderDetailData } from "@/types/order";
import GoodsConsigneeInfo from "../common/goodsConsigneeInfo";
import OrderGoodsContent from "../order/OrderGoods";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Icon } from "@iconify/react/dist/iconify.js";
import { GoodsMessage } from "@/types/goods";
import HomeCategoryGoods from "../home/category/goods";

const OrderDetailContent = (props: {
  orderDetail: orderDetailData | null;
  recommendGoodsList: GoodsMessage[];
  loadingRecommend: boolean;
  changeRecommendGoodsList: () => void;
}) => {
  const ChangeRecommendGoods = () => {
    props.changeRecommendGoodsList();
  };
  return (
    <div className="mt-13">
      {/* 订单商品收货人信息 */}
      <div className="bg-white p-3">
        <GoodsConsigneeInfo
          consignee={props.orderDetail?.consignee}
          mobile={props.orderDetail?.mobile}
          address={props.orderDetail?.address}
        />
      </div>
      {/* 订单商品信息 */}
      <div className="mt-3 bg-white p-3">
        <OrderGoodsContent
          orderStatus={props.orderDetail?.orderStatus}
          goodsItems={props.orderDetail?.orderGoodsList}
        />
        {/* 付款后展示实际付款 */}
        {[2, 3, 4].includes(props.orderDetail?.orderStatus || 0) && (
          <div className="flex justify-between py-2">
            <div className="w-full">
              <Collapsible className="w-full">
                <CollapsibleTrigger className="border-none">
                  <div className="flex text-sm items-center">
                    <p>实付款</p>
                    <Icon
                      icon={"iconamoon:arrow-down-2-thin"}
                      fontSize={"1.3rem"}
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="w-full mt-2">
                  <div className="flex flex-col gap-3 w-full text-sm text-[#131313]">
                    <div className="flex justify-between items-center">
                      <p>商品价格</p>
                      <p className="font-bold">
                        ￥
                        <span className="text-[1rem]">
                          {props.orderDetail?.goodsPrice}
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>运费</p>
                      <p className="font-bold">
                        ￥
                        <span className="text-[1rem]">
                          {props.orderDetail?.freightPrice}
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>优惠</p>
                      <p className="font-bold">
                        ￥
                        <span className="text-[1rem]">
                          {props.orderDetail?.couponPrice}
                        </span>
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            <p className="text-[#131313] text-sm font-bold">
              ￥
              <span className="text-[1rem]">
                {props.orderDetail?.orderPrice}
              </span>
            </p>
          </div>
        )}
        <div className="flex justify-between items-center mt-3">
          <p>订单编号</p>
          <p className="text-gray-500">{props.orderDetail?.orderSn}</p>
        </div>
      </div>
      {/* 推荐商品列表 */}
      <div className="p-3 bg-white mt-3">
        {/* 推荐栏 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon icon={"material-symbols-light:recommend"} fontSize={"2rem"} />
            <p className="text-lg">搭配推荐</p>
          </div>
          <div
            className="flex items-center gap-1 text-gray-500"
            onClick={() => ChangeRecommendGoods()}
          >
            <p>换一换</p>
            <Icon icon={"hugeicons:exchange-01"} fontSize={"1.2rem"} />
          </div>
        </div>
        {/* 推荐内容 */}
        <div className="w-full">
          {!props.loadingRecommend ? (
            <div>
              <HomeCategoryGoods goodItems={props.recommendGoodsList} />
            </div>
          ) : (
            <div className="flex justify-center mt-5">
              <Image src={"/image/loading.svg"} width={50} height={50} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default OrderDetailContent;
