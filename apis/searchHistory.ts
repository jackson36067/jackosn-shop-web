import httpInstance from "@/utils/http";

/**
 * 获取用户搜索历史和热门关键词
 * @returns
 */
export const getHistoryAndHotKeywordsAPI = () => {
  return httpInstance({
    method: "GET",
    url: "/search/list",
  });
};

/**
 * 删除所有搜索历史
 * @returns
 */
export const deleteAllHistoryAPI = () => {
  return httpInstance({
    method: "DELETE",
    url: "/search/delete/all",
  });
};

/**
 * 添加搜索历史
 * @param keyword 关键词
 */
export const addSearchHistoryAPI = (keyword: string) => {
  return httpInstance({
    method: "POST",
    url: "/search/add",
    data: {
      keyword,
    },
  });
};
