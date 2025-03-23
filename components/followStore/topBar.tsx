"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef } from "react";

const FollowStoreTopBar = (props: {
  followStoreLength: number;
  changeOperateStatus: (isShowOperate: boolean) => void;
  handleSelectFollowStoreName: (name: string) => void;
}) => {
  // 是否展示出操作按钮(单选框,底部操作栏)
  const showOperateButtonRef = useRef<boolean>(false);
  // input值
  const nameRef = useRef<string>("");

  // 当输入值时,修改存储的input值
  const handleStoreNameChange = (name: string) => {
    nameRef.current = name;
    props.handleSelectFollowStoreName(name);
  };
  return (
    <div className="fixed top-0 left-0 w-full py-5 px-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon
            icon={"ep:back"}
            fontSize={"1rem"}
            onClick={() => window.history.back()}
          />
          <p className="font-bold text-xl">
            关注店铺
            <span className="text-[1rem]">({props.followStoreLength})</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
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
              placeholder="店铺名称"
              className="w-full py-[0.5rem] pl-8 text-gray-500 border rounded-md outline-none bg-gray-50 text-[0.8rem]"
            />
          </div>
          {/* 点击管理执行函数将是否展示操作按钮值传递给父组件 */}
          {props.followStoreLength > 0 && (
            <p
              className="text-[1rem]"
              onClick={() => {
                showOperateButtonRef.current = !showOperateButtonRef.current;
                props.changeOperateStatus(showOperateButtonRef.current);
              }}
            >
              管理
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default FollowStoreTopBar;
