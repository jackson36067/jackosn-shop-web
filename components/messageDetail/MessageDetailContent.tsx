"use client";

import { cn } from "@/lib/utils";
import useMemberStore from "@/stores/MemberStore";
import { MessageItem } from "@/types/message";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";

// Define the Props type
type Props = {
  className?: string;
  messageList: MessageItem[] | undefined;
  storeId: number | undefined;
};

export const MessageDetailContent = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { memberInfo } = useMemberStore();
    const router = useRouter();
    return (
      <div className={cn("px-3", props.className)} ref={ref}>
        <div className="flex flex-col gap-2 w-full">
          {props.messageList?.map((item, index) => {
            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col w-full",
                  item.userId === memberInfo.id ? "items-end" : "items-start"
                )}
              >
                <div
                  className={cn(
                    "flex gap-2 items-start",
                    item.userId === memberInfo.id && "flex-row-reverse"
                  )}
                >
                  {/* 头像 */}
                  <div
                    onClick={() => {
                      if (props.storeId)
                        router.push(`/store?id=${props.storeId}`);
                    }}
                  >
                    <Image
                      src={item.avatar}
                      alt=""
                      width={50}
                      height={50}
                      className="rounded-md w-8 h-8"
                    />
                  </div>
                  <div
                    className={cn(
                      "flex flex-col items-start gap-1",
                      item.userId === memberInfo.id && "items-end"
                    )}
                  >
                    {/* 用户名称 */}
                    <p className="text-sm text-gray-400">{item.name}</p>
                    {/* 信息内容 */}
                    <div
                      className={cn(
                        "p-2 rounded-md",
                        item.userId === memberInfo.id
                          ? "bg-orange-500 text-white"
                          : "bg-white"
                      )}
                    >
                      {item.message}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
MessageDetailContent.displayName = "MessageDetailContent";
