"use client";

import { cancelFollowStoreAPI, getFollowStoreListAPI } from "@/apis/store";
import FollowStoreBottomBar from "@/components/followStore/bottomBar";
import FollowStoreContent from "@/components/followStore/followStoreContent";
import FollowStoreTopBar from "@/components/followStore/topBar";
import { FollowStoreItem } from "@/types/store";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
export default function FollowStorePage() {
  // 存储被关注店铺列表
  const [followStoreList, setFollowStoreList] = useState<FollowStoreItem[]>([]);
  // 确保只发送一次请求
  const isFethc = useRef<boolean>(false);
  // 是否展示出操作按钮(单选框,底部操作栏)
  const [showOperateButton, setShowOperateButton] = useState<boolean>(false);
  // 定义被选中的店铺
  const [seletecdStoreIdList, setSelectedStoreIdList] = useState<number[]>([]);
  // 是否全选
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  // followStoreContent DOM 对象
  const FollowStoreContentDOM = useRef<{
    triggerFunction: (idList: number[]) => void;
  }>(null);
  // 店铺名称参数
  const nameRef = useRef<string>("");

  // 发起请求获取关注的店铺
  const getFollowStoreList = async () => {
    const res = await getFollowStoreListAPI(nameRef.current);
    setFollowStoreList(res.data);
  };

  useEffect(() => {
    if (isFethc.current) return;
    isFethc.current = true;
    getFollowStoreList();
  }, []);

  // 点击子组件管理接收新的是否展示操作按钮的值
  const handleChangeOperateStatus = (operateStatus: boolean) => {
    // 设置展示操作按钮状态
    setShowOperateButton(operateStatus);
  };

  // 子组件选择单选按钮传递呗选中的店家id给父组件
  const handleSelectStore = (idList: number[]) => {
    // 判断是否全选
    if (idList.length === followStoreList.length) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
    // 设置被选中店铺id
    setSelectedStoreIdList(idList);
  };

  const handleChangeAllSelect = (isAllSelected: boolean) => {
    if (isAllSelected) {
      // 更新被选中的店铺
      setSelectedStoreIdList([]);
      // 更新子组件中被选中的店铺
      FollowStoreContentDOM.current?.triggerFunction([]);
    } else {
      const idList = followStoreList.map((item) => item.id);
      setSelectedStoreIdList(idList);
      FollowStoreContentDOM.current?.triggerFunction(idList);
    }
    // 设置是否全选 -> 取反
    setIsAllSelected(!isAllSelected);
  };

  // 取消关注被选中店铺 -> 通过底部栏点击取消关注
  const handleCancelFollowStores = async () => {
    // 取消关注被选中店铺
    await cancelFollowStoreAPI(seletecdStoreIdList);
    toast.success("取关成功");
    // 重新获取关注店铺
    getFollowStoreList();
    // 关闭操作按钮
    setShowOperateButton(false);
  };

  // 取消关注特定的店铺 -> 通过弹窗点击取消关注
  const handleCancelFollowStore = async (id: number) => {
    // 取消关注被选中店铺
    await cancelFollowStoreAPI([id]);
    toast.success("取关成功");
    // 重新获取关注店铺
    getFollowStoreList();
  };

  // 通过名称搜索关注店铺列表
  const handleSelectFollowStoreName = (name: string) => {
    // 更新店铺名称
    nameRef.current = name;
    // 先清空关注店铺列表
    setFollowStoreList([]);
    // 重新获取关注店铺列表
    getFollowStoreList();
  };
  return (
    <div>
      <FollowStoreTopBar
        followStoreLength={followStoreList.length} // 被选中店铺数量
        changeOperateStatus={handleChangeOperateStatus} // 更改操作按钮显示
        handleSelectFollowStoreName={handleSelectFollowStoreName}
      />
      {followStoreList.length > 0 ? (
        <FollowStoreContent
          ref={FollowStoreContentDOM} // FollowStoreContentDOM对象
          followStoreItems={followStoreList} // 关注店铺列表
          operateStatus={showOperateButton} // 是否显示操作按钮
          changeSelected={handleSelectStore} // 更新被选中的店铺
          cancelFollowStore={handleCancelFollowStore} // 取消关注店铺
        />
      ) : (
        <div className="flex justify-center mt-100">还没有关注店铺!</div>
      )}
      {showOperateButton && (
        <FollowStoreBottomBar
          isAllSelect={isAllSelected} // 是否全选
          changeAllSelect={handleChangeAllSelect} // 更新是否全选店铺
          allSelectedStoreLength={seletecdStoreIdList.length} // 被选中店铺列表
          cancelFollowStore={handleCancelFollowStores} // 取消关注店铺
        />
      )}
    </div>
  );
}
