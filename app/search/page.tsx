"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Flame } from "lucide-react";
import SearchTopBar from "@/components/search/Topbar";
import {
  addSearchHistoryAPI,
  deleteAllHistoryAPI,
  getHistoryAndHotKeywordsAPI,
} from "@/apis/searchHistory";
import { SearchHisotorItem } from "@/types/search";
import { HotwordItem } from "@/types/keyword";
import { toast } from "sonner";

const SearchBox: React.FC = () => {
  const [recentSearches, setRecentSearches] = useState<SearchHisotorItem[]>([]);
  const [hotSearches, setHotSearches] = useState<HotwordItem[]>([]);
  const isFectehing = useRef(false);

  // 获取搜索历史和热门关键词
  const getHistoryAndHotKeywords = async () => {
    const res = await getHistoryAndHotKeywordsAPI();
    const { searchHistoryVOList, keyWordVOList } = res.data;
    setRecentSearches(searchHistoryVOList);
    setHotSearches(keyWordVOList);
  };

  useEffect(() => {
    if (isFectehing.current) return;
    isFectehing.current = true;
    getHistoryAndHotKeywords();
  }, []);

  // 清空最近搜索
  const clearRecentSearches = async () => {
    await deleteAllHistoryAPI();
    setRecentSearches([]);
    toast.success("记录已清空");
  };

  // 处理点击最近搜索或者热门搜索
  const handleSearch = async (item: SearchHisotorItem | HotwordItem) => {
    // 跳转至搜索详情页
    window.location.href = `/searchDetail?name=${item.keyword}`;
    // 保存搜索历史
    await addSearchHistoryAPI(item.keyword);
    localStorage.setItem("searchTerm", item.keyword);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* 头部导航栏 */}
      <SearchTopBar />
      {/* 最近搜索 */}

      <Card className="mt-4 p-4 shadow-md">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">最近搜索</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearRecentSearches}
            className="text-gray-500 hover:text-gray-700"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {recentSearches?.map((item, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSearch(item)}
              className="text-gray-700 hover:bg-gray-200"
            >
              {item.keyword}
            </Button>
          ))}
        </div>
      </Card>

      {/* 热门搜索 */}
      <Card className="mt-4 p-4 shadow-md">
        <div className="flex items-center space-x-2">
          <Flame className="text-red-500" />
          <span className="text-lg font-semibold">热门搜索</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {hotSearches.map((item, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSearch(item)}
              className="text-gray-700 hover:bg-gray-200"
            >
              {item.keyword}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SearchBox;
