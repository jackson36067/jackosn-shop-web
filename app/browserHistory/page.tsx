"use client";

import {
  getBrowseHistoryListAPI,
  removeBrowseHistoryAPI,
} from "@/apis/browseHistory";
import BrowseHistoryBottomBar from "@/components/browserHistory/bottomBar";
import BrowseHistoryContent from "@/components/browserHistory/browseHistoryContent";
import BrowseHistoryTopBar from "@/components/browserHistory/topBar";
import BrowseHistoryTypeSelectBar from "@/components/browserHistory/typeSelectBar";
import { browseHistoryItem } from "@/types/browseHistory";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// 转换日期函数 转换成 "yyyy-MM-dd"格式
function formatDateToLocalDate(date: Date | undefined): string {
  if (date == undefined) {
    return "";
  }
  return date.toISOString().split("T")[0]; // 转换成 "yyyy-MM-dd"
}

export default function BrowseHistoryPage() {
  // 判断是否已经发送过请求
  const isFetch = useRef<boolean>(false);
  // 判断获取浏览记录类型 0.宝贝 1.店铺 2.图文(评论)
  const [type, setType] = useState<number>(0);
  // 是否展示操作按钮
  const [showOperateButton, setShowOperateButton] = useState<boolean>(false);
  // 保存浏览记录信息
  const [browseHistoryList, setBrowseHistoryList] = useState<
    browseHistoryItem[]
  >([]);
  // 所有被选中的浏览记录信息id
  const [allSelectBrowseIdList, setAllSelectBrowseIdList] = useState<number[]>(
    []
  );
  // 浏览记录信息总长度
  const [allBrowseLength, setAllBrowseLength] = useState<number>(0);
  // 是否全选浏览记录信息
  const [isAllSelect, setIsAllSelect] = useState<boolean>(false);
  // BrowseHistoryContent DOM 对象
  const BrowseHistoryContentRef = useRef<{
    triggerFunction: (idList: number[]) => void;
  }>(null);
  // BrowseHistoryTopBar DOM 对象
  const BrowseHistoryTopBarRef = useRef<{
    triggerFunction: () => void;
  }>(null);
  // 日期参数 -> 获取用户浏览记录初始日期往前
  const date = useRef<string | undefined>("");

  // 获取到浏览记录信息
  const getBrowseHistoryList = async (newType: number) => {
    const res = await getBrowseHistoryListAPI({
      type: newType,
      begin: date.current,
    });
    const data: browseHistoryItem[] = res.data;
    setBrowseHistoryList(data);
    // 计算总的浏览量
    setAllBrowseLength(
      data.reduce((prev, item) => {
        return prev + item.data.length;
      }, 0)
    );
  };

  useEffect(() => {
    if (isFetch.current) return;
    isFetch.current = true;
    getBrowseHistoryList(type);
  }, []);

  // 当子组件的type切换时,就是切换获取不同浏览记录时执行,传递新的type给该组件
  const handelChangeBrowseHistoryType = (newType: number) => {
    // 设置新组件
    setType(newType);
    // 发送请求, 获取新的浏览记录信息
    getBrowseHistoryList(newType);
    // 将选中的浏览记录信息清空
    setAllSelectBrowseIdList([]);
    // 将全选设置为false
    setIsAllSelect(false);
    // 切换后,隐藏操作按钮
    setShowOperateButton(false);
    // 同步子组件的操作按钮状态
    BrowseHistoryTopBarRef.current?.triggerFunction();
  };

  // 子组件更改操作按钮的状态时执行, 将新的状态传递给该组件
  const handleChangeOperateStatus = (isShowOperateButton: boolean) => {
    // 更改操作状态
    setShowOperateButton(isShowOperateButton);
  };

  // 当子组件选中浏览记录时,将选中的浏览记录id传递给该组件
  const handleSelectBrowse = (browseIdList: number[]) => {
    // 判断是否全选
    if (browseIdList.length === allBrowseLength) {
      setIsAllSelect(true);
    } else {
      setIsAllSelect(false);
    }
    // 设置被选中的浏览记录
    setAllSelectBrowseIdList(browseIdList);
  };

  // 子组件点击全选选中所有浏览记录,或者取消全选
  const handelCheckAllBrowse = (isCheck: boolean) => {
    // 判断是取消全选还是全选
    if (!isCheck) {
      // 取消全选
      // 清空被选中浏览记录信息
      setAllSelectBrowseIdList([]);
      // 同步子组件被选中浏览记录信息
      BrowseHistoryContentRef.current?.triggerFunction([]);
    } else {
      const newArr: number[] = [];
      // 过滤出所有浏览记录信息id
      browseHistoryList.forEach((item) =>
        newArr.push(...item.data.map((dataItem) => dataItem.browseId))
      );
      // 选中浏览记录设置为所有的浏览记录信息id
      setAllSelectBrowseIdList(newArr);
      // 同步子组件被选中浏览记录信息
      BrowseHistoryContentRef.current?.triggerFunction(newArr);
    }
    // 设置是否全选
    setIsAllSelect(isCheck);
  };

  // 点击子组件删除选中浏览记录
  const handleDeleteBrowseHistory = async () => {
    // 判断是否有选中的浏览记录信息
    if (allSelectBrowseIdList.length <= 0) {
      toast.info("亲,请选择内容");
      return;
    }
    // 调用移除函数
    await removeBrowseHistoryAPI(allSelectBrowseIdList);
    toast.success("移除内容成功");
    // 重新获取浏览记录信息
    getBrowseHistoryList(type);
    // 清空选中浏览记录内容
    setAllSelectBrowseIdList([]);
    // 同步子组件选中浏览记录内容
    BrowseHistoryContentRef.current?.triggerFunction([]);
    // 设置为没有全选
    setIsAllSelect(false);
  };

  // 当子组件选择浏览记录日期后,根据日期获取浏览记录信息
  const handleGetPreDateBrowseList = (newDate: Date | undefined) => {
    // 格式化日期
    date.current = formatDateToLocalDate(newDate);
    // 重新获取浏览记录信息
    getBrowseHistoryList(type);
    // 清空选中浏览记录信息
    setAllSelectBrowseIdList([]);
    // 同步子组件浏览记录信息
    BrowseHistoryContentRef.current?.triggerFunction([]);
    // 将是否全选设置为false
    setIsAllSelect(false);
  };
  return (
    <div>
      <BrowseHistoryTopBar
        browseLength={allBrowseLength}
        changeOperateStatus={handleChangeOperateStatus}
        ref={BrowseHistoryTopBarRef}
      />
      <BrowseHistoryTypeSelectBar
        type={type}
        changeBrowseHistoryType={handelChangeBrowseHistoryType}
        allBrowseHistroyDate={browseHistoryList.map((item) => item.browseTime)}
        getPreDateBrowseList={handleGetPreDateBrowseList}
      />
      <BrowseHistoryContent
        type={type}
        operateStatus={showOperateButton}
        browseHistoryItems={browseHistoryList}
        handleSelectBrowse={handleSelectBrowse}
        ref={BrowseHistoryContentRef}
      />
      <BrowseHistoryBottomBar
        operateState={showOperateButton}
        allSelectedBrowseInfoLength={allSelectBrowseIdList.length}
        type={type}
        isAllSelect={isAllSelect}
        handelCheckAllBrowse={handelCheckAllBrowse}
        handleDeleteBrowseHistory={handleDeleteBrowseHistory}
      />
    </div>
  );
}
