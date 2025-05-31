"use client";

import CategoryDetails from "@/components/categoryDetail/CategoryDetail";
import { Suspense } from "react";

const CategoryDetailsPage = () => {
  return (
    <Suspense>
      <CategoryDetails />
    </Suspense>
  );
};
export default CategoryDetailsPage;
