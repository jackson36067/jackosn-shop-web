import { GoodsMessage } from "@/types/goods";
import Image from "next/image";

const HomeCategoryGoods = (props: { goodItems: GoodsMessage[] }) => {
  return (
    <div className="flex flex-wrap bg-[#fff] w-full">
      {!props.goodItems.length ? (
        <div className="w-full text-center text-sm py-4">没有更多商品了</div>
      ) : (
        props.goodItems.map((item) => {
          return (
            <div
              key={item.id}
              className="w-[50%]"
              onClick={() =>
                (window.location.href = `/goodsDetail?id=${item.id}`)
              }
            >
              <div>
                <Image
                  src={item.picUrl}
                  width={"50"}
                  height={"50"}
                  alt=""
                  className="w-50 h-50"
                />
              </div>
              <p className="truncate text-center">{item.name}</p>
              {/* 商品价格 */}
              <div className="flex justify-center items-end gap-1">
                <div className="text-[#d76e56] text-xl">
                  ￥{item.counterPrice}
                </div>
                <div className="line-through text-[#77787d] text-sm">
                  ￥{item.retailPrice}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
export default HomeCategoryGoods;
