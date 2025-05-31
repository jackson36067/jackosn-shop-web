"use client";

import ColumnGoods from "@/components/category/ColumnGoods";
import { Suspense } from "react";

const ColumnGoodsPage = () => {
  return (
    <Suspense>
      <ColumnGoods />
    </Suspense>
  );
};
export default ColumnGoodsPage;
