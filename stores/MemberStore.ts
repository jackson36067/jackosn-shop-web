import { MemberInfo } from "@/types/member";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type State = {
  memberInfo: MemberInfo;
};

type Actions = {
  setMemberInfo: (member: MemberInfo) => void;
  clearMemberInfo: () => void;
  updateMemberEmail: (email: string) => void;
};

const useMemberStore = create<State & Actions>()(
  persist(
    (set) => ({
      memberInfo: {
        id: 0,
        nickname: "",
        avatar: "",
        token: "",
        gender: 0,
        birthday: "",
        email: "",
        mobile: "",
      },
      setMemberInfo: (member: MemberInfo) =>
        set({
          memberInfo: {
            id: member.id,
            nickname: member.nickname,
            avatar: member.avatar,
            token: member.token,
            gender: member.gender,
            birthday: member.birthday,
            email: member.email,
            mobile: member.mobile,
          },
        }),
      updateMemberEmail: (email: string) =>
        set((state) => ({
          memberInfo: {
            ...state.memberInfo,
            email: email,
          },
        })),
      clearMemberInfo: () =>
        set({
          memberInfo: {
            id: 0,
            nickname: "",
            avatar: "",
            token: "",
            gender: 0,
            birthday: "",
            email: "",
            mobile: "",
          },
        }),
    }),
    {
      name: "member",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useMemberStore;
