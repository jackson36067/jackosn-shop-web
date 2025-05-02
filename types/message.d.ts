export interface MessageThreadItem {
  id: number;
  userId: number; // 发送者id
  receiverId: number; // 接收者id
  storeId: number; // 店铺id, 如果存在那么就是店铺客服发送的消息
  lastMessage: string; // 最后消息内容
  lastMessageTime: string; // 最后消息时间
  name: string; // 发送者名称
  avatar: string; // 发送者头像
  unReadCount: number; // 未读消息数量
}
