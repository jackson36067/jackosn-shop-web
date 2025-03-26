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

function formatDateToLocalDate(date: Date | undefined): string {
  if (date == undefined) {
    return "";
  }
  return date.toISOString().split("T")[0]; // 转换成 "yyyy-MM-dd"
}

export default function BrowseHistoryPage() {
  const isFetch = useRef<boolean>(false);
  const [type, setType] = useState<number>(0);
  const [showOperateButton, setShowOperateButton] = useState<boolean>(false);
  const [browseHistoryList, setBrowseHistoryList] = useState<
    browseHistoryItem[]
  >([]);
  const [allSelectBrowseIdList, setAllSelectBrowseIdList] = useState<number[]>(
    []
  );
  const [allBrowseLength, setAllBrowseLength] = useState<number>(0);
  const [isAllSelect, setIsAllSelect] = useState<boolean>(false);
  // followStoreContent DOM 对象
  const BrowseHistoryContentRef = useRef<{
    triggerFunction: (idList: number[]) => void;
  }>(null);
  const BrowseHistoryTopBarRef = useRef<{
    triggerFunction: () => void;
  }>(null);
  const date = useRef<string | undefined>("");

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

  const handelChangeBrowseHistoryType = (newType: number) => {
    setType(newType);
    getBrowseHistoryList(newType);
    setAllSelectBrowseIdList([]);
    setIsAllSelect(false);
    setShowOperateButton(false);
    BrowseHistoryTopBarRef.current?.triggerFunction();
  };

  const handleChangeOperateStatus = (isShowOperateButton: boolean) => {
    setShowOperateButton(isShowOperateButton);
  };

  const handleSelectBrowse = (browseIdList: number[]) => {
    if (browseIdList.length === allBrowseLength) {
      setIsAllSelect(true);
    } else {
      setIsAllSelect(false);
    }
    setAllSelectBrowseIdList(browseIdList);
  };

  const handelCheckAllBrowse = (isCheck: boolean) => {
    if (!isCheck) {
      setAllSelectBrowseIdList([]);
      BrowseHistoryContentRef.current?.triggerFunction([]);
    } else {
      const newArr: number[] = [];
      browseHistoryList.forEach((item) =>
        newArr.push(...item.data.map((dataItem) => dataItem.browseId))
      );
      setAllSelectBrowseIdList(newArr);
      BrowseHistoryContentRef.current?.triggerFunction(newArr);
    }
    setIsAllSelect(isCheck);
  };

  const handleDeleteBrowseHistory = async () => {
    if (allSelectBrowseIdList.length <= 0) {
      toast.info("亲,请选择内容");
      return;
    }
    await removeBrowseHistoryAPI(allSelectBrowseIdList);
    toast.success("移除内容成功");
    getBrowseHistoryList(type);
    setAllSelectBrowseIdList([]);
    BrowseHistoryContentRef.current?.triggerFunction([]);
    setIsAllSelect(false);
  };

  const handleGetPreDateBrowseList = (newDate: Date | undefined) => {
    date.current = formatDateToLocalDate(newDate);
    getBrowseHistoryList(type);
    setAllSelectBrowseIdList([]);
    BrowseHistoryContentRef.current?.triggerFunction([]);
    setIsAllSelect(false);
    BrowseHistoryTopBarRef.current?.triggerFunction();
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
        allSelectedStoreLength={allSelectBrowseIdList.length}
        type={type}
        isAllSelect={isAllSelect}
        handelCheckAllBrowse={handelCheckAllBrowse}
        handleDeleteBrowseHistory={handleDeleteBrowseHistory}
      />
    </div>
  );
}
