import type { UserSummary } from "./user";

export interface Comment {
  id: string;
  content: string;
  likeCount: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  user: UserSummary;
  parent?: Comment;
  children?: Comment[];
}
