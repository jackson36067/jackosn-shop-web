"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

const MessageDetailTopBar = () => {
  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <Icon
            icon={"si:arrow-left-duotone"}
            fontSize={"1.6rem"}
            onClick={() => window.history.back()}
          />
          {/* 店铺名称或者用户名称 */}
          <p></p>
        </div>
        <div className="flex items-center gap-2">
          {/* 是否为店铺标记 */}
          <div></div>
          <Icon icon={"icon-park-outline:more"} fontSize={"1.6rem"} />
        </div>
      </div>
    </div>
  );
};
export default MessageDetailTopBar;
