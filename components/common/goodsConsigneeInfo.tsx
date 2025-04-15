"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

const GoodsConsigneeInfo = (props: {
  consignee: string | undefined;
  mobile: string | undefined;
  address: string | undefined;
}) => {
  return (
    <div className="flex gap-2">
      <Icon icon={"mynaui:location"} fontSize={"1.6rem"} />
      <div className="font-[600]">
        <p className="max-w-65 truncate">{props.address}</p>
        <p className="text-sm text-gray-500 font-medium">
          {props.consignee} {props.mobile}
        </p>
      </div>
    </div>
  );
};
export default GoodsConsigneeInfo;
