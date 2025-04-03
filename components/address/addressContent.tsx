"use client";

import { AddressItem } from "@/types/address";
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
import { useRef, useState } from "react";

const AddressContent = (props: {
  memberAddressItems: AddressItem[]; // 接收父组件传递的地址列表
  getNewMemberAddress: () => void; // 用户子组件从新获取地址信息,执行父组件的函数从新加载地址信息
}) => {
  // 是否打开更新地址弹窗
  const [open, setOpen] = useState<number>(0);
  /* 以下的数据都是为了传递给子组件 */
  // 省份
  const province = useRef<string>("");
  // 市
  const city = useRef<string>("");
  // 区/县
  const county = useRef<string>("");
  // 详细地址
  const addressDetail = useRef<string>("");
  // 该地址是否为默认地址
  const isDefault = useRef<number>(1);
  // 电话
  const tel = useRef<string>("");
  // 收货人
  const name = useRef<string>("");
  // 地址标签
  const tag = useRef<string>("");
  // 点击地址更新图标后,获取到该地址的信息传递给子组件
  const handelUpdateAddress = (id: number) => {
    const updateAddressInfo = props.memberAddressItems.find(
      (item) => item.id === id
    );
    province.current = updateAddressInfo!.province;
    city.current = updateAddressInfo!.city;
    county.current = updateAddressInfo!.county;
    addressDetail.current = updateAddressInfo!.addressDetail;
    isDefault.current = updateAddressInfo!.isDefault;
    tel.current = updateAddressInfo!.tel;
    name.current = updateAddressInfo!.name;
    tag.current = updateAddressInfo!.tag;
  };
  return (
    <div>
      <div>
        {props.memberAddressItems.map((item) => {
          return (
            <div
              className="flex justify-between items-center mt-3 py-4 border-b-[1px] border-gray-300 last:border-none"
              key={item.id}
            >
              <div className="flex flex-col gap-2 justify-center">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <p>{item.province}</p>
                  <p>{item.city}</p>
                  <p>{item.county}</p>
                </div>
                <p className="text-xl font-bold w-50 truncate">
                  {item.addressDetail}
                </p>
                <div className="flex gap-2 items-center">
                  <p>{item.name}</p>
                  <p>{item.tel}</p>
                  {item.isDefault === 0 && (
                    <p className="bg-[#ffece5]/90 text-orange-600 p-1 font-[600]">
                      默认
                    </p>
                  )}
                  {item.tag && (
                    <p className="bg-[#ffece5]/90 text-orange-600 p-1 font-[600]">
                      {item.tag}
                    </p>
                  )}
                </div>
              </div>
              <Drawer
                open={open === item.id}
                onOpenChange={(open) => {
                  if (open) {
                    setOpen(item.id);
                  } else {
                    setOpen(0);
                  }
                }}
              >
                <DrawerTrigger>
                  <div className="text-gray-400">
                    <Icon
                      icon={"icon-park-outline:editor"}
                      fontSize={"1.6rem"}
                      onClick={() => handelUpdateAddress(item.id)}
                    />
                  </div>
                </DrawerTrigger>
                <DrawerContent className="z-[99] pb-30 h-full px-2">
                  <DrawerHeader className="pt-0">
                    <DrawerTitle className="text-center"></DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                  </DrawerHeader>
                  <AddressDrawerCoantent
                    id={item.id}
                    province={province.current}
                    city={city.current}
                    county={county.current}
                    addressDetail={addressDetail.current}
                    name={name.current}
                    tel={tel.current}
                    tag={tag.current}
                    isDefault={isDefault.current}
                    closeDrawer={() => {
                      setOpen(0);
                    }}
                    handleGetNewMemberAddress={() =>
                      props.getNewMemberAddress()
                    }
                  />
                </DrawerContent>
              </Drawer>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AddressContent;
