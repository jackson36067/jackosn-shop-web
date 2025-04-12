"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "../ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

const OrderTopBar = () => {
  return (
    <div className="fixed top-0 left-0 flex items-center gap-3 p-3 w-full bg-white">
      <Icon
        icon={"material-symbols:keyboard-arrow-left"}
        fontSize={"1.6rem"}
        onClick={() => (window.location.href = "/my")}
      />
      {/* 搜索框 */}
      <div className="flex-1 relative">
        <Icon
          icon={"material-symbols:search-rounded"}
          className="absolute top-2 left-2 text-gray-500"
          fontSize={"1.5rem"}
        />
        <Input
          placeholder="搜索订单"
          className="bg-gray-200 py-2 pl-10 text-gray-500"
        />
      </div>
      <Drawer>
        <DrawerTrigger>
          {/* 筛选图标 */}
          <Icon icon={"clarity:filter-line"} fontSize={"1.6rem"} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default OrderTopBar;
