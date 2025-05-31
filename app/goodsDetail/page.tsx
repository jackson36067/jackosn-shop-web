"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const GoodsDetailPageComponent = dynamic(
  () => import("@/components/goodsDetail/goodsDetail"), // 根据你的实际路径调整
  {
    ssr: false, // 关键配置：禁用服务器渲染
  }
);

export default function GoodsDetailPage() {
  return (
    <Suspense>
      <GoodsDetailPageComponent />
    </Suspense>
  );
}
