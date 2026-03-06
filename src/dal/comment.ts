import type { Comment } from "@/types/comment";
import { apiProxy } from "./apiProxy";

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

// 댓글 수정
export const updateComment = async (commentId: string, comment: string) => {
  const response = await apiProxy({
    url: `/comments/${commentId}`,
    method: "PUT",
    data: {
      content: comment,
    },
  });

  return response;
};

// 댓글 삭제
export const deleteComment = async (commentId: string) => {
  const response = await apiProxy({
    url: `/comments/${commentId}`,
    method: "DELETE",
  });

  return response;
};
