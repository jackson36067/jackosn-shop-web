"use client";

import { addSearchHistoryAPI } from "@/apis/searchHistory";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchTopBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const handleSearch = async (term: string) => {
    if (!term) return;
    localStorage.setItem("searchTerm", term);
    router.push(`/searchDetail?name=${term}`);
    setSearchTerm(term);
    await addSearchHistoryAPI(searchTerm);
  };
  const handlerBack = () => {
    if (pathname === "/search") {
      router.push("/");
    } else {
      router.push("/search");
      // 页面返回到搜索页时，清空搜索框内容
      localStorage.setItem("searchTerm", "");
    }
  };
  // 防止刷新页面后，搜索框内容丢失
  useEffect(() => {
    const term = localStorage.getItem("searchTerm");
    if (term) {
      setSearchTerm(term);
    }
  }, []);
  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <div className="text-current" onClick={() => handlerBack()}>
          <Icon icon="ep:arrow-left" className="w-5 h-5" />
        </div>
        {/* 搜索框 */}
        <div className="relative flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 left-3"
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
            autoFocus
            type="text"
            placeholder="搜索商品"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(searchTerm)}
            className="w-full py-2 pl-12 pr-4 text-gray-500 rounded-md outline-none bg-[#f4f4f4] focus:outline-none"
          />
        </div>
        <button
          onClick={() => handleSearch(searchTerm)}
          className="bg-[#f4f4f4] outline-none text-gray-700 hover:bg-gray-300 py-1 px-3 rounded ml-4"
        >
          搜索
        </button>
      </div>
    </div>
  );
};
export default SearchTopBar;
