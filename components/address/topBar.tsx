"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import AddressDrawerContent from "./AddressDrawerContent";
import { useState } from "react";

const AddressTopBar = (props: {
  getNewMemberAddress: () => void;
  operateStatus: boolean;
  changeOperateStatus: () => void;
  addressSelectedPage: boolean;
}) => {
  // 是否打开新增地址弹窗
  const [open, setOpen] = useState<boolean>(false);
  const handleChangeOperateStatus = () => {
    props.changeOperateStatus();
  };
  return (
    <div className="px-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {props.addressSelectedPage ? (
            <div>常用地址</div>
          ) : (
            <div>
              <Icon
                icon={"stash:arrow-left-light"}
                fontSize={"1.6rem"}
                onClick={() => window.history.back()}
              />
              <p className="font-bold text-xl">收货地址</p>
            </div>
          )}
        </div>
        {props.operateStatus ? (
          <div
            className="flex items-center gap-1 text-orange-600 text-[1.2rem]"
            onClick={() => {
              props.changeOperateStatus();
            }}
          >
            <Icon icon={"qlementine-icons:close-16"} />
            <p>退出管理</p>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-orange-600 text-[1.2rem]">
            <div
              onClick={() => {
                handleChangeOperateStatus();
              }}
              className="flex items-center"
            >
              <Icon icon={"iconamoon:sorting-left-light"} fontSize={"1.6rem"} />
              <p>管理</p>
            </div>
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger>
                <div className="flex items-center">
                  <Icon
                    icon={"material-symbols-light:add-rounded"}
                    fontSize={"1.6rem"}
                  />
                  <p>新增地址</p>
                </div>
              </DrawerTrigger>
              <DrawerContent className="z-[99] pb-2 px-2">
                <DrawerHeader className="pt-0">
                  <DrawerTitle></DrawerTitle>
                  <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <AddressDrawerContent
                  closeDrawer={() => {
                    setOpen(false);
                  }}
                  handleGetNewMemberAddress={() => props.getNewMemberAddress()}
                />
                <DrawerFooter className="h-0"></DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        )}
      </div>
    </div>
  );
};
export default AddressTopBar;
