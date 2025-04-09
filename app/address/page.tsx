"use client";

import { getMemberAddressListAPI } from "@/apis/address";
import AddressContent from "@/components/address/addressContent";
import AddressTopBar from "@/components/address/topBar";
import { AddressItem, AddressSelectedType } from "@/types/address";
import { useEffect, useRef, useState } from "react";

export default function AddressPage(props: {
  addressSelectedPage: boolean;
  selectedAddres: AddressSelectedType | null;
  selectedAddress: (address: AddressSelectedType) => void;
}) {
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
    <div className="py-5 overflow-auto">
      <AddressTopBar
        getNewMemberAddress={() => getAddressList()}
        operateStatus={operateStatus}
        changeOperateStatus={() => setOperateStatus(!operateStatus)}
        addressSelectedPage={props.addressSelectedPage}
      />
      <AddressContent
        memberAddressItems={addressList}
        getNewMemberAddress={() => getAddressList()}
        operateStatus={operateStatus}
        addressSelectedPage={props.addressSelectedPage}
        selectedAddress={(address) => props.selectedAddress(address)}
        onSelectedAddress={props.selectedAddres}
      />
    </div>
  );
}
