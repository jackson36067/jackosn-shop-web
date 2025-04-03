"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import AddressDrawerCoantent from "./AddressDrawerContent";
import { useState } from "react";

const AddressTopBar = (props: { getNewMemberAddress: () => void }) => {
  // 是否打开新增地址弹窗
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Icon
            icon={"stash:arrow-left-light"}
            fontSize={"1.6rem"}
            onClick={() => window.history.back()}
          />
          <p className="font-bold text-xl">收货地址</p>
        </div>
        <div className="flex items-center gap-3 text-orange-600 text-[1.2rem]">
          <div className="flex items-center">
            <Icon icon={"iconamoon:sorting-left-light"} fontSize={"1.6rem"} />
            <p>管理</p>
          </div>
          <div className="flex items-center">
            <Icon
              icon={"material-symbols-light:add-rounded"}
              fontSize={"1.6rem"}
            />
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger>
                <p>新增地址</p>
              </DrawerTrigger>
              <DrawerContent className="z-[99] pb-30 px-2">
                <DrawerHeader className="pt-0">
                  <DrawerTitle></DrawerTitle>
                  <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <AddressDrawerCoantent
                  closeDrawer={() => {
                    setOpen(false);
                  }}
                  handleGetNewMemberAddress={() => props.getNewMemberAddress()}
                />
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddressTopBar;
