"use client";

import PaymentComplete from "@/components/paymentComplete/PaymentComplete";
import { Suspense } from "react";

export default function PaymentCompletePage() {
  return (
    <Suspense>
      <PaymentComplete />
    </Suspense>
  );
}
