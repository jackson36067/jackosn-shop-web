"use client";

import { getMemberChatMessageThreadDetailAPI } from "@/apis/message";
import EmojiPicker from "@/components/common/emoji";
import { MessageDetailBottomBar } from "@/components/messageDetail/MessageDetailBottomBar";
import { MessageDetailContent } from "@/components/messageDetail/MessageDetailContent";
import MessageDetailTopBar from "@/components/messageDetail/MessageDetailTopBar";
import { MessageThreadDetailItem } from "@/types/message";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MessageDetailPage() {
  const searchParams = useSearchParams();
  // 获取URL中的参数 -> 消息队列id, 可以根据消息队列id获取消息列表
  const id = searchParams.get("id");
  // 保存消息详情信息
  const [messsageDetail, setMessageDetail] =
    useState<MessageThreadDetailItem | null>(null);
  // 控制是否展示表情选择器
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  // 输入框内容
  const [message, setMessage] = useState<string>("");
  // 是否输入内容
  const [isInput, setIsInput] = useState<boolean>(false);
  // 获取聊天消息详情
  useEffect(() => {
    const getMessageDetail = async () => {
      const res = await getMemberChatMessageThreadDetailAPI(Number(id));
      setMessageDetail(res.data);
    };
    getMessageDetail();
  }, [id]);
  // 输入框输入内容
  const inputValue = (value: string) => {
    setMessage(value);
  };
  // 选择表情
  const handleSelectedEmoji = (emoji: string) => {
    setMessage(message + emoji);
    setShowEmojiPicker(false);
  };
  // 监听输入框内容变化
  useEffect(() => {
    if (message.length > 0) {
      setIsInput(true);
    } else {
      setIsInput(false);
    }
  }, [message]);
  return (
    <div className="w-full">
      <MessageDetailTopBar
        name={messsageDetail?.name}
        storeId={messsageDetail?.receiverStoreId}
      />
      <MessageDetailContent
        className="w-full mt-4"
        messageList={messsageDetail?.chatMessageList}
        storeId={messsageDetail?.receiverStoreId}
      />
      <MessageDetailBottomBar
        className="w-full fixed bottom-0 left-0 bg-white"
        changeShowEmojiPicker={() => {
          setShowEmojiPicker(!showEmojiPicker);
        }}
        message={message}
        isInput={isInput}
        handleInput={(value) => inputValue(value)}
      />
      {showEmojiPicker && (
        <EmojiPicker
          className="fixed bottom-14 left-0 w-full h-35 overflow-y-auto bg-white"
          onSelectedEmoji={(emoji) => handleSelectedEmoji(emoji)}
        />
      )}
    </div>
  );
}
