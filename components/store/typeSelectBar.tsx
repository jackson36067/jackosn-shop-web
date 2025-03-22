"use client";

import { useRef, useState } from "react";

const typeBarItems = [
  {
    type: 2,
    name: "宝贝",
  },
  {
    type: 0,
    name: "新品",
  },
  {
    type: 1,
    name: "热销",
  },
];
const StoreGoodsTypeBar = (props: {
  handleChangeStoreGoodsType: (type: number) => void;
}) => {
  // 用于做动画效果
  const [type, setType] = useState<number>(2);
  // 用于向父组件传递值
  const typeRef = useRef<number>(2);
  const handleChangeGoodsType = (type: number) => {
    setType(type);
    typeRef.current = type;
    props.handleChangeStoreGoodsType(typeRef.current);
  };
  return (
    <div className="p-3">
      <div className="flex justify-center items-center gap-8 text-[18px] text-gray-500">
        {typeBarItems.map((item, index) => {
          return (
            <div
              key={index}
              className={
                item.type === type
                  ? "text-orange-600 border-b-[2px] border-orange-600"
                  : ""
              }
              onClick={() => handleChangeGoodsType(item.type)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default StoreGoodsTypeBar;
