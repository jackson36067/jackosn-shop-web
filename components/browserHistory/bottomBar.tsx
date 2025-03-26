"use client";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const BrowseHistoryBottomBar = (props: {
  operateState: boolean;
  allSelectedStoreLength: number;
  type: number;
  isAllSelect: boolean;
  handelCheckAllBrowse: (isCheck: boolean) => void;
  handleDeleteBrowseHistory: () => void;
}) => {
  const handleCheckdChange = (isCheck: boolean) => {
    props.handelCheckAllBrowse(isCheck);
  };
  const handleDeleteBrowseHistory = () => {
    props.handleDeleteBrowseHistory();
  };
  return (
    <div>
      {props.operateState && (
        <div className="fixed bottom-0 left-0 w-[100%] p-3 bg-white">
          {props.allSelectedStoreLength > 0 && (
            <div className="text-gray-500 text-[1rem]">
              已选中
              <span className="text-orange-500">
                {props.allSelectedStoreLength}
              </span>
              {props.type === 0
                ? "件宝贝"
                : props.type === 1
                ? "个店铺"
                : "个图文"}
            </div>
          )}
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Checkbox
                  checked={props.isAllSelect}
                  onCheckedChange={(checked) =>
                    handleCheckdChange(checked === true)
                  }
                  className="rounded-full w-5 h-5 border-[1px] border-gray-500"
                />
                <span className="text-[0.8rem]">全选</span>
              </div>
              <div className="flex gap-2 items-center">
                <Button className="bg-[#f2f6f9] text-[#161f28]">分享</Button>
                <Button
                  className="bg-orange-600 text-white"
                  onClick={() => handleDeleteBrowseHistory()}
                >
                  删除
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseHistoryBottomBar;
