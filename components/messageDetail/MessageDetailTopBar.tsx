"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

const MessageDetailTopBar = (props: {
  name: string | undefined;
  storeId: number | undefined;
}) => {
  const router = useRouter();
  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer">
          <Icon
            icon={"fluent-mdl2:back"}
            fontSize={"1.2rem"}
            onClick={() => router.back()}
          />
          {/* 店铺名称或者用户名称 */}
          <p className="text-lg">{props.name ? props.name : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* 是否为店铺标记 */}
          {props.storeId && (
            <div className="py-1 px-2 border-[1px] border-gray-300 rounded-lg">
              店铺
            </div>
          )}
          <Icon icon={"icon-park-outline:more"} fontSize={"1.6rem"} />
        </div>
      </div>
    </div>
  );
};
export default MessageDetailTopBar;
