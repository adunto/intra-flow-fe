import { UserSummary } from "./user";

export enum SearchType {
  AUTHOR = 'AUTHOR',
  TITLE = 'TITLE',
  CONTENT = 'CONTENT',
}

export interface Post {
  id: string;
  title: string;
  content: string;
  viewCount: number;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  user: UserSummary;
  userId: number;
  comments: Comment[];
}

export type PostSummary = Omit<Post, "comments" | "content">;

export interface PostListResponse {
  data: PostSummary[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  }
}
