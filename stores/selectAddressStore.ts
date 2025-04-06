import { AddressItem } from "@/types/address";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type State = {
  selectedAddress: AddressItem;
};

type Actions = {
  setSelectedAddress: (address: AddressItem | null) => void;
  clearSelectedAddress: () => void;
};

const useSelectedAddressStore = create<State & Actions>()(
  persist(
    (set) => ({
      selectedAddress: {
        id: 0,
        province: "",
        city: "",
        county: "",
        addressDetail: "",
        isDefault: 1,
        tel: "",
        name: "",
        tag: "",
      },
      setSelectedAddress: (address: AddressItem | null) =>
        set({
          selectedAddress: {
            id: address?.id ?? 0,
            province: address?.province ?? "",
            city: address?.city ?? "",
            county: address?.county ?? "",
            addressDetail: address?.addressDetail ?? "",
            isDefault: address?.isDefault ?? 1,
            tel: address?.tel ?? "",
            name: address?.name ?? "",
            tag: address?.tag ?? "",
          },
        }),
      clearSelectedAddress: () =>
        set({
          selectedAddress: {
            id: 0,
            province: "",
            city: "",
            county: "",
            addressDetail: "",
            isDefault: 1,
            tel: "",
            name: "",
            tag: "",
          },
        }),
    }),
    {
      name: "selectedAddress",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSelectedAddressStore;
