"use client";

import Comment from "@/components/comment/Comment";
import { Suspense } from "react";

export default function CommentPage() {
  return (
    <Suspense>
      <Comment />
    </Suspense>
  );
}
