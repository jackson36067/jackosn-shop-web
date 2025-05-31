"use client";

import Store from "@/components/store/store";
import { Suspense } from "react";

export default function StorePage() {
  return (
    <Suspense>
      <Store />
    </Suspense>
  );
}
