"use client";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const CollectGoodsBottomBar = (props: {
  allSelectedStoreLength: number;
  isAllSelect: boolean;
  onSelectedAllGoods: (checked: boolean) => void;
  cancelCollectGoods: () => void;
}) => {
  const handleCheckdChange = (checked: boolean) => {
    props.onSelectedAllGoods(checked);
  };

  const handleCancelFollowStore = () => {
    props.cancelCollectGoods();
  };
  return (
    <div className="fixed bottom-0 left-0 w-[100%] p-3 bg-white">
      {props.allSelectedStoreLength > 0 && (
        <div className="text-gray-500 text-[1rem]">
          已选中
          <span className="text-orange-500">
            {props.allSelectedStoreLength}
          </span>
          件宝贝
        </div>
      )}
      <div>
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-1"
            // onClick={() => handleAllCheckStore(props.isAllSelect)}
          >
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
              onClick={() => handleCancelFollowStore()}
            >
              删除
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CollectGoodsBottomBar;
