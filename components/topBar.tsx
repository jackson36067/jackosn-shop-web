"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

const CommentTopBar = (props: { totalCommentCount: number }) => {
  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <Icon
          icon={"mdi:keyboard-arrow-left"}
          fontSize={"1.6rem"}
          onClick={() => window.history.back()}
        />
        <p>商品评论({props.totalCommentCount})</p>
        <div></div>
      </div>
    </div>
  );
};

export default CommentTopBar;
