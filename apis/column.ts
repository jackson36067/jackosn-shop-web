import httpInstance from "@/utils/http";

/**
 * 获取栏目集合
 * @returns
 */
export const getColumnListAPI = () => {
  return httpInstance({
    method: "GET",
    url: "/column/list",
  });
};

/**
 * 获取栏目详情
 * @returns
 */
export const getColumnDetailByIdAPI = (id: string) => {
  return httpInstance({
    method: "GET",
    url: `/column/detail/${id}`,
  });
};
