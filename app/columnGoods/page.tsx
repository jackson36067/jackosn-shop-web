"use client";

import { getColumnDetailByIdAPI } from "@/apis/column";
import CategoryGoods from "@/components/category/good";
import TopBar from "@/components/categoryDetail/topBar";
import { ColumnDetailInfo } from "@/types/column";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ColumnGoods = () => {
  // 获取路径参数中传递的coulmn-id
  const searchParmas = useSearchParams();
  const id = searchParmas.get("id");
  // 用于保存获取的栏目详情信息
  const [columnDetailInfo, setColumnDetailInfo] = useState<ColumnDetailInfo>();
  const getColumnDetailInfo = async () => {
    const res = await getColumnDetailByIdAPI(id!);
    const data: ColumnDetailInfo = res.data;
    setColumnDetailInfo(data);
  };
  const hasFetched = useRef(false); // 追踪是否已经发送请求
  useEffect(() => {
    if (hasFetched.current) return; // 如果已经请求过，则不再执行
    hasFetched.current = true;
    getColumnDetailInfo();
  }, []);
  return (
    <div>
      <TopBar title={columnDetailInfo?.name || "Default Title"} />
      <div>
        <img src={columnDetailInfo?.detailPic} alt="" />
      </div>
      <CategoryGoods goodItems={columnDetailInfo?.goodsMessageVOList || []} />
    </div>
  );
};
export default ColumnGoods;
