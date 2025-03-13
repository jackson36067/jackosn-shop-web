export type MemberInfo = {
  id?: number;
  nickname?: string;
  avatar?: string;
  token?: string;
  gender?: 0 | 1;
  birthday?: string;
  email?: string;
  mobile?: string;
};

export type MemberUpdateInfo = {
  id: number;
  nickname: string;
  avatar: string;
  gender: 0 | 1;
  birthday: string;
};

export type UpdateMemberInfo = {
  id: number;
  nickname: string;
  avatar: string;
  gender: 0 | 1;
  birthday: string;
  password: string;
  mobile: string;
  email: string;
};
