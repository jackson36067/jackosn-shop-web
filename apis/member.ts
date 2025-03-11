import httpInstance from "@/utils/http";

/**
 * 发送验证码请求
 * @param email 验证码
 * @returns
 */
export const sendCodeAPI = (email: string) => {
  return httpInstance({
    method: "POST",
    url: "/member/code",
    data: {
      email,
    },
  });
};

interface EmailLoginParams {
  email: string;
  emailCode: string;
}
interface NicknameLoginParams {
  nickname: string;
  password: string;
}
export const doMemberLoginAPI = (
  data: EmailLoginParams | NicknameLoginParams
) => {
  return httpInstance({
    method: "POST",
    url: "/member/login",
    data,
  });
};
