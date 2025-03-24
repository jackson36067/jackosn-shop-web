"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const collectTimeTtems = [
  { title: "7天内", value: 7 },
  { title: "30天内", value: 30 },
  { title: "90天内", value: 90 },
  { title: "半年前", value: 182 },
  { title: "一年前", value: 365 },
];

const goodsSortItems = [
  { title: "最近收藏在前", value: 1 }, // 降序
  { title: "最早收藏在前", value: 0 }, // 升序
];

const CollectGoodsTopBar = (props: {
  collectGoodsLength: number;
  changeOperateState: (operateState: boolean) => void;
  getCollectWithParams: (
    name: string,
    sortType: number | undefined,
    collectTime: number | undefined
  ) => void;
}) => {
  // 控制操作按钮是否展示
  const [operateButton, setOperateButton] = useState<boolean>(false);
  // 商品收藏时间范围
  const [collectTime, setCollectTime] = useState<number | null>(null);
  // 商品排序方式
  const [goodsSortType, setGoodsSortType] = useState<number | null>(null);
  // 商品名称
  const nameRef = useRef<string>("");
  // 更改输入框内容时触发函数
  const handleStoreNameChange = (newName: string) => {
    nameRef.current = newName;
    props.getCollectWithParams(
      newName,
      goodsSortType ?? undefined,
      collectTime ?? undefined
    );
  };
  return (
    <div>
      <div className="fixed top-0 left-0 w-full py-5 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon
              icon={"ep:back"}
              fontSize={"1rem"}
              onClick={() => window.history.back()}
            />
            <p className="font-bold text-xl">
              我的收藏
              <span className="text-[1rem]">({props.collectGoodsLength})</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-400 left-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                value={nameRef.current}
                onInput={(e) =>
                  handleStoreNameChange((e.target as HTMLInputElement).value)
                }
                type="text"
                placeholder="搜索宝贝名称"
                className="w-full py-[0.5rem] pl-8 text-gray-500 border rounded-md outline-none bg-gray-50 text-[0.8rem]"
              />
            </div>
            <p
              className="text-[1rem]"
              onClick={() => {
                setOperateButton(!operateButton);
                props.changeOperateState(!operateButton);
              }}
            >
              {operateButton ? "完成" : "管理"}
            </p>
            <Drawer>
              <DrawerTrigger>
                <Icon icon={"carbon:filter-edit"} fontSize={"1rem"} />
              </DrawerTrigger>
              <DrawerContent>
                <div>
                  <DrawerHeader>
                    <DrawerTitle className="text-center text-2xl font-[600]">
                      全部筛选
                    </DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                  </DrawerHeader>
                  {/* 主体内容*/}
                  <div className="px-4 text-[#15192d] font-[600]">
                    <div>
                      <p className="text-xl">收藏时间</p>
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        {collectTimeTtems.map((item, index) => {
                          return (
                            <Button
                              className={cn(
                                "bg-[#f2f6f9] text-[#161f28]",
                                collectTime === item.value &&
                                  "bg-[#ffece5]/90 text-orange-600"
                              )}
                              key={index}
                              onClick={() => {
                                setCollectTime(item.value);
                              }}
                            >
                              {item.title}
                            </Button>
                          );
                        })}
                      </div>
                      <div className="mt-10">
                        <p className="text-xl">宝贝排序</p>
                        <div className="grid grid-cols-3 gap-4 mt-3">
                          {" "}
                          {goodsSortItems.map((item, index) => {
                            return (
                              <Button
                                key={index}
                                className={cn(
                                  "bg-[#f2f6f9] text-[#161f28]",
                                  goodsSortType === item.value &&
                                    "bg-[#ffece5]/90 text-orange-600"
                                )}
                                onClick={() => {
                                  setGoodsSortType(item.value);
                                }}
                              >
                                {item.title}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <DrawerFooter className="grid grid-cols-2 gap-4 mt-20">
                    <Button
                      className="w-full bg-[#f2f6f9] text-[#161f28]"
                      onClick={() => {
                        setCollectTime(null);
                        setGoodsSortType(null);
                      }}
                    >
                      重置
                    </Button>
                    <DrawerClose asChild className="w-full">
                      <Button
                        className="w-full bg-orange-600 text-white"
                        onClick={() => {
                          // 通过函数将参数传递给父组件
                          props.getCollectWithParams(
                            nameRef.current,
                            goodsSortType ?? undefined,
                            collectTime ?? undefined
                          );
                        }}
                      >
                        确定
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectGoodsTopBar;
