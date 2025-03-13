import { GetHotOrNewGoodsAPI } from "@/apis/goods";
import { GoodsMessage } from "@/types/goods";
import { useEffect, useRef, useState } from "react";

const HomeCategoryGoods = (props: { type: number; isAll: boolean }) => {
  const [goodItems, setGoodItems] = useState<GoodsMessage[]>([]);
  const hasFetched = useRef(false); // 追踪是否已经发送请求
  const getHomeGoodsList = async () => {
    const res = await GetHotOrNewGoodsAPI(props.type, props.isAll);
    setGoodItems(res.data);
  };
  useEffect(() => {
    if (hasFetched.current) return; // 如果已经请求过，则不再执行
    hasFetched.current = true;
    getHomeGoodsList();
  }, []);
  return (
    <div className="flex flex-wrap">
      {goodItems.map((item) => {
        return (
          <div key={item.id} className="w-[50%]">
            <div>
              <img src={item.picUrl} width={""} />
            </div>
            <p>{item.name}</p>
            {/* 商品价格 */}
            <div className="flex items-end gap-1">
              <div className="text-[#d76e56] text-xl">
                ￥{item.counterPrice}
              </div>
              <div className="line-through text-[#77787d] text-sm">
                ￥{item.retailPrice}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default HomeCategoryGoods;
