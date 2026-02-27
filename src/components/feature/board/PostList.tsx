import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/dal/post";
import { usePostStore } from "@/stores/usePostStore";

import PostItem from "./PostItem";
import PostListPagination from "./PostListPagination";

const PostList = () => {
  const { searchKeyword, searchType, setPosts, currentPagination } =
    usePostStore();

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts", searchKeyword, currentPagination],
    queryFn: async () => {
      const response = await fetchPosts(
        searchKeyword,
        searchType,
        currentPagination,
      );
      setPosts(response);
      return response;
    },
    staleTime: 30 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return (
    <div className="w-full mt-4">
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <p className="animate-pulse text-muted-foreground">
            게시물을 불러오는 중입니다...
          </p>
        </div>
      )}

      {isError && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-center">
          <p>오류가 발생했습니다: {error.message}</p>
        </div>
      )}

      {posts?.data.length === 0 && !isLoading && (
        <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-xl">
          <p>검색 결과가 없습니다.</p>
        </div>
      )}

      {posts && posts.data.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-6">
            {posts.data.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
          <PostListPagination
            total={posts.meta.total}
            page={posts.meta.page}
            lastPage={posts.meta.lastPage}
          />
        </div>
      )}
    </div>
  );
};

export default PostList;
