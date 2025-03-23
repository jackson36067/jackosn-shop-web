"use client";

import { FollowStoreItem } from "@/types/store";
import Image from "next/image";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Checkbox } from "../ui/checkbox";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

const FollowStoreContent = forwardRef(
  (
    props: {
      followStoreItems: FollowStoreItem[];
      operateStatus: boolean; // 控制操作按钮是否显示
      changeSelected: (seletecdStoreIdList: number[]) => void;
      cancelFollowStore: (id: number) => void;
    },
    ref
  ) => {
    // 当点击全选按钮时,更改被选择的店铺
    useImperativeHandle(ref, () => ({
      triggerFunction(idList: number[]) {
        seletecdStoreIdListRef.current = idList;
        setSeletecdStoreIdList(idList);
      },
    }));
    // 定义被选中的店铺
    const seletecdStoreIdListRef = useRef<number[]>([]);
    // 用户页面渲染
    const [seletecdStoreIdList, setSeletecdStoreIdList] = useState<number[]>(
      []
    );
    // 是否打开更多操作弹窗
    const [open, setOpne] = useState<boolean>(false);

    // 当更新选中店铺时,更新组件被选中店铺信息以及更新父组件被选中店铺信息
    const handleCheckStore = (id: number, isChecked: boolean) => {
      // 判断原先是选中还是没有选中
      if (!isChecked) {
        // 原先就选中了,那么移除选中店铺
        seletecdStoreIdListRef.current = seletecdStoreIdListRef.current.filter(
          (item) => item !== id
        );
        setSeletecdStoreIdList(
          seletecdStoreIdList.filter((item) => item !== id)
        );
      } else {
        // 原先没有选中,那么就选中店铺
        if (!seletecdStoreIdListRef.current.includes(id)) {
          seletecdStoreIdListRef.current = [
            ...seletecdStoreIdListRef.current,
            id,
          ];
          setSeletecdStoreIdList([...seletecdStoreIdList, id]);
        }
      }
      // 向父组件传递选中店铺信息
      props.changeSelected(seletecdStoreIdListRef.current);
    };

    // 点击弹窗取消关注店铺
    const handelCancelFollowStore = (id: number) => {
      // 执行父组件的函数,将店铺id传递给父组件
      props.cancelFollowStore(id);
      // 关闭弹窗
      setOpne(false);
    };
    return (
      <div className="mt-20 px-3">
        <div>
          {props.followStoreItems.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-center gap-2 mt-5 first:mt-0"
              >
                <div
                  className="flex-11/12 flex items-center"
                  onClick={() =>
                    (window.location.href = `/store?id=${item.storeId}`)
                  }
                >
                  {props.operateStatus && (
                    <div className="flex-1/9">
                      <Checkbox
                        checked={seletecdStoreIdList.includes(item.id)}
                        onCheckedChange={(checked) =>
                          handleCheckStore(item.id, checked === true)
                        }
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        className="rounded-full w-5 h-5 border-[1px] border-gray-500"
                      />
                    </div>
                  )}
                  <div className="flex flex-8/9 items-center gap-3">
                    <Image
                      src={item.avatar}
                      width={50}
                      height={50}
                      className="w-13 h-13 rounded-lg"
                      alt=""
                    />
                    <div className="flex flex-col justify-around gap-1">
                      <p className="font-bold text-[1rem]">{item.name}</p>
                      <p className="text-[1rem]">{item.followTime}关注</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button
                      className="bg-[#ffece5]/90 text-orange-600"
                      onClick={() =>
                        (window.location.href = `/store?id=${item.id}`)
                      }
                    >
                      进店
                    </Button>
                  </div>
                </div>
                {!props.operateStatus && (
                  <div className="flex-1/12 flex justify-center">
                    <Drawer
                      direction="bottom"
                      open={open}
                      onOpenChange={(open) => setOpne(open)}
                    >
                      <DrawerTrigger>
                        <Icon icon={"icon-park-outline:more"} fontSize={30} />
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle className="text-center">
                            关注操作
                          </DrawerTitle>
                          <div
                            className="flex gap-3 items-center p-4 border-b-[0.02rem] border-gray-400"
                            onClick={() => {
                              handelCancelFollowStore(item.id);
                            }}
                          >
                            <Icon
                              icon={"icon-park-outline:love-and-help"}
                              fontSize={"1rem"}
                            />
                            <p className="text-[1rem]">取消关注</p>
                          </div>
                        </DrawerHeader>
                        <DrawerFooter>
                          <DrawerClose asChild>
                            <Button className="mt-60 bg-[#f4f4f5] text-gray-950">
                              取消
                            </Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

FollowStoreContent.displayName = "FollowStoreContent";

export default FollowStoreContent;
