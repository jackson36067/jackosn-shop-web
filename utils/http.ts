import useMemberStore from "@/stores/MemberStore";
import axios from "axios";
import { toast } from "sonner";

const httpInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 5000,
});

httpInstance.interceptors.request.use(
  (config) => {
    const urls = ["/member/code", "/member/login", "/category/list"];
    if (!urls.includes(config.url!)) {
      const token: string = useMemberStore.getState().memberInfo.token || "";
      if (token) {
        config.headers.Authorization = token;
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
      return;
    }
    const errorMsg: string = error.response.data.message || "请求失败";
    toast.error(errorMsg);
    return Promise.reject(error);
  }
);

export default httpInstance;
