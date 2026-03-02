import type { Comment } from "@/types/comment";
import { apiProxy } from "./proxy";

// 게시물 댓글 조회
export const fetchPostComments = async (postId: string): Promise<Comment[]> => {
  const response = await apiProxy<Comment[]>({
    url: `/posts/${postId}/comments`,
    method: "GET",
  });

  return response;
};

// 댓글 작성
export const createComment = async (
  postId: string,
  comment: string,
  parentId?: string,
) => {
  const response = await apiProxy({
    url: `/posts/${postId}/comments`,
    method: "POST",
    data: {
      content: comment,
    },
  });

  return response;
};
