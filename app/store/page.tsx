"use client";

import { GetHotOrNewGoodsAPI } from "@/apis/goods";
import { followStoreAPI, getStoerInfoAPI } from "@/apis/store";
import LoadingComponent from "@/components/common/loading";
import HomeCategoryGoods from "@/components/home/category/goods";
import SearchSelectBar from "@/components/searchDetail/selectBar";
import StoreTopBar from "@/components/store/topBar";
import StoreGoodsTypeBar from "@/components/store/typeSelectBar";
import useMemberStore from "@/stores/MemberStore";
import { GoodsMessage, GoodsPageResult } from "@/types/goods";
import { StoreInfo } from "@/types/store";
import { debounce } from "@/utils/debounce";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function StorePage() {
  const searchParmas = useSearchParams();
  const storeId = searchParmas.get("id");
  const [storeInfo, setStoreInfo] = useState<StoreInfo>();
  // 商品列表
  const [goodItems, setGoodItems] = useState<GoodsMessage[]>([]);
  const isFetch = useRef<boolean>(false);
  const page = useRef(1);
  // 分页获取商品是否有剩余的商品, 没有-> 则不需要在获取商品
  const isRemain = useRef(true);
  // 商品类型 (新品/热销 0.新品 1.热销 2.全部)
  const type = useRef(2);
  // 排序方式
  // default: 综合排序
  // sales: 销量排序
  // price: 价格排序
  const sortTypeRef = useRef<string>("default");
  // 0.升序 1.降序
  const orderTypeRef = useRef<number>(0);
  // 加载中
  const [isLoding, setIsLoding] = useState(true);
  // 商品名称
  const name = useRef<string>("");
  //SearchSelectBar dom对象
  const SearchSelectBarDomRef = useRef<{
    triggerFunction: (newType: number) => void;
  }>(null);

  // 获取店铺基本信息
  const getStoreInfo = async () => {
    const res = await getStoerInfoAPI({
      id: Number(storeId),
    });
    setStoreInfo(res.data);
  };

  // 获取店铺商品信息
  const getStoreGoodsList = async (pageNumber: number) => {
    try {
      // 判断是否还有剩余商品
      if (!isRemain.current) {
        // 没有,则不需要再获取商品
        return;
      }
      // 首页展示不是获取全部,而且不需要传递name, saleNumSort, priceSort三个参数
      const res = await GetHotOrNewGoodsAPI(
        type.current,
        true,
        pageNumber,
        6,
        name.current || "",
        sortTypeRef.current,
        orderTypeRef.current,
        Number(storeId)
      );
      const data: GoodsPageResult = res.data;
      // 设置是否还有剩余商品
      isRemain.current = data.data.length === 6;
      // 获取到的商品数据
      const newData = data.data;
      setGoodItems((prevDate) => [...prevDate, ...newData]);
      page.current = pageNumber;
    } catch (error) {
      console.error("加载失败:", error);
    }
  };
  // 组件加载获取店铺数据以及店铺商品
  useEffect(() => {
    if (isFetch.current) return;
    isFetch.current = true;
    getStoreInfo();
    getStoreGoodsList(page.current);
    setTimeout(() => {
      setIsLoding(false);
    }, 600);
  }, []);

  // 修改子组件input值后接收传递过来的商品名称
  const handleSelectedGoodsName = (newName: string) => {
    // 更新搜索商品名称
    name.current = newName;
    // 现将商品清空,再重新获取商品
    setGoodItems([]);
    // 将页数重置为1
    page.current = 1;
    // 重置是否还有剩余商品
    isRemain.current = true;
    // 重新获取商品
    getStoreGoodsList(page.current);
  };

  // 点击子组件的商品类型传递过来的商品类型
  const handleChangeStoreGoodsType = (newType: number) => {
    // 出现加载中动画
    setIsLoding(true);
    // 更新搜索商品名称
    type.current = newType;
    // 现将商品清空,再重新获取商品
    setGoodItems([]);
    // 将页数重置为1
    page.current = 1;
    // 重置是否还有剩余商品
    isRemain.current = true;
    // 重新获取商品
    getStoreGoodsList(page.current);
    // 更改子组件type值
    SearchSelectBarDomRef.current?.triggerFunction(newType);
    // 500ms后取消加载中动画
    setTimeout(() => {
      setIsLoding(false);
    }, 500);
  };

  // 点击子组件传递过来的排序方式
  const handleSelectedSortTypeAndOrderType = (
    sortType: string,
    orderType: number,
    goodsType: number
  ) => {
    // 出现加载中动画
    setIsLoding(true);
    // 设置排序方式
    sortTypeRef.current = sortType;
    // 设置排序方式
    orderTypeRef.current = orderType;
    // 现将商品清空,再重新获取商品
    setGoodItems([]);
    // 将页数重置为1
    page.current = 1;
    // 重置是否还有剩余商品
    isRemain.current = true;
    // 更新商品类型 (新品/热销 0.新品 1.热销 2.全部)
    type.current = goodsType;
    // 重新获取商品
    getStoreGoodsList(page.current);
    // 500ms后取消加载中动画
    setTimeout(() => {
      setIsLoding(false);
    }, 500);
  };

  useEffect(() => {
    // 监听滚动事件 -> 滚动到底部获取更多商品数据
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10
      ) {
        if (isRemain.current) {
          // 下滚动到底部,则获取下一页商品数据
          setTimeout(() => {
            getStoreGoodsList(page.current + 1);
          }, 200);
        }
      }
    }, 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, isRemain]);

  // 处理关注店铺事件
  const handleFollowStore = async (id: number, isFollow: boolean) => {
    // 先判断是否登录了
    if (!useMemberStore.getState().memberInfo.token) {
      // 提示请先登录
      toast.info("请先登录");
      return;
    }
    // 发送关注请求
    await followStoreAPI(id, isFollow);
    // 重新获取店铺数据
    getStoreInfo();
  };
  return (
    <div>
      {storeInfo ? (
        <div className="pb-13">
          <div className="fixed top-0 left-0 w-full bg-white z-10">
            <StoreTopBar
              storeInfo={storeInfo}
              handleSelectedGoodsName={handleSelectedGoodsName}
              handleFollowStore={handleFollowStore}
            />
            <StoreGoodsTypeBar
              handleChangeStoreGoodsType={handleChangeStoreGoodsType}
            />
            <SearchSelectBar
              ref={SearchSelectBarDomRef}
              handleSelectedSortTypeAndOrderType={
                handleSelectedSortTypeAndOrderType
              }
            />
          </div>
          <div className="flex-1 mt-[15rem] overflow-auto bg-gray-100">
            {isLoding && <LoadingComponent />}
            <div className="mt-4 pb-6 bg-white">
              <HomeCategoryGoods goodItems={goodItems} />
            </div>
            <div className="my-5">
              {/* 判断是否还有商品获取 */}
              {isRemain.current ? (
                <div className="flex justify-center items-center gap-2 mt-5">
                  <Icon
                    icon="line-md:loading-twotone-loop"
                    className="w-8 h-8 text-black"
                  />
                  <p className="text-black text-xl">加载中</p>
                </div>
              ) : (
                <div className="flex justify-center text-[#999] text-2xl mt-4 items-center">
                  <Icon icon="line-md:emoji-smile-wink"></Icon>
                  没有更多商品了
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>加载中...</p>
      )}
    </div>
  );
}
