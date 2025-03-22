"use client";

import { StoreInfo } from "@/types/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRef } from "react";

const StoreTopBar = (props: {
  storeInfo: StoreInfo;
  handleSelectedGoodsName: (name: string) => void;
  handleFollowStore: (id: number, isFollow: boolean) => void;
}) => {
  const nameRef = useRef<string>("");
  // 当input值发生改变时触发
  const handleChangeInputValue = (name: string) => {
    nameRef.current = name;
    props.handleSelectedGoodsName(name);
  };
  // 处理点击关注事件
  const handelFollowStore = (id: number, isFollow: boolean) => {
    props.handleFollowStore(id, isFollow);
  };
  return (
    <div className="bg-[#fff0f5] py-6 px-3">
      <div>
        <div className="flex items-center justify-between px-2">
          <Icon
            icon={"ep:back"}
            fontSize={26}
            onClick={() => window.history.back()}
          />
          <div className="relative bg-[#fff0f5]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-400 left-2"
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
                handleChangeInputValue((e.target as HTMLInputElement).value)
              }
              type="text"
              placeholder="搜索商品"
              className="py-1 pl-8 text-black border border-[#ebdae0] rounded-md outline-none text-[12px]"
            />
          </div>
        </div>
        <div className="flex items-center justify-between px-2 mt-4">
          <div className="flex items-center gap-3">
            <div>
              <Image
                src={props.storeInfo.avatar}
                alt=""
                width={50}
                height={50}
                className="rounded-lg w-15 h-15"
              />
            </div>
            <div className="flex flex-col justify-around gap-1">
              <div className="text-xl font-bold">{props.storeInfo.name}</div>
              <div className="text-[12px] text-gray-500">
                {props.storeInfo.fansNumber}粉丝
              </div>
            </div>
          </div>
          <div>
            <Button
              className={
                props.storeInfo.isFollow
                  ? "bg-[#d6cace] text-[16px] text-white font-bold"
                  : "bg-orange-600 text-[16px] text-white font-bold"
              }
              onClick={() =>
                handelFollowStore(props.storeInfo.id, props.storeInfo.isFollow)
              }
            >
              {props.storeInfo.isFollow ? "已关注" : "+ 关注"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StoreTopBar;
