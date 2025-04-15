import { CartGoodItem } from "@/types/cart";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type State = {
  selectedGoods: CartGoodItem[];
};

type Actions = {
  setSelectedGoods: (selectedGoodItems: CartGoodItem[]) => void;
  clearSelectedGoods: () => void;
  removeSelectedGoods: (idList: number[]) => void;
};
const useSelectedGoodsStore = create<State & Actions>()(
  persist(
    (set) => ({
      selectedGoods: [],
      setSelectedGoods: (selectedGoodItems: CartGoodItem[]) =>
        set({
          selectedGoods: selectedGoodItems,
        }),
      clearSelectedGoods: () =>
        set({
          selectedGoods: [],
        }),
      removeSelectedGoods: (idList: number[]) =>
        set((state) => ({
          selectedGoods: state.selectedGoods.filter(
            (item) => !idList.includes(item.id) // 使用 filter 去除 idList 中的 id
          ),
        })),
    }),
    {
      name: "selectedGoods",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSelectedGoodsStore;
