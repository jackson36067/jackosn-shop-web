"use client";

import { GetHotOrNewGoodsAPI } from "@/apis/goods";
import HomeCategoryGoods from "@/components/home/category/goods";
import SearchTopBar from "@/components/search/Topbar";
import SearchSelectBar from "@/components/searchDetail/selectBar";
import { GoodsMessage, GoodsPageResult } from "@/types/goods";
import { debounce } from "@/utils/debounce";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// TODO: 筛选商品页面 (新品 / 热销)
const SearchDetailPage = () => {
  // 获取输入名称
  const searchParmas = useSearchParams();
  const name = searchParmas.get("name");
  // 加载中
  const [isLoding, setIsLoding] = useState(true);
  // 商品列表
  const [goodItems, setGoodItems] = useState<GoodsMessage[]>([]);
  // 是否已经发送请求
  const hasFetched = useRef(false); // 追踪是否已经发送请求
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

  // 一加载页面先显示正在加载页面后显示商品
  useEffect(() => {
    setTimeout(() => {
      setIsLoding(false);
    }, 600);
  }, []);

  const getHomeGoodsList = async (pageNumber: number) => {
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
        name || "",
        sortTypeRef.current,
        orderTypeRef.current
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
  // 第一次获取商品数据
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    getHomeGoodsList(page.current);
  }, []);

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
    getHomeGoodsList(page.current);
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
            getHomeGoodsList(page.current + 1);
          }, 200);
        }
      }
    }, 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, isRemain]);
  return (
    // 页面内容
    <div>
      {isLoding && (
        // 加载组件
        <div className="fixed z-99999 inset-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.8)]">
          <div className="flex flex-col justify-center items-center p-6 bg-[rgba(0,0,0,0.9)] rounded-md">
            <Icon
              icon="line-md:loading-twotone-loop"
              className="w-16 h-16 text-white"
            />
            <p className="text-white text-xl">加载中...</p>
          </div>
        </div>
      )}
      <div className="w-full max-w-md mx-auto py-4">
        <div className="p-4">
          <SearchTopBar />
        </div>
        <SearchSelectBar
          handleSelectedSortTypeAndOrderType={
            handleSelectedSortTypeAndOrderType
          }
        />
        <div className="mt-4 pb-6 bg-white">
          <HomeCategoryGoods goodItems={goodItems} />
        </div>
      </div>
    </div>
  );
};
export default SearchDetailPage;
