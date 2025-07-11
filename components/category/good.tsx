import { GoodsMessage } from "@/types/goods";
import { useRouter } from "next/navigation";

const CategoryGoods = (props: { goodItems: GoodsMessage[] }) => {
  const router = useRouter();
  return (
    <div>
      {props.goodItems.map((item) => {
        return (
          <div
            className="flex w-full mt-3 first:mt-3 p-2 bg-[#fff]"
            key={item.id}
            onClick={() => router.push(`/goodsDetail?id=${item.id}`)}
          >
            <div>
              <img
                src={item.picUrl || "/default-image.png"}
                alt=""
                className="w-30 h-40"
              />
            </div>
            <div className="flex flex-col justify-between flex-1">
              {/* 商品名称以及简称 */}
              <div>
                <p className="text-xl text-[#5c5a5d]">{item.name}</p>
                <p className="text-sm text-[#77787d]">{item.brief}</p>
              </div>
              {/* 商品价格 */}
              <div className="flex items-end gap-1">
                <div className="text-[#d76e56] text-xl">
                  ￥{item.counterPrice}
                </div>
                <div className="line-through text-[#77787d] text-sm">
                  ￥{item.retailPrice}
                </div>
              </div>
              {/* 购物车 */}
              <div className="flex justify-between items-center">
                <div className="text-xs text-[#77787d]">
                  评论2000+条 70%好评
                </div>
                <div className="p-2 bg-[#d76e56] text-white rounded-sm">
                  加入购物车
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CategoryGoods;
