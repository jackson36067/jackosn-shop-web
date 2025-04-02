"use client";

import { AddressItem } from "@/types/address";
import { Icon } from "@iconify/react/dist/iconify.js";

const AddressContent = (props: { memberAddressItems: AddressItem[] }) => {
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
                <p className="text-xl font-bold">{item.addressDetail}</p>
                <div className="flex gap-2 items-center">
                  <p>{item.name}</p>
                  <p>{item.tel}</p>
                  {item.isDefault === 0 && (
                    <p className="bg-[#ffece5]/90 text-orange-600 p-1">默认</p>
                  )}
                  {item.tag && (
                    <p className="bg-[#ffece5]/90 text-orange-600 p-1">
                      {item.tag}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-gray-400">
                <Icon icon={"icon-park-outline:editor"} fontSize={"1.6rem"} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AddressContent;
