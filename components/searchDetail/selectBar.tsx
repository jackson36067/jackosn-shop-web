"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Switch } from "../ui/switch";
import { usePathname } from "next/navigation";

const SearchSelectBar = forwardRef(
  (
    props: {
      handleSelectedSortTypeAndOrderType: (
        sortType: string,
        orderType: number,
        goodsType: number
      ) => void;
    },
    ref
  ) => {
    // 当点击全选按钮时,更改被选择的店铺
    useImperativeHandle(ref, () => ({
      triggerFunction(newType: number) {
        type.current = newType;
      },
    }));

    // 获取路径
    const pathname = usePathname();
    // 排序方式
    // default: 综合排序
    // sales: 销量排序
    // price: 价格排序
    const sortType = useRef<"default" | "sales" | "price">("default");
    // 0.升序 1.降序
    const orderType = useRef<0 | 1>(0);
    // 控制筛选抽屉是否打开
    const [open, setOpen] = useState(false);
    // 选择商品类型 0.新品 1.热销 2.全部
    const type = useRef(2);
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
      props.handleSelectedSortTypeAndOrderType(
        sortType.current,
        orderType.current,
        type.current
      );
    };

    // 改变商品类型
    const handleChangeGoodsType = (goodsType: number) => {
      // 如果点击的商品类型没有变化，那么就是取消选择,默认获取全部商品
      if (goodsType === type.current) {
        type.current = 2;
      } else {
        // 改变商品类型
        type.current = goodsType;
      }
      // 通过回调函数向父组件传递排序方式和排序方式
      props.handleSelectedSortTypeAndOrderType(
        sortType.current,
        orderType.current,
        type.current
      );
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
        {pathname !== "/store" && (
          <Drawer direction="top" open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-black"
                onClick={() => setOpen(true)}
              >
                筛选
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerTitle></DrawerTitle>
              <DrawerDescription></DrawerDescription>
              <div className="flex justify-between items-center py-4 px-3">
                <div>新品</div>
                <Switch
                  id="airplane-mode"
                  checked={type.current === 0}
                  onCheckedChange={() => handleChangeGoodsType(0)}
                />
              </div>
              <div className="flex justify-between items-center py-4 px-3">
                <div>热品</div>
                <Switch
                  id="airplane-mode"
                  checked={type.current === 1}
                  onCheckedChange={() => handleChangeGoodsType(1)}
                />
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    );
  }
);
SearchSelectBar.displayName = "SearchSelectBar";
export default SearchSelectBar;
