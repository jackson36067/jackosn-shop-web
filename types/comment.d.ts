export type GoodsComment = {
  id: number; // 评论id
  content: string; // 评论内容
  adminContent: string; // 管理员回复内容
  createTime: string; // 评论时间
  userId: number; // 用户id
  nickname: string; // 用户昵称
  avatar: string; // 用户头像
  star: number; // 星级
  hasPicture: boolean; // 是否有图片
  picUrls: string[]; // 评论图片
};

interface CommentCategoryItem {
  title: string;
  value: number;
}

interface GoodsCommentPageResult {
  data: GoodsComment[];
  isRemain: boolean;
}
