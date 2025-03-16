import useMemberStore from "@/stores/MemberStore";
import axios from "axios";
import { toast } from "sonner";

const httpInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 5000,
});

// ✅ 封装跳转登录页逻辑
const redirectToLogin = () => {
  window.location.href = "/login";
};

httpInstance.interceptors.request.use(
  (config) => {
    const urls = ["/member/code", "/member/login", "/category/list"];
    if (!urls.includes(config.url!)) {
      const token: string = useMemberStore.getState().memberInfo.token || "";
      if (token) {
        config.headers.Authorization = token;
      } else {
        redirectToLogin();
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpInstance.interceptors.response.use(
  (config) => {
    return config.data;
  },
  (error) => {
    if (error.status === 401) {
      useMemberStore.getState().clearMemberInfo();
      // 这个路径下报401不需要到登录页
      const urls = ["/cart/list", "/cart/count"];
      if (!urls.includes(error.config.url)) {
        redirectToLogin();
      }
    }
    const errorMsg: string = error.response.data.message || "请求失败";
    toast.error(errorMsg);
    return Promise.reject(error);
  }
);

export default httpInstance;
