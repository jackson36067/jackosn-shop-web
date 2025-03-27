"use client";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const BrowseHistoryBottomBar = (props: {
  operateState: boolean; // 操作按钮状态
  allSelectedBrowseInfoLength: number; // 被选中的浏览信息长度
  type: number; // 浏览记录信息类型
  isAllSelect: boolean; // 是否全选
  handelCheckAllBrowse: (isCheck: boolean) => void; // 全选获取取消全选
  handleDeleteBrowseHistory: () => void; // 删除选中的浏览记录历史
}) => {
  // 点击全选按钮选中所有浏览记录或者取消选中所有浏览记录,将是否全选传递给父组件,执行父组件的函数
  const handleCheckdChange = (isCheck: boolean) => {
    props.handelCheckAllBrowse(isCheck);
  };

  // 点击删除选中浏览记录信息, 调用父组件的函数
  const handleDeleteBrowseHistory = () => {
    props.handleDeleteBrowseHistory();
  };
  return (
    <div>
      {props.operateState && (
        <div className="fixed bottom-0 left-0 w-[100%] p-3 bg-white">
          {props.allSelectedBrowseInfoLength > 0 && (
            <div className="text-gray-500 text-[1rem]">
              已选中
              <span className="text-orange-500">
                {props.allSelectedBrowseInfoLength}
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
