"use client";

import {
  doCollectOrCancelCollectGoodsAPI,
  getCollectGoodsListAPI,
} from "@/apis/goods";
import CollectGoodsBottomBar from "@/components/collectGoods/bottomBar";
import CollectGoodsContent from "@/components/collectGoods/collectGoodsContent";
import CollectGoodsTopBar from "@/components/collectGoods/topBar";
import { CollectGoodsItem } from "@/types/goods";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function CollectGoodsPage() {
  // 接收获取到的收藏商品信息
  const [collectGoodsItems, setCollectGoodsItems] = useState<
    CollectGoodsItem[]
  >([]);
  // 控制操作按钮是否展示
  const [operateButton, setOperateButton] = useState<boolean>(false);
  // 判断是否已经发送请求
  const isFecth = useRef<boolean>(false);
  // 被选中商品
  const [allSelectedGoods, setAllSelectedGoods] = useState<number[]>([]);
  // 判断是否全选
  const [isAllSelecet, setIsAllSelect] = useState<boolean>(false);
  // followStoreContent DOM 对象
  const CollectGoodsDOMRef = useRef<{
    triggerFunction: (idList: number[]) => void;
  }>(null);
  // 搜索参数
  // 商品收藏时间范围
  const collectTime = useRef<number | undefined>(undefined);
  // 商品排序方式
  const goodsSortType = useRef<number | undefined>(undefined);
  // 商品名称
  const goodsName = useRef<string>("");

  // 获取收藏商品列表
  const getCollectGoodsItems = async () => {
    const res = await getCollectGoodsListAPI(
      goodsName.current,
      goodsSortType.current,
      collectTime.current
    );
    setCollectGoodsItems(res.data);
  };

  useEffect(() => {
    if (isFecth.current) return;
    isFecth.current = true;
    getCollectGoodsItems();
  }, []);

  // 点击管理或者完成修改操作状态
  const handleChangeOperateStete = (operateState: boolean) => {
    setOperateButton(operateState);
  };

  // 点击商品单选框改变选中商品内容 -> 传递给子函数调用,接收新的选中商品信息
  const handleChangeSelectGoods = (idList: number[]) => {
    // 判断是否全选
    if (idList.length === collectGoodsItems.length) {
      setIsAllSelect(true);
    } else {
      setIsAllSelect(false);
    }
    // 设置被选中商品
    setAllSelectedGoods(idList);
  };

  // 点击全选单选框,全选商品或者取消全选商品 -> 传递给子函数调用,接收新的选中商品信息
  const handleSelectAllGoods = (checked: boolean) => {
    if (!checked) {
      // 取消全选
      setAllSelectedGoods([]);
      setIsAllSelect(false);
      // 改变子组件被选中商品信息
      CollectGoodsDOMRef.current?.triggerFunction([]);
    } else {
      // 全选
      const idList = collectGoodsItems.map((item) => item.id);
      setAllSelectedGoods(idList);
      setIsAllSelect(true);
      // 改变子组件被选中商品信息
      CollectGoodsDOMRef.current?.triggerFunction(idList);
    }
  };

  // 点击删除选中商品 -> 取消收藏选中商品
  const handleCancelCollectGoods = async () => {
    if (allSelectedGoods.length <= 0) {
      toast.info("您还有没选中内容哦");
      return;
    }
    await doCollectOrCancelCollectGoodsAPI({ idList: allSelectedGoods });
    getCollectGoodsItems();
    toast("删除成功");
    // 更新被选中宝贝
    setAllSelectedGoods([]);
    // 改变子组件被选中商品信息
    CollectGoodsDOMRef.current?.triggerFunction([]);
  };

  // 点击选择收藏物品日期范围以及排序方式, 输入名称搜索商品
  const handelGetCollectGoodsWithParams = (
    name: string,
    sortType: number | undefined,
    newCollectTime: number | undefined
  ) => {
    // 设置请求参数
    goodsName.current = name;
    goodsSortType.current = sortType;
    collectTime.current = newCollectTime;
    // 重置收藏商品
    setCollectGoodsItems([]);
    // 重新发送请求获取商品
    getCollectGoodsItems();
    // 重置选中商品 包括子组件
    setAllSelectedGoods([]);
    CollectGoodsDOMRef.current?.triggerFunction([]);
  };
  return (
    <div>
      <CollectGoodsTopBar
        collectGoodsLength={collectGoodsItems.length}
        changeOperateState={handleChangeOperateStete}
        getCollectWithParams={handelGetCollectGoodsWithParams}
      />
      <CollectGoodsContent
        ref={CollectGoodsDOMRef}
        collectGoodsItems={collectGoodsItems}
        operateButtonState={operateButton}
        changeSelectGoods={handleChangeSelectGoods}
      />
      {operateButton && (
        <CollectGoodsBottomBar
          allSelectedStoreLength={allSelectedGoods.length}
          isAllSelect={isAllSelecet}
          onSelectedAllGoods={handleSelectAllGoods}
          cancelCollectGoods={handleCancelCollectGoods}
        />
      )}
    </div>
  );
}
