import httpInstance from "@/utils/http";

export const GetHotOrNewGoodsAPI = (
  type: number,
  isAll: boolean,
  page?: number,
  pageSize?: number
) => {
  return httpInstance({
    method: "GET",
    url: "/goods",
    params: {
      type,
      isAll,
      page,
      pageSize,
    },
  });
};
