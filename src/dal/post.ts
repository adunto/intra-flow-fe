import type { PostListResponse, SearchType } from "@/types/post";
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
    response = await apiProxy<PostListResponse>({
      url: "/posts/search",
      method: "GET",
      params: {
        searchType: searchType?.join(", "),
        searchItem: searchKeyword,
        page: page,
      },
    });
  }

  return response;
};
