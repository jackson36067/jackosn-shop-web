"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Settlement = dynamic(
  () => import("@/components/settlement/Settlement"), // 根据你的实际路径调整
  {
    ssr: false, // 关键配置：禁用服务器渲染
  }
);

export default function SettlementPage() {
  return (
    <Suspense>
      <Settlement />
    </Suspense>
  );
}
