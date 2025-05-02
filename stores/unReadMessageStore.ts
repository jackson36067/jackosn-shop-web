import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type State = {
  unReadMessageCount: number;
};

type Actions = {
  setUnReadMessageCount: (unReadMessageCount: number) => void;
  clearUnReadMessageCount: () => void;
};

const useUnReadMessageStore = create<State & Actions>()(
  persist(
    (set) => ({
      unReadMessageCount: 0,
      setUnReadMessageCount: (unReadMessageCount: number) =>
        set({
          unReadMessageCount: unReadMessageCount,
        }),
      clearUnReadMessageCount: () =>
        set({
          unReadMessageCount: 0,
        }),
    }),
    {
      name: "unReadMessageCount", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUnReadMessageStore;
