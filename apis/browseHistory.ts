import httpInstance from "@/utils/http";

/**
 * 获取用户浏览记录
 * @param params 请求参数
 * @returns
 */
export const getBrowseHistoryListAPI = (params: {
  type: number;
  goodsName?: string;
  begin?: string;
}) => {
  return httpInstance({
    method: "GET",
    url: "/browse/list",
    params,
  });
};

/**
 * 删除用户的历史浏览记录
 * @param idList
 * @returns
 */
export const removeBrowseHistoryAPI = (idList: number[]) => {
  return httpInstance({
    method: "DELETE",
    url: "/browse/remove",
    data: {
      idList,
    },
  });
};

/**
 * 获取用户查询浏览记录列表
 * @returns
 */
export const getBrowseSearchHistoryListAPI = () => {
  return httpInstance({
    method: "GET",
    url: "/browse/search/list",
  });
};

/**
 * 新增用户浏览搜索记录
 * @param value 搜索值
 * @returns
 */
export const addBrowseSearchAPI = (value: string) => {
  return httpInstance({
    method: "POST",
    url: "/browse/search",
    data: { value },
  });
};

export const removeAllBrowseSearchHistoryAPI = () => {
  return httpInstance({
    method: "POST",
    url: "/browse/search/remove",
  });
};
