"use client";

import { GetGoodsByCategoryIdAPI } from "@/apis/goods";
import CategoryGoods from "@/components/category/good";
import TopBar from "@/components/categoryDetail/topBar";
import { GoodsMessage, GoodsPageResult } from "@/types/goods";
import { debounce } from "@/utils/debounce";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

const CategoryDetails = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("name") || "";
  const id = searchParams.get("id");
  const hasFetched = useRef(false); // 追踪是否已经发送请求
  const [hotOrNewGoods, setHotOrNewGoods] = useState<GoodsMessage[]>([]);
  const [page, setPage] = useState(1);
  // 分页获取商品是否有剩余的商品, 没有-> 则不需要在获取商品
  const [isRemain, setIsRemain] = useState(true);
  const getGoodsByCategoryId = useCallback(
    async (pageNumber: number) => {
      try {
        if (!isRemain) {
          return;
        }
        const res = await GetGoodsByCategoryIdAPI(Number(id), pageNumber, 4);
        const data: GoodsPageResult = res.data;
        setIsRemain(data.data.length === 4);
        const newData = data.data;
        setHotOrNewGoods((prevDate) => [...prevDate, ...newData]);
        setPage(pageNumber);
      } catch (error) {
        console.error("加载失败:", error);
      }
    },
    [id, isRemain]
  );
  // 第一次获取商品数据
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    getGoodsByCategoryId(page);
  }, [getGoodsByCategoryId, page]);

  useEffect(() => {
    // 监听滚动事件 -> 滚动到底部获取更多商品数据
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10
      ) {
        if (isRemain) {
          setTimeout(() => {
            getGoodsByCategoryId(page + 1);
          }, 200);
        }
      }
    }, 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, isRemain, getGoodsByCategoryId]);

  return (
    <Suspense>
      <div className="overflow-auto pb-10">
        <TopBar title={title} />
        <div className="flex justify-center relative mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 left-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="搜索你想要的商品"
            className="w-[90%] py-2 pl-12 pr-4 border text-gray-500  rounded-md outline-none bg-gray-50 focus:bg-white focus:border-gray-700"
          />
        </div>
        <div className="mt-8">
          <CategoryGoods goodItems={hotOrNewGoods} />
        </div>
        <div className="mt-5">
          {/* 判断是否还有商品获取 */}
          {isRemain ? (
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
    </Suspense>
  );
};
export default CategoryDetails;
