"use client";

import dynamic from "next/dynamic";

const AddressView = dynamic(() => import("@/components/address/addressView"), {
  ssr: false, // 禁用服务端渲染
});

export default function AddressPage() {
  return (
    <AddressView
      addressSelectedPage={false}
      selectedAddres={null}
      selectedAddress={(addr) => {
        console.log("选择了地址", addr);
      }}
    />
  );
}
