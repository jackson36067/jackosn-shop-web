"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

const MessageTopBar = () => {
  return (
    <div className="p-3">
      <div className="flex justify-between">
        <p className="text-xl font-bold">消息</p>
        <div>
          <Icon icon={"ant-design:clear-outlined"} fontSize={"1.6rem"} />
        </div>
      </div>
    </div>
  );
};
export default MessageTopBar;
