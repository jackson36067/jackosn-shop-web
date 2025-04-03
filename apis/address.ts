import { updateAddressItem } from "@/types/address";
import httpInstance from "@/utils/http";

/**
 * 获取用户地址集合
 * @returns
 */
export const getMemberAddressListAPI = () => {
  return httpInstance({
    method: "GET",
    url: "/address/list",
  });
};

/**
 * 根据id获取地址信息
 * @param id addressId
 * @returns
 */
export const getMemberAddressById = (id: number) => {
  return httpInstance({
    method: "GET",
    url: `/address/${id}`,
  });
};

/**
 * 更新用户地址
 * @param updateMemberAddress
 * @returns
 */
export const updateMemberAddressAPI = (
  updateMemberAddress: updateAddressItem
) => {
  return httpInstance({
    method: "POST",
    url: "/address/update",
    data: updateMemberAddress,
  });
};

/**
 * 新增用户地址
 * @param memberAddress
 * @returns
 */
export const addMemberAddressAPI = (memberAddress: updateAddressItem) => {
  return httpInstance({
    method: "POST",
    url: "/address",
    data: memberAddress,
  });
};

/**
 * 根据地址id移除该地址
 * @param id 地址id
 * @returns
 */
export const removeMemberAddressById = (id: number) => {
  return httpInstance({
    method: "DELETE",
    url: `/address/${id}`,
  });
};
