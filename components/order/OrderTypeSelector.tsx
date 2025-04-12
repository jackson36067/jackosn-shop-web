"use client";

import { cn } from "@/lib/utils";

const typeItems = [
  { title: "全部", value: 0 },
  { title: "待付款", value: 1 },
  { title: "待发货", value: 2 },
  { title: "待收货", value: 3 },
  { title: "待评价", value: 4 },
];
const OrderTypeSelector = (props: {
  type: number;
  changeOrderType: (type: number) => void;
}) => {
  return (
    <div className="fixed top-14 left-0 flex justify-between items-center w-full p-3 bg-white">
      {typeItems.map((item, index) => {
        return (
          <div
            key={index}
            className={cn(
              "text-gray-400 font-[600]",
              props.type === item.value && "font-bold text-black text-lg"
            )}
            onClick={() => props.changeOrderType(item.value)}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
};
export default OrderTypeSelector;
