"use client";

import { MessageThreadItem } from "@/types/message";
import Image from "next/image";

const MessageContent = (props: { messageThreadItems: MessageThreadItem[] }) => {
  return (
    <div className="p-3">
      <div className="flex flex-col gap-2">
        {props.messageThreadItems.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center gap-4 py-2 rounded-md"
              onClick={() =>
                (window.location.href = `/messageDetail?id=${item.id}`)
              }
            >
              <div>
                <Image
                  src={item.avatar}
                  alt=""
                  width={50}
                  height={50}
                  className="rounded-md w-12 h-12"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <p className="text-lg">{item.name}</p>
                <p className="w-full truncate text-gray-400">
                  {item.lastMessage}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p>{item.lastMessageTime}</p>
                {item.unReadCount > 0 && (
                  <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                    <p className="text-white text-xs text-center">
                      {item.unReadCount}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MessageContent;
