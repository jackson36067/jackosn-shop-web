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

export interface MessageThreadDetailItem {
  id: number;
  name: string; // 接收者名称
  avatar: string; // 接收者头像
  senderId: number; // 发送者id, 发送者为用户时存在
  receiverId: number; // 接收者id, 接收者为用户时存在
  senderStoreId: number; // 发送者店铺id, 发送者为店铺客服时存在
  receiverStoreId: number; // 店铺id, 如果存在那么接收者是店铺客服
  chatMessageList: MessageItem[]; // 消息列表
}

export interface MessageItem {
  id: number; // 消息id
  userId: number; // 发送者id
  receiverId: number; // 接收者id
  avatar: string; // 发送者头像
  name: string; // 发送者名称
  message: string; // 消息内容
  isRead: boolean; // 是否已读
}

export interface SendeMessageParams {
  id: number; // 消息队列id
  userId: number; // 发送者id
  receiverId: number; // 接收者id
  message: string; // 消息内容
  receiverStoreId: number | undefined; // 接收者店铺id, 如果存在那么接收者是店铺客服
  senderStoreId: number | undefined; // 发送者店铺id, 发送者为店铺客服时存在
  name: string; // 发送者名称
  avatar: string; // 发送者头像
}
