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
import { debounce } from "@/utils/debounce";
import { Icon } from "@iconify/react/dist/iconify.js";
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
  // 是否加载数据, 用与控制组件展示
  const [isLoding, setIsLoding] = useState<boolean>(true);
  // 分页页数
  const [page, setPage] = useState<number>(1);
  // 内容是否有剩余
  const [isRemain, setIsRemain] = useState<boolean>(true);
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

  // 点击切换评论类型 -> 点击子组件传递新的类型值过来,接收类型值,重新获取评论列表
  const handleSelectCommentCategory = (newType: number) => {
    // 设置传递的类型
    setQueryType(newType.toString());
    setIsLoding(true);
    // 重置分页数
    setPage(1);
    // 重置是否剩余内容
    setIsRemain(true);
    // 清空列表数据
    setGoodsCommentList([]);
    setTimeout(() => {
      setIsLoding(false);
    }, 300);
  };

  // 监听id以及type的变化,获取店铺评论列表
  useEffect(() => {
    if (!isRemain) {
      return;
    }
    const getGoodsCommentList = async (pageNumber: number) => {
      const res = await getGoodsCommentAPI({
        goodsId: Number(id),
        type: Number(queryType),
        page: pageNumber,
        pageSize: 4,
      });
      const data: GoodsCommentPageResult = res.data;
      setGoodsCommentList((prev) => [...prev, ...data.data]);
      // 设置是否还有剩余商品
      setIsRemain(data.data.length === 4);
    };
    getGoodsCommentList(page);
    setTimeout(() => {
      setIsLoding(false);
    }, 300);
  }, [id, isRemain, page, queryType]);

  // 监听滚动事件 -> 滚动到底部获取更多商品数据
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10
      ) {
        if (isRemain) {
          // 下滚动到底部,则获取下一页商品数据
          setTimeout(() => {
            setPage(page + 1);
          }, 200);
        }
      }
    }, 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, isRemain]);

  return (
    <div>
      <CommentTopBar totalCommentCount={Number(totalCommentCount)} />
      <CommentBar
        commentCategoryList={commentCategoryItems}
        className="px-3 mt-5"
        type={Number(queryType)}
        changeCommentType={(newType: number) =>
          handleSelectCommentCategory(newType)
        }
      />
      {/* 注意重新加载只能重新加载评论数据 */}
      {isLoding ? (
        <LoadingComponent />
      ) : (
        <div>
          {/* 评论列表 */}
          <CommentContent goodsCommentItems={goodsCommentList} />
          {/* 加载更多评论以及评论见底提示 */}
          {isRemain ? (
            <div className="flex justify-center items-center gap-2 mt-5">
              <Icon
                icon="line-md:loading-twotone-loop"
                className="w-8 h-8 text-black"
              />
              <p className="text-black text-xl">加载中</p>
            </div>
          ) : (
            <div className="flex justify-center text-[#999] text-2xl mt-4 items-center">
              <Icon icon="line-md:emoji-smile-wink"></Icon>
              没有更多评论了
            </div>
          )}
        </div>
      )}
    </div>
  );
}
