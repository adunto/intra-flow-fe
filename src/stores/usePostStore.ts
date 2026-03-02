import { create } from "zustand";
import type { PostListResponse, SearchType } from "@/types/post";

interface PostStore {
  searchKeyword: string; // 검색어
  searchType: SearchType[]; // 검색 범위
  posts: PostListResponse; // 게시물 리스트 (결과)
  currentPagination: number; // 현재 페이지

  setPosts: (posts: PostListResponse) => void;
  setSearchKeyword: (keyword: string) => void;
  setSearchType: (types: SearchType[]) => void;
  setCurrentPagination: (page: number) => void;
}

export const usePostStore = create<PostStore>((set, get) => ({
  searchKeyword: "",
  searchType: [],
  posts: {
    data: [],
    meta: {
      total: 0,
      page: 1,
      lastPage: 1,
    },
  },
  currentPagination: 1,

  setPosts: (posts) => set({ posts }),
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
  setSearchType: (types) => set({ searchType: types }),
  setCurrentPagination: (page) => {
    const { posts } = get();
    if (page < 1 || page > posts.meta.lastPage) {
      set({ currentPagination: 1 });
    } else {
      set({ currentPagination: page });
    }
  },
}));
