"use client";

import Order from "@/components/order/Order";
import { Suspense } from "react";

export default function OrderPage() {
  return (
    <Suspense>
      <Order />
    </Suspense>
  );
}
