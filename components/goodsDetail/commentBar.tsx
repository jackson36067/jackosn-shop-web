"use client";

import { cn } from "@/lib/utils";
import { CommentCategoryItem } from "@/types/comment";
import { useEffect, useState } from "react";

const CommentBar = (props: {
  commentCategoryList: CommentCategoryItem[];
  className?: string;
  type: number;
  changeCommentType?: (type: number) => void;
}) => {
  const [type, setType] = useState<number>(0);
  useEffect(() => {
    setType(type);
  }, [type]);
  const handleSelectCommentType = (type: number) => {
    if (window.location.pathname.startsWith("/goodsDetail")) {
      return;
    }
    setType(type);
    props.changeCommentType?.(type);
  };
  return (
    <div
      className={cn(
        "flex items-center gap-4 mt-5 text-[0.9rem] text-orange-600",
        props.className
      )}
    >
      {props.commentCategoryList.map((item, index) => {
        return (
          <div
            key={index}
            className={cn(
              "bg-[#f8e3e0]/90 p-1 rounded-md",
              window.location.pathname.startsWith("/comment") &&
                type === item.value &&
                "border-[1px] border-orange-600"
            )}
            onClick={() => handleSelectCommentType(item.value)}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default CommentBar;
