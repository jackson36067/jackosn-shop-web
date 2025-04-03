"use client";

import { getMemberAddressListAPI } from "@/apis/address";
import AddressContent from "@/components/address/addressContent";
import AddressTopBar from "@/components/address/topBar";
import { AddressItem } from "@/types/address";
import { useEffect, useRef, useState } from "react";

export default function AddressPage() {
  const [addressList, setAddressList] = useState<AddressItem[]>([]);
  const [operateStatus, setOperateStatus] = useState<boolean>(false);
  const isFetch = useRef<boolean>(false);
  const getAddressList = async () => {
    const res = await getMemberAddressListAPI();
    setAddressList(res.data);
  };
  useEffect(() => {
    if (isFetch.current) return;
    isFetch.current = true;
    getAddressList();
  }, []);
  return (
    <div className="py-5 px-3">
      <AddressTopBar
        getNewMemberAddress={() => getAddressList()}
        operateStatus={operateStatus}
        changeOperateStatus={() => setOperateStatus(!operateStatus)}
      />
      <AddressContent
        memberAddressItems={addressList}
        getNewMemberAddress={() => getAddressList()}
        operateStatus={operateStatus}
      />
    </div>
  );
}
