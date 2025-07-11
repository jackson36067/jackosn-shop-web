"use client";

import {
  browseHistoryItem,
  goodsHistory,
  storeHistory,
} from "@/types/browseHistory";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const BrowseHistoryContent = forwardRef(
  (
    props: {
      type: number; // 浏览记录信息类型
      operateStatus: boolean; // 操作按钮状态
      browseHistoryItems: browseHistoryItem[]; // 浏览记录信息列表
      handleSelectBrowse: (browseIdList: number[]) => void; // 更改被选中浏览记录信息
    },
    ref
  ) => {
    // 通过ref提供给父组件该函数,便于与父组件同步被选中的浏览记录信息
    useImperativeHandle(ref, () => ({
      triggerFunction(idList: number[]) {
        allSelectBrowseIdListRef.current = idList;
        setAllSelectBrowseIdList(idList);
      },
    }));
    // 被选中浏览记录信息id列表
    const [allSelectBrowseIdList, setAllSelectBrowseIdList] = useState<
      number[]
    >([]);

    // 用户向父组件传递被选中的浏览记录信息id列表
    const allSelectBrowseIdListRef = useRef<number[]>([]);

    // 点击选中或者取消选中某个浏览记录或某个日期的所有浏览记录
    const handelBrowseSelectCheckChange = (
      checked: boolean,
      selectBrowseIdList: number[]
    ) => {
      // 判断是否选中
      if (!checked) {
        setAllSelectBrowseIdList(
          allSelectBrowseIdList.filter(
            (item) => !selectBrowseIdList.includes(item)
          )
        );
        allSelectBrowseIdListRef.current =
          allSelectBrowseIdListRef.current.filter(
            (item) => !selectBrowseIdList.includes(item)
          );
      } else {
        setAllSelectBrowseIdList([
          ...allSelectBrowseIdList,
          ...selectBrowseIdList,
        ]);
        allSelectBrowseIdListRef.current = [
          ...allSelectBrowseIdListRef.current,
          ...selectBrowseIdList,
        ];
      }
      // 调用父组件的函数同步被选中浏览记录信息
      props.handleSelectBrowse(allSelectBrowseIdListRef.current);
    };

    const router = useRouter();

    return (
      <div className={cn("px-3 mt-50 pb-5", props.operateStatus && "pb-28")}>
        <div>
          {props.type === 0 && (
            <div>
              {props.browseHistoryItems.map((item, index) => {
                return (
                  <div key={index} className="mt-8 first:mt-0">
                    <div className="flex gap-2 items-center">
                      {props.operateStatus && (
                        <Checkbox
                          className="rounded-full w-5 h-5 border-[1px] border-gray-500"
                          checked={(item.data as goodsHistory[]).every((item) =>
                            allSelectBrowseIdList.includes(item.browseId)
                          )}
                          onCheckedChange={(checked) =>
                            handelBrowseSelectCheckChange(
                              checked === true,
                              (item.data as goodsHistory[]).map(
                                (item) => item.browseId
                              )
                            )
                          }
                        />
                      )}
                      <div className="font-[600]">{item.browseTime}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {(item.data as goodsHistory[])?.map(
                        (goodsItem: goodsHistory) => {
                          return (
                            <div key={goodsItem.browseId} className="">
                              <div className="relative w-32 h-30">
                                <Image
                                  // 给一个初始值防止报错
                                  src={
                                    goodsItem.picUrl || "/image/icon_me@3x.png"
                                  }
                                  alt=""
                                  width={50}
                                  height={50}
                                  className="w-full h-full"
                                />
                                {props.operateStatus && (
                                  <Checkbox
                                    className="absolute right-1 top-1 rounded-full w-5 h-5 border-[1px] border-gray-500"
                                    checked={allSelectBrowseIdList.includes(
                                      goodsItem.browseId
                                    )}
                                    onCheckedChange={(checked) =>
                                      handelBrowseSelectCheckChange(
                                        checked === true,
                                        [goodsItem.browseId]
                                      )
                                    }
                                  />
                                )}
                              </div>
                              <p className="ml-1 mt-2 text-orange-600 font-[600]">
                                ￥
                                <span className="text-[1.5rem]">
                                  {goodsItem.price}
                                </span>
                              </p>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {props.type === 1 && (
            <div>
              {props.browseHistoryItems.map((item, index) => {
                return (
                  <div key={index} className="mt-8 first:mt-0">
                    <div className="flex gap-2 items-center">
                      {props.operateStatus && (
                        <Checkbox
                          className="rounded-full w-5 h-5 border-[1px] border-gray-500"
                          checked={(item.data as storeHistory[]).every((item) =>
                            allSelectBrowseIdList.includes(item.browseId)
                          )}
                          onCheckedChange={(checked) =>
                            handelBrowseSelectCheckChange(
                              checked === true,
                              (item.data as storeHistory[]).map(
                                (item) => item.browseId
                              )
                            )
                          }
                        />
                      )}
                      <div className="font-[600]">{item.browseTime}</div>
                    </div>
                    <div className="mt-4">
                      <div className="flex flex-col gap-3">
                        {(item.data as storeHistory[]).map((storeItem) => {
                          return (
                            <div
                              key={storeItem.browseId}
                              className="flex justify-between gap-5"
                            >
                              <div>
                                <Avatar>
                                  <AvatarImage
                                    src={storeItem.avatar}
                                    alt="@shadcn"
                                  />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="flex-1 flex flex-col gap-3">
                                <div
                                  className="flex-1 flex justify-between"
                                  onClick={() =>
                                    router.push(`/store?id=${storeItem.id}`)
                                  }
                                >
                                  <div className="flex flex-col gap-1">
                                    <p className="font-[600] text-[1.2rem]">
                                      {storeItem.storeName}
                                    </p>
                                    <p className="text-[0.8rem] text-gray-400">
                                      关注{storeItem.followNumber}人+
                                    </p>
                                  </div>
                                  <div>
                                    <Button className="bg-orange-600 text-white">
                                      进店
                                    </Button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                  {storeItem.goodsHistoryVOList?.map(
                                    (goodsItem, index) => {
                                      return (
                                        <div key={index} className="relative">
                                          <div className="w-26 h-30">
                                            <Image
                                              src={goodsItem.picUrl}
                                              alt=""
                                              width={50}
                                              height={50}
                                              className="w-full h-full"
                                            />
                                          </div>
                                          <p className="absolute bottom-0 left-1 ml-1 mt-2 bg-black rounded-sm text-white font-[600] text-[0.9rem]">
                                            ￥
                                            <span className="text-[1rem]">
                                              {goodsItem.price}
                                            </span>
                                          </p>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
);
BrowseHistoryContent.displayName = "BrowseHistoryContent";

export default BrowseHistoryContent;
