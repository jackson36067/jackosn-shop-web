"use client";

import {
  getMemberChatMessageThreadDetailAPI,
  sendMessageAPI,
} from "@/apis/message";
import EmojiPicker from "@/components/common/emoji";
import { MessageDetailBottomBar } from "@/components/messageDetail/MessageDetailBottomBar";
import { MessageDetailContent } from "@/components/messageDetail/MessageDetailContent";
import MessageDetailTopBar from "@/components/messageDetail/MessageDetailTopBar";
import useMemberStore from "@/stores/MemberStore";
import { useWebSocketStore } from "@/stores/WebSocketStore";
import { MessageItem, MessageThreadDetailItem } from "@/types/message";
import { useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
  // 聊天内容列表
  const [chatMessageList, setChatMessageList] = useState<MessageItem[]>([]);
  // 用 ref 记录上次处理到的websocket消息数组的位置
  const lastIndexRef = useRef<number>(0);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // 连接websocket
    useWebSocketStore
      .getState()
      .connect(
        `ws://localhost:8080/ws/${useMemberStore.getState().memberInfo.id}`
      );
  });

  // 获取聊天消息详情
  useEffect(() => {
    const getMessageDetail = async () => {
      const res = await getMemberChatMessageThreadDetailAPI(Number(id));
      const data: MessageThreadDetailItem = res.data;
      setMessageDetail(data);
      setChatMessageList(data.chatMessageList);
    };
    getMessageDetail();
  }, [id]);

  // 让消息列表滚动到底部
  useLayoutEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [chatMessageList]);

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

  // 监听websocket消息
  const { messages } = useWebSocketStore();

  // 判断监听消息是否是当前聊天消息
  useEffect(() => {
    console.log(messages);
    // 如果当前消息列表为空, 或者当前消息列表长度小于等于上次处理的位置, 则不处理
    if (lastIndexRef.current >= messages.length) return;
    const newMessages = messages.slice(lastIndexRef.current); // 取出新增的消息
    // 过滤出当前聊天消息,并将其转换为MessageItem类型
    const webSokcetMessageList = newMessages
      .map((message) => {
        return JSON.parse(message) as MessageItem;
      })
      // 通过消息队列id过滤出当前聊天消息
      .filter((message) => {
        return message.id === Number(id);
      });
    console.log(webSokcetMessageList);
    setChatMessageList((prev) => {
      const newChatMessageList = [...prev, ...webSokcetMessageList];
      return newChatMessageList;
    });
    lastIndexRef.current = messages.length; // 更新已处理的位置
  }, [id, messages]);

  // 发送消息
  const sendMessage = async () => {
    if (isInput) {
      await sendMessageAPI({
        id: Number(id),
        userId: messsageDetail?.senderId || 0,
        receiverId: messsageDetail?.receiverId || 0,
        receiverStoreId: messsageDetail?.receiverStoreId,
        senderStoreId: messsageDetail?.senderStoreId,
        name: messsageDetail?.name || "",
        avatar: messsageDetail?.avatar || "",
        message: message,
      });
      setMessage("");
      setChatMessageList((prev) => {
        return [
          ...prev,
          {
            id: 0,
            userId: messsageDetail?.senderId || 0,
            receiverId: messsageDetail?.receiverId || 0,
            avatar: messsageDetail?.avatar || "",
            name: messsageDetail?.name || "",
            message: message,
            isRead: false,
          },
        ];
      });
    }
  };
  return (
    <div className="w-full">
      <MessageDetailTopBar
        name={messsageDetail?.name}
        storeId={messsageDetail?.receiverStoreId}
      />
      <MessageDetailContent
        className="w-full h-[calc(100vh-8rem)] overflow-y-auto"
        messageList={chatMessageList}
        storeId={messsageDetail?.receiverStoreId}
        ref={messageContainerRef}
      />
      <MessageDetailBottomBar
        className="w-full fixed bottom-0 left-0 bg-white"
        changeShowEmojiPicker={() => {
          setShowEmojiPicker(!showEmojiPicker);
        }}
        message={message}
        isInput={isInput}
        handleInput={(value) => inputValue(value)}
        handleSendMessage={() => sendMessage()}
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
