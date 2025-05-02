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
