"use client";

import SearchDetail from "@/components/searchDetail/SearchDetail";
import { Suspense } from "react";

// 筛选商品页面 (新品 / 热销)
const SearchDetailPage = () => {
  return (
    <Suspense>
      <SearchDetail />
    </Suspense>
  );
};
export default SearchDetailPage;
