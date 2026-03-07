import type { CommentSummary } from "@/types/comment";
import type { PostSummary } from "@/types/post";
import type { User } from "@/types/user";
import { apiProxy } from "./apiProxy";

// 사용자 정보 조회
export const getUserInfo = async (): Promise<User> => {
  const response = await apiProxy<User>({
    url: "/users/profile",
    method: "GET",
    withCredentials: true,
  });

  return response;
};

// 사용자 작성 게시물 조회
export const getUserPosts = async (): Promise<PostSummary[]> => {
  const response = await apiProxy<PostSummary[]>({
    url: `/users/posts`,
    method: "GET",
    withCredentials: true,
  });

  return response;
};

// 사용자 작성 댓글 조회
export const getUserComments = async (): Promise<CommentSummary[]> => {
  const response = await apiProxy<CommentSummary[]>({
    url: `/users/comments`,
    method: "GET",
    withCredentials: true,
  });

  return response;
};
