import { UpdateMemberInfo } from "@/types/member";
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
/**
 * 登录请求
 * @param data
 * @returns
 */
export const doMemberLoginAPI = (
  data: EmailLoginParams | NicknameLoginParams
) => {
  return httpInstance({
    method: "POST",
    url: "/member/login",
    data,
  });
};

/**
 * 获取用户个人信息
 * @returns
 */
export const getMemberInfoAPI = () => {
  return httpInstance({
    method: "GET",
    url: "/member/info",
  });
};

/**
 * 上传图片接口
 * @param file 图片文件
 * @returns
 */
export const uploadImageAPI = (file: File) => {
  const formData = new FormData();
  formData.append("file", file); // 确保 key 与后端一致
  return httpInstance({
    method: "POST",
    url: "/member/upload",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateMemberInfoAPI = (data: UpdateMemberInfo) => {
  return httpInstance({
    method: "PUT",
    url: "/member/update",
    data,
  });
};
