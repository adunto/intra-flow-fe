import { cache } from "react";
import type {
  CreatePostDto,
  Post,
  PostListResponse,
  SearchType,
  UpdatePostDto,
} from "@/types/post";
import { apiProxy } from "./proxy";

export const fetchPosts = async (
  searchKeyword?: string,
  searchType?: SearchType[],
  page?: number,
) => {
  let response;

  // 검색이 아닌 경우 전체 게시물 조회
  if (searchKeyword?.length === 0) {
    response = await apiProxy<PostListResponse>({
      url: "/posts",
      method: "GET",
      params: {
        page: page,
      },
    });
  } else {
    console.log(searchType);
    response = await apiProxy<PostListResponse>({
      url: "/posts/search",
      method: "GET",
      params: {
        searchType: searchType?.join(","),
        searchItem: searchKeyword,
        page: page,
      },
    });
  }

  return response;
};

// 게시물 상세 조회
export const fetchPostDetail = cache(async (postId: string) => {
  const response = await apiProxy<Post>({
    url: `/posts/${postId}`,
    method: "GET",
  });

  return response;
});

// 게시물 작성
export const createPost = async (createPostDto: CreatePostDto) => {
  const response = await apiProxy<Post>({
    url: "/posts",
    method: "POST",
    data: createPostDto,
  });

  return response;
};

// 게시물 수정
export const updatePost = async (postId: string, updatePostDto: UpdatePostDto) => {
  const response = await apiProxy<Post>({
    url: `/posts/${postId}`,
    method: "PUT",
    data: updatePostDto,
  });

  return response;
};

// 게시물 삭제
export const deletePost = async (postId: string) => {
  const response = await apiProxy({
    url: `/posts/${postId}`,
    method: "DELETE",
  });

  return response;
};