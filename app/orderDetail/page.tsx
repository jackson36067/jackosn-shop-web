"use client";

import OrderDetail from "@/components/orderDetail/OrderDetail";
import { Suspense } from "react";

export default function OrderDetailPage() {
  return (
    <Suspense>
      <OrderDetail />
    </Suspense>
  );
}
