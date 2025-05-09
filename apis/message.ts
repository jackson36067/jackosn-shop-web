import { SendeMessageParams } from "@/types/message";
import httpInstance from "@/utils/http";

/**
 * 获取未读消息数量
 * @returns
 */
export const getMemberUnReadMessageCountAPI = () => {
  return httpInstance({
    method: "GET",
    url: "/message/unRead",
  });
};

/**
 * 获取消息列表
 * @returns
 */
export const getMemberChatMessageThreadListAPI = () => {
  return httpInstance({
    method: "GET",
    url: "/message/thread/list",
  });
};

/**
 * 获取消息详情
 * @param id 消息队列id
 * @returns
 */
export const getMemberChatMessageThreadDetailAPI = (id: number) => {
  return httpInstance({
    method: "GET",
    url: `/message/${id}`,
  });
};

/**
 * 发送消息
 * @param data 消息删除对象
 * @returns
 */
export const sendMessageAPI = (data: SendeMessageParams) => {
  return httpInstance({
    method: "POST",
    url: "/message/send",
    data,
  });
};
