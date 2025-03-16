import { CartGoodItem } from "@/types/cart";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type State = {
  selectedGoods: CartGoodItem[];
};

type Actions = {
  setSelectedGoods: (selectedGoodItems: CartGoodItem[]) => void;
  clearMemberInfo: () => void;
};

const useSelectedGoodsStore = create<State & Actions>()(
  persist(
    (set) => ({
      selectedGoods: [],
      setSelectedGoods: (selectedGoodItems: CartGoodItem[]) =>
        set({
          selectedGoods: selectedGoodItems,
        }),
      clearMemberInfo: () =>
        set({
          selectedGoods: [],
        }),
    }),
    {
      name: "selectedGoods",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSelectedGoodsStore;
