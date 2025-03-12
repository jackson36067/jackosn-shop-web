"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

import { useRouter } from "next/navigation";
const TopBar = (props: { title: string }) => {
  const router = useRouter();
  return (
    <div className="w-full px-5">
      <div className="flex justify-between items-center sm:h-12 h-14 w-full">
        <div
          className="flex items-center text-current"
          onClick={() => {
            router.back();
          }}
        >
          <Icon icon="ep:arrow-left" className="mr-1" />
          返回
        </div>
        {/* 主题 */}
        <div className="text-current">{props.title}</div>
        <div>
          <Icon icon={"icon-park-outline:shopping"} className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
export default TopBar;
