"use client";

import MessageDetailTopBar from "@/components/messageDetail/MessageDetailTopBar";

export default function MessageDetailPage() {
  // const searchParams = new URLSearchParams(window.location.search);
  // 获取URL中的参数 -> 消息队列id, 可以根据消息队列id获取消息列表
  // const id = searchParams.get("id");
  return (
    <div>
      <MessageDetailTopBar />
    </div>
  );
}
