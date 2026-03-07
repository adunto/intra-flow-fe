export interface Comment {
  id: string;
  content: string;
  likeCount: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  userId: number;
  postId: string;
  parent?: Comment;
  children?: Comment[];
}

export type CommentSummary = Pick<
  Comment,
  "id" | "content" | "createdAt" | "updatedAt" | "postId"
>;
