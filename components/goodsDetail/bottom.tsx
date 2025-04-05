"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

const GoodsDetailBottomBar = (props: {
  storeId: number;
  isCollect: boolean;
  handleCollect: () => void;
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-99 flex items-center justify-between bg-white p-3 border-t-[1px] border-t-gray-400">
      <div className="flex items-center gap-4">
        <div
          className="flex flex-col gap-1 items-center"
          onClick={() => (window.location.href = `/store?id=${props.storeId}`)}
        >
          <Icon icon={"clarity:store-line"} fontSize={"1.4rem"} />
          <p className="text-[0.8rem] text-gray-500">店铺</p>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <Icon icon={"ant-design:message-outlined"} fontSize={"1.4rem"} />
          <p className="text-[0.8rem] text-gray-500">客服</p>
        </div>
        <div
          className="flex flex-col gap-1 items-center"
          onClick={() => {
            props.handleCollect();
          }}
        >
          <Icon
            icon={!props.isCollect ? "hugeicons:star" : "mingcute:star-fill"}
            fontSize={"1.4rem"}
            color={props.isCollect ? "red" : undefined}
          />
          <p className="text-[0.8rem] text-gray-500">收藏</p>
        </div>
      </div>
      <div className="w-[70%] flex items-center text-white">
        <div className="flex items-center justify-around w-[50%] h-13 rounded-xl rounded-r-none bg-[#f5c73d]">
          加入购物车
        </div>
        <div className="flex items-center justify-around w-[50%] h-13 rounded-xl rounded-l-none bg-[#d66c5e]">
          立即购买
        </div>
      </div>
    </div>
  );
};
export default GoodsDetailBottomBar;
