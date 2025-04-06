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
import AddressDrawerContent from "./AddressDrawerContent";
import { useEffect, useRef, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import {
  removeMemberAddressById,
  updateMemberAddressAPI,
} from "@/apis/address";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import useSelectedAddressStore from "@/stores/selectAddressStore";

const AddressContent = (props: {
  memberAddressItems: AddressItem[]; // 接收父组件传递的地址列表
  getNewMemberAddress: () => void; // 用户子组件从新获取地址信息,执行父组件的函数从新加载地址信息
  operateStatus: boolean;
  addressSelectedPage: boolean; // 是否为地址选择页面
  selectedAddress: (address: AddressItem) => void;
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

  // 下面两个都是在商品详情页选择地址时使用
  // 用户选中的地址
  const { selectedAddress } = useSelectedAddressStore();
  // 用户点击的地址,用于交互,当点击后就将该数据传递给父组件
  const [selectAddress, setSelectAddress] = useState<AddressItem | null>(null);

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

  // 更改地址是否为默认地址
  const handleUpdateAddressDefault = async (checked: boolean, id: number) => {
    const isDefault = checked ? 0 : 1;
    await updateMemberAddressAPI({ addressId: id, isDefault: isDefault });
    props.getNewMemberAddress();
    toast.success("设置成功");
  };

  // 根据地址id移除该地址
  const handelRemoveAddress = async (id: number) => {
    await removeMemberAddressById(id);
    props.getNewMemberAddress();
    toast.success("移除成功");
  };

  // 这些交互都是在商品详情页选择地址使执行

  // 设置默认地址id
  useEffect(() => {
    // 判断传递的地址以及是否有之前就选中的地址, 有地址以及没有选中地址就拿默认地址或者第一个地址
    if (
      props.addressSelectedPage &&
      props.memberAddressItems.length > 0 &&
      !selectedAddress.province
    ) {
      // 如果地址列表不为空,则设置默认地址为选中地址
      const defaultAddress = props.memberAddressItems.find(
        (item) => item.isDefault === 0
      );
      if (defaultAddress) {
        // 有默认地址,则设置默认地址为选中地址
        setSelectAddress(defaultAddress);
      } else {
        // 没有默认地址,则设置第一个地址为默认地址
        setSelectAddress(props.memberAddressItems[0]);
      }
    } else if (selectedAddress.province) {
      // 如果有默认地址就选默认地址
      setSelectAddress(selectedAddress);
    }
  }, [
    props.addressSelectedPage,
    props.memberAddressItems,
    selectedAddress,
    selectedAddress.province,
    setSelectAddress,
  ]);

  // 点击地址后,将地址信息传递给父组件
  const handleSelectAddress = (item: AddressItem) => {
    if (props.addressSelectedPage) {
      setSelectAddress(item);
      props.selectedAddress(item);
    }
  };

  return (
    <div>
      {props.memberAddressItems.map((item) => {
        return (
          <div
            key={item.id}
            className={cn(
              props.addressSelectedPage &&
                selectAddress?.id === item.id &&
                "bg-[#f8e3e0]/90"
            )}
            onClick={() => handleSelectAddress(item)}
          >
            <div
              key={item.id}
              className={
                "px-3 border-b-[1px] border-b-gray-300 last:border-b-0"
              }
            >
              <div className="flex flex-col mt-3 py-4" key={item.id}>
                <div className="flex justify-between items-center">
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
                      {item.isDefault === 0 && !props.addressSelectedPage && (
                        <p className="bg-[#ffece5]/90 text-orange-600 p-1 font-[600]">
                          默认
                        </p>
                      )}
                      {item.tag && !props.addressSelectedPage && (
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
                          icon={"solar:pen-new-square-linear"}
                          fontSize={"1.6rem"}
                          onClick={() => handelUpdateAddress(item.id)}
                        />
                      </div>
                    </DrawerTrigger>
                    <DrawerContent className="z-[99] pb-2 px-2">
                      <DrawerHeader className="pt-0">
                        <DrawerTitle className="text-center"></DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                      </DrawerHeader>
                      <AddressDrawerContent
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
                {props.operateStatus && (
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-1">
                      <Checkbox
                        checked={item.isDefault === 0}
                        onCheckedChange={(checked) =>
                          handleUpdateAddressDefault(checked === true, item.id)
                        }
                        className="rounded-full w-5 h-5 border-[1px] border-gray-400 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                      />
                      <p className="text-gray-400">默认</p>
                    </div>
                    <div>
                      <Button
                        className="text-black bg-gray-200"
                        onClick={() => handelRemoveAddress(item.id)}
                      >
                        删除
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default AddressContent;
