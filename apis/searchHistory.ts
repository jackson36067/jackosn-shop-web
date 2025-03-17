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

export const deleteAllHistoryAPI = () => {
  return httpInstance({
    method: "DELETE",
    url: "/search/delete/all",
  });
};
