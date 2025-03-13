"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const router = useRouter();
  return (
    <div className="px-3">
      <div className="flex justify-between items-center py-4 text-white">
        <div
          onClick={() => {
            router.back();
          }}
        >
          <Icon icon="ep:arrow-left" />
        </div>
        <div>个人信息</div>
        {/* 用于页面表现 */}
        <div></div>
      </div>
    </div>
  );
};
export default TopBar;
