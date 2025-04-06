"use client";
import { GoodsComment } from "@/types/comment";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import StarRating from "./starRating";

const CommentContent = (props: { goodsCommentItems: GoodsComment[] }) => {
  return (
    <div className="px-3 mt-8">
      {props.goodsCommentItems.length > 0 ? (
        <div>
          {props.goodsCommentItems.map((item) => {
            return (
              <div
                key={item.id}
                className="mt-5 py-4 first:mt-0 border-b-[1px] border-b-gray-300 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  {/* 用户头像以及用户昵称 */}
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={item.avatar}
                        alt=""
                        className="w-full h-full rounded-sm"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="w-17 truncate text-lg text-gray-500">
                      {item.nickname}
                    </p>
                    <StarRating rating={item.star} />
                  </div>
                  <div className="text-gray-500">{item.createTime}</div>
                </div>
                <div className="mt-3">{item.content}</div>
                <div>
                  {item.hasPicture && (
                    <div className="flex items-center gap-2 mt-3">
                      {item.picUrls.map((url: string) => {
                        return (
                          <Image
                            key={url}
                            src={url}
                            alt=""
                            width={50}
                            height={50}
                            className="w-20 h-20 rounded-md"
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
                {item.adminContent && <p>{item.adminContent}</p>}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-8 text-lg text-center text-black">
          该商品还没有评论哦,快来评论吧
        </p>
      )}
    </div>
  );
};

export default CommentContent;
