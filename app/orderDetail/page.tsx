"use client";
import { useSearchParams } from "next/navigation";

export default function OrderDetailPage() {
  const params = useSearchParams();
  console.log(params.get("orderSn"));
  return (
    <div>
      <p>l</p>
    </div>
  );
}
