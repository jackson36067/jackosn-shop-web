"use client";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const FollowStoreBottomBar = (props: {
  isAllSelect: boolean;
  changeAllSelect: (isAllSelect: boolean) => void;
  allSelectedStoreLength: number;
  cancelFollowStore: () => void;
}) => {
  const handleAllCheckStore = (isAllSelect: boolean) => {
    props.changeAllSelect(isAllSelect);
  };
  // 点击执行取消关注店铺,执行父组件中的函数
  const handleCancelFollowStore = () => {
    props.cancelFollowStore();
  };
  return (
    <div className="fixed bottom-[1rem] left-0 w-[100%] px-3">
      <div className="text-gray-500 text-[1rem]">
        已选中
        <span className="text-orange-500">{props.allSelectedStoreLength}</span>
        个商家
      </div>
      <div>
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-1"
            onClick={() => handleAllCheckStore(props.isAllSelect)}
          >
            <Checkbox
              checked={props.isAllSelect}
              className="rounded-full w-5 h-5 border-[1px] border-gray-500"
            />
            <span className="text-[0.8rem]">全选</span>
          </div>
          <Button
            className="bg-orange-600 text-white"
            onClick={() => handleCancelFollowStore()}
          >
            取消关注
          </Button>
        </div>
      </div>
    </div>
  );
};
export default FollowStoreBottomBar;
