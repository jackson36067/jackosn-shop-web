"use client";
import { getMemberChatMessageThreadListAPI } from "@/apis/message";
import MessageContent from "@/components/message/MessageContent";
import MessageTopBar from "@/components/message/MessageTopBar";
import useMemberStore from "@/stores/MemberStore";
import { MessageThreadItem } from "@/types/message";
import { useEffect, useState } from "react";

export default function MessagePage() {
  const [chatThreadList, setChatThreadList] = useState<MessageThreadItem[]>([]);
  const { memberInfo } = useMemberStore();
  useEffect(() => {
    const getChatThreadList = async () => {
      if (!memberInfo) return;
      const res = await getMemberChatMessageThreadListAPI();
      setChatThreadList(res.data);
    };
    getChatThreadList();
  }, [memberInfo]);
  return (
    <div>
      <MessageTopBar />
      <MessageContent messageThreadItems={chatThreadList} />
    </div>
  );
}
