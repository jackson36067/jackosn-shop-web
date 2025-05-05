"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

export const MessageDetailBottomBar = (props: {
  className?: string;
  changeShowEmojiPicker: () => void;
  message: string;
  isInput: boolean;
  handleInput: (value: string) => void;
}) => {
  return (
    <div className={cn("p-3", props.className)}>
      <div className="relative">
        <input
          type="text"
          className="border-[1px] bg-white w-full rounded-md py-2 px-2 border-gray-200"
          placeholder="发送消息"
          value={props.message}
          onChange={(e) => props.handleInput(e.target.value)}
        />
        <div
          className={cn(
            "absolute right-2 top-2",
            props.isInput &&
              "top-1 py-1 px-3 bg-orange-500 rounded-xl transition-all duration-300 ease-in-out"
          )}
        >
          <Icon
            icon={"majesticons:send-line"}
            fontSize={"1.6rem"}
            className={cn(props.isInput && "text-white")}
          />
        </div>
        <Icon
          icon={"mdi:emoji-outline"}
          fontSize={"1.6rem"}
          className={cn(
            "absolute right-12 top-2",
            props.isInput && "right-16 transition-all duration-300 ease-in-out"
          )}
          onClick={() => props.changeShowEmojiPicker()}
        />
      </div>
    </div>
  );
};
