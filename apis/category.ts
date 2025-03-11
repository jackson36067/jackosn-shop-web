import httpInstance from "@/utils/http";

export const getCategoryListAPI = () => {
  return httpInstance({
    method: "GET",
    url: "/category/list",
  });
};
