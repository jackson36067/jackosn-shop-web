import httpInstance from "@/utils/http";

export const GetHotOrNewGoodsAPI = (type: number, isAll: boolean) => {
  return httpInstance({
    method: "GET",
    url: "/goods",
    params: {
      type: type,
      isAll: isAll,
    },
  });
};
