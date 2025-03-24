import { CollectGoodsItem } from "@/types/goods";
import Image from "next/image";
import { IconRight } from "react-day-picker";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const CollectGoodsContent = forwardRef(
  (
    props: {
      collectGoodsItems: CollectGoodsItem[];
      operateButtonState: boolean;
      changeSelectGoods: (idList: number[]) => void;
    },
    ref
  ) => {
    // 当点击全选按钮时,更改被选择的店铺
    useImperativeHandle(ref, () => ({
      triggerFunction(idList: number[]) {
        allSelectedGoodsRef.current = idList;
        setAllSelectedGoods(idList);
      },
    }));
    // 被选中商品
    const [allSelectedGoods, setAllSelectedGoods] = useState<number[]>([]);
    const allSelectedGoodsRef = useRef<number[]>([]);

    const handleSelectGoods = (checked: boolean, id: number) => {
      if (!checked) {
        setAllSelectedGoods(allSelectedGoods.filter((item) => item !== id));
        allSelectedGoodsRef.current = allSelectedGoods.filter(
          (item) => item !== id
        );
      } else {
        // 判断是否存在
        if (!allSelectedGoods.includes(id)) {
          setAllSelectedGoods([...allSelectedGoods, id]);
        }
        if (!allSelectedGoodsRef.current.includes(id)) {
          allSelectedGoodsRef.current = [...allSelectedGoodsRef.current, id];
        }
      }
      props.changeSelectGoods(allSelectedGoodsRef.current);
    };
    return (
      <div className="mt-20 px-2">
        <div>
          {props.collectGoodsItems.map((item) => {
            return (
              <div key={item.id} className="flex items-center gap-2 mt-3">
                {props.operateButtonState && (
                  <div className="flex-1/16">
                    <Checkbox
                      checked={allSelectedGoods.includes(item.id)}
                      className="rounded-full w-5 h-5 border-[1px] border-gray-500"
                      onCheckedChange={(checked) =>
                        handleSelectGoods(checked === true, item.id)
                      }
                    />
                  </div>
                )}
                <div className="flex-6/16 bg-white">
                  <Image
                    src={item.picUrl}
                    alt=""
                    width={50}
                    height={50}
                    className="w-full h-40"
                  />
                </div>
                <div className="flex-9/16">
                  <div className="flex flex-col">
                    {/* 商品名称 */}
                    <p className="text-[#1a1d2f] text-[1.2rem] font-[600] truncate whitespace-nowrap overflow-hidden">
                      {item.name}
                    </p>
                    {/* 商品收藏人数 */}
                    <p className="text-[#73828f] text-[1.1rem]">
                      {item.collectNumber}+人收藏
                    </p>
                    {/* 商品价格 */}
                    <p className="text-[#fc5901] text-[1.1rem] font-bold">
                      ￥<span className="text-[1.6rem]">{item.price}</span>
                    </p>
                    {/* 商品店铺名称 */}
                    <div
                      className="flex items-center gap-1 text-[#73828f] text-[1.1rem]"
                      onClick={() =>
                        (window.location.href = `/store?id=${item.storeId}`)
                      }
                    >
                      <p>{item.storeName}</p>
                      <IconRight className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="float-right">
                    <Button className="bg-[#f2f6f9] text-[#161f28] font-bold p-4">
                      降价提醒
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
CollectGoodsContent.displayName = "CollectGoodsContent";
export default CollectGoodsContent;
