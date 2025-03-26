"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { forwardRef, useImperativeHandle, useState } from "react";

const BrowseHistoryTopBar = forwardRef(
  (
    props: {
      browseLength: number;
      changeOperateStatus: (isShowOperateButton: boolean) => void;
    },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      triggerFunction() {
        setShowOperateButton(
          showOperateButton === true ? false : showOperateButton
        );
      },
    }));
    const [showOperateButton, setShowOperateButton] = useState<boolean>(false);
    return (
      <div>
        <div className="fixed top-0 left-0 w-full py-5 px-3 z-1 bg-[#f4f4f4]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon
                icon={"ep:back"}
                fontSize={"1rem"}
                onClick={() => window.history.back()}
              />
              <p className="font-bold text-xl">
                我的足迹
                <span className="text-[1rem]">({props.browseLength})</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon={"tdesign:search"} fontSize={"1rem"} />
              {/* 点击管理执行函数将是否展示操作按钮值传递给父组件 */}
              <p
                className="text-[1rem]"
                onClick={() => {
                  setShowOperateButton(!showOperateButton);
                  props.changeOperateStatus(!showOperateButton);
                }}
              >
                {showOperateButton ? "完成" : "管理"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
BrowseHistoryTopBar.displayName = "BrowseHistoryTopBar";
export default BrowseHistoryTopBar;
