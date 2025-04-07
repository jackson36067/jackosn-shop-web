"use client";

import { goodsAttributeItem } from "@/types/goodsAttribute";

const GoodsAttributeContent = (props: {
  goodsAttributeList: goodsAttributeItem[];
}) => {
  return (
    <div className="px-3 pb-3">
      {props.goodsAttributeList?.map((item) => {
        return (
          <div
            key={item.id}
            className="flex items-center py-3 border-b-[1px] border-b-gray-400"
          >
            <p className="w-35">{item.attribute}</p>
            <p className="text-gray-400">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
};
export default GoodsAttributeContent;
