"use client";

import { MessageDetail } from "@/components/messageDetail/MessageDetail";
import { Suspense } from "react";

export default function MessageDetailPage() {
  return (
    <Suspense>
      <MessageDetail />
    </Suspense>
  );
}
