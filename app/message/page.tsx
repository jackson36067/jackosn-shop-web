"use client";
import { getMemberChatMessageThreadListAPI } from "@/apis/message";
import MessageContent from "@/components/message/MessageContent";
import MessageTopBar from "@/components/message/MessageTopBar";
import { MessageThreadItem } from "@/types/message";
import { useEffect, useState } from "react";

export default function MessagePage() {
  const [chatThreadList, setChatThreadList] = useState<MessageThreadItem[]>([]);
  useEffect(() => {
    const getChatThreadList = async () => {
      const res = await getMemberChatMessageThreadListAPI();
      setChatThreadList(res.data);
    };
    getChatThreadList();
  }, []);
  return (
    <div>
      <MessageTopBar />
      <MessageContent messageThreadItems={chatThreadList} />
    </div>
  );
}
