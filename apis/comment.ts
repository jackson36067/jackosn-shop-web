import httpInstance from "@/utils/http";

/**
 * 获取商品评论接口
 * @param params type: 0.全部 1.好评 2.中评 3.差评 4.有图
 * @returns
 */
export const getGoodsCommentAPI = (params: {
  goodsId: number;
  type: number;
  page: number;
  pageSize: number;
}) => {
  return httpInstance({
    method: "GET",
    url: "/comment",
    params,
  });
};
