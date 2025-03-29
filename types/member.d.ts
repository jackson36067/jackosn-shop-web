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
  nickname?: string;
  avatar?: string;
  gender?: 0 | 1;
  birthday?: string;
  mobile?: string;
  email?: string;
};

export type updatePasswordObject = {
  password: string;
  newPassword: string;
};

export type updateEmailObject = {
  code: string;
  newEmail: string;
};
