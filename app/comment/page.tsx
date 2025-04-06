"use client";

import { getGoodsCommentAPI } from "@/apis/comment";
import LoadingComponent from "@/components/common/loading";
import CommentBar from "@/components/goodsDetail/commentBar";
import CommentContent from "@/components/goodsDetail/commentContent";
import CommentTopBar from "@/components/topBar";
import {
  CommentCategoryItem,
  GoodsComment,
  GoodsCommentPageResult,
} from "@/types/comment";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CommentPage() {
  const isFetch = useRef<boolean>(false);
  // 商品评论分类列表
  const [commentCategoryItems, setCommentCategoryItems] = useState<
    CommentCategoryItem[]
  >([]);
  // 商品评论列表
  const [goodsCommentList, setGoodsCommentList] = useState<GoodsComment[]>([]);
  const [isLoding, setIsLoding] = useState<boolean>(true);
  // 从路径参数中获取商品id,好评数,中评数,差评数,有图数,类型
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const totalCommentCount = searchParams.get("totalCommentCount");
  const goodCommentCount = searchParams.get("goodCommentCount");
  const naturalCommentCount = searchParams.get("naturalCommentCount");
  const badCommentCount = searchParams.get("badCommentCount");
  const hasPictureCommentCount = searchParams.get("hasPictureCommentCount");
  // 0.全部 1.好评 2.中评 3.差评 4.有图
  const [queryType, setQueryType] = useState(searchParams.get("type"));
  // 加载评论分类数据
  useEffect(() => {
    if (isFetch.current) return;
    isFetch.current = true;
    // 组件加载就封装数据
    const updatedItems = [
      { title: "全部", value: 0 },
      { title: `(好评${goodCommentCount})`, value: 1 },
      { title: `(中评${naturalCommentCount})`, value: 2 },
      { title: `(差评${badCommentCount})`, value: 3 },
      { title: `(有图${hasPictureCommentCount})`, value: 4 },
    ];
    setCommentCategoryItems(updatedItems);
  }, [
    badCommentCount,
    commentCategoryItems,
    goodCommentCount,
    hasPictureCommentCount,
    naturalCommentCount,
  ]);

  // 监听id以及type的变化,获取店铺评论列表
  useEffect(() => {
    const getGoodsCommentList = async () => {
      const res = await getGoodsCommentAPI({
        goodsId: Number(id),
        type: Number(queryType),
        page: 1,
        pageSize: 4,
      });
      const data: GoodsCommentPageResult = res.data;
      setGoodsCommentList(data.data);
    };
    getGoodsCommentList();
    setTimeout(() => {
      setIsLoding(false);
    }, 300);
  }, [id, queryType]);
  return (
    <div>
      <CommentTopBar totalCommentCount={Number(totalCommentCount)} />
      <CommentBar
        commentCategoryList={commentCategoryItems}
        className="px-3 mt-5"
        type={Number(queryType)}
        changeCommentType={(newType: number) => {
          setQueryType(newType.toString());
          setIsLoding(true);
          setTimeout(() => {
            setIsLoding(false);
          }, 300);
        }}
      />
      {isLoding ? (
        <LoadingComponent />
      ) : (
        <CommentContent goodsCommentItems={goodsCommentList} />
      )}
    </div>
  );
}
