"use client";

import { useEffect, useRef, useState } from "react";
import type { CategoryList } from "@/types/category";
import { getCategoryListAPI } from "@/apis/category";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

export default function Home() {
  // 分类集合
  const [categoryList, setCategoryList] = useState<CategoryList[]>([]);
  // 被选中分类id
  const [activeCategoryId, setActiveCategoryId] = useState<number>(1);
  // 被分类分类内容
  const [activeCategoryContent, setActiveCategoryContent] =
    useState<CategoryList | null>(null);
  // 控制遮罩层是否显示
  const [loading, setLoading] = useState(false);
  const getCategoryList = async () => {
    handleLoadData();
    const res = await getCategoryListAPI();
    const data: CategoryList[] = res.data;
    setCategoryList(data);
    setActiveCategoryId(res.data[0].id);
    setActiveCategoryContent(res.data[0]);
  };
  const hasFetched = useRef(false); // 追踪是否已经发送请求
  useEffect(() => {
    if (hasFetched.current) return; // 如果已经请求过，则不再执行
    hasFetched.current = true;
    getCategoryList();
  }, []);
  const handleClickCategory = (id: number) => {
    handleLoadData();
    setActiveCategoryId(id);
    setActiveCategoryContent(categoryList.find((item) => item.id === id)!);
  };
  // 显示以及关闭遮罩层
  const handleLoadData = () => {
    setLoading(true); // 显示遮罩层
    setTimeout(() => {
      setLoading(false); // 关闭遮罩层
    }, 500);
  };

  // 加载组件
  const loadingComponent = () => {
    return (
      <div className="fixed z-99999 inset-0 w-full h-full flex flex-col justify-center items-center bg-[rgba(0,0,0,0.8)]">
        <Icon
          icon="line-md:loading-twotone-loop"
          className="w-16 h-16 text-white"
        />
        <p className="text-white text-xl">加载中</p>
      </div>
    );
  };

  // 跳转页面
  const router = useRouter();

  // 主体内容组件
  const contentComponent = () => {
    return (
      <div>
        <div className="w-full">
          <div className="relative w-90%">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
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
              placeholder="搜索"
              className="w-full py-2 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-white focus:bg-white focus:border-gray-600"
            />
          </div>
        </div>
        <div className="flex mt-3">
          <ul className="flex flex-col text-center text-current sm:h-6 w-20 bg-[#f6f6f6]">
            {categoryList.map((item) => (
              <li
                key={item.id}
                className={cn("p-3 mt-3 first:mt-0 text-xl", {
                  "border-l-4 border-l-[#d4392b]": activeCategoryId === item.id,
                  "bg-white": activeCategoryId === item.id,
                })}
                onClick={() => handleClickCategory(item.id)}
              >
                {item.name}
              </li>
            ))}
          </ul>
          <div className="flex-1 justify-end">
            <div>
              <img
                src={activeCategoryContent?.picUrl}
                alt=""
                className="w-full h-full"
              />
            </div>
            <div className="text-center font-bold text-xl my-5">
              {activeCategoryContent?.remark}
            </div>
            <div className="flex justify-between flex-wrap">
              {activeCategoryContent?.subCategoryList.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex flex-col justify-center items-center p-3"
                    onClick={() => {
                      router.push(
                        `/categoryDetail?id=${item.id}&name=${item.name}`
                      );
                    }}
                  >
                    <img
                      src={item.iconUrl}
                      alt=""
                      className="w-16 h-14 object-contain"
                    />
                    <div>{item.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="w-full h-full">
      {loading ? loadingComponent() : contentComponent()}
    </div>
  );
}
