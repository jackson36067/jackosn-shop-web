import { cn } from "@/lib/utils";
import { GoodsMessage } from "@/types/goods";
import Image from "next/image";

const HomeCategoryGoods = (props: {
  className?: string;
  goodItems: GoodsMessage[];
}) => {
  return (
    <div className={cn("flex flex-wrap bg-[#fff] w-full", props.className)}>
      {!props.goodItems.length ? (
        <div className="w-full text-center text-sm py-4">没有更多商品了</div>
      ) : (
        props.goodItems.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col gap-2 w-[50%] mt-3"
              onClick={() =>
                (window.location.href = `/goodsDetail?id=${item.id}`)
              }
            >
              <div>
                <Image
                  src={item.picUrl || "/upload/notImage.png"}
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
                  ￥{item.retailPrice}
                </div>
                <div className="line-through text-[#77787d] text-sm">
                  ￥{item.counterPrice}
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
