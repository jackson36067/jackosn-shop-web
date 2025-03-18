"use client";

import { useRef } from "react";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

type Emit = {
  // 通过该函数向父组件传递排序方式和排序方式
  handleSelectedSortTypeAndOrderType: (
    sortType: string,
    orderType: number
  ) => void;
};

export const SearchSelectBar = ({
  handleSelectedSortTypeAndOrderType,
}: Emit) => {
  // 排序方式
  // default: 综合排序
  // sales: 销量排序
  // price: 价格排序
  const sortType = useRef<"default" | "sales" | "price">("default");
  // 0.升序 1.降序
  const orderType = useRef<0 | 1>(0);
  const handleSortType = (seleteSortType: "default" | "sales" | "price") => {
    // 如果点击的排序方式没有变化，改变排序方式
    if (seleteSortType === sortType.current) {
      orderType.current = orderType.current === 0 ? 1 : 0;
    } else {
      sortType.current = seleteSortType;
      // 默认排序方式为升序
      orderType.current = 0;
    }
    // 通过回调函数向父组件传递排序方式和排序方式
    handleSelectedSortTypeAndOrderType(sortType.current, orderType.current);
  };
  return (
    <div className="flex justify-between border-b p-2 text-gray-600 bg-white text-sm">
      {/* 综合 */}
      <Button
        variant="ghost"
        className={`flex items-center text-gray-600 hover:text-black ${
          sortType.current === "default" ? "font-bold text-black" : ""
        }`}
        onClick={() => handleSortType("default")}
      >
        综合
        {sortType.current === "default" &&
          (orderType.current === 0 ? (
            <ChevronUp className="w-4 h-4 ml-1" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-1" />
          ))}
      </Button>
      {/* 销量 */}
      <Button
        variant="ghost"
        className={`flex items-center text-gray-600 hover:text-black ${
          sortType.current === "sales" ? "font-bold text-black" : ""
        }`}
        onClick={() => handleSortType("sales")}
      >
        销量
        {sortType.current === "sales" &&
          (orderType.current === 0 ? (
            <ChevronUp className="w-4 h-4 ml-1" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-1" />
          ))}
      </Button>

      {/* 价格排序 */}
      <Button
        variant="ghost"
        className={`flex items-center text-gray-600 hover:text-black ${
          sortType.current === "price" ? "font-bold text-black" : ""
        }`}
        onClick={() => handleSortType("price")}
      >
        价格
        {sortType.current === "price" &&
          (orderType.current === 0 ? (
            <ChevronUp className="w-4 h-4 ml-1" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-1" />
          ))}
      </Button>

      {/* 筛选 */}
      <Button variant="ghost" className="text-gray-600 hover:text-black">
        筛选
      </Button>
    </div>
  );
};
