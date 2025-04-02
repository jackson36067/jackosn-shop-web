import httpInstance from "@/utils/http";

export const getMemberAddressListAPI = () => {
  return httpInstance({
    method: "GET",
    url: "/address/list",
  });
};
