"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Virtuoso } from "react-virtuoso";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2 } from "@/components/ui/typography";
import { getUserPosts } from "@/dal/user";
import type { PostSummary } from "@/types/post";

const UserPosts = () => {
  const {
    data: posts,
    isLoading,
    isError,
    refetch,
  } = useQuery<PostSummary[]>({
    queryKey: ["user", "posts"],
    queryFn: getUserPosts,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="w-full max-w-5xl max-h-96 overflow-auto mt-4 flex gap-4 flex-col">
      <TypographyH2>작성글</TypographyH2>

      {/* 로딩 처리 */}
      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={`user-post-${i}`}
              className="h-14 w-full rounded-md"
            />
          ))}
        </div>
      )}

      {/* 에러 처리 */}
      {isError && (
        <div className="py-10 text-center text-red-500">
          작성한 글을 불러오는 데 실패했습니다.
          <Button onClick={() => refetch()}>다시 시도</Button>
        </div>
      )}

      {/* 데이터 없음 처리 */}
      {!isLoading && !isError && posts?.length === 0 && (
        <div className="rounded-md border border-dashed py-10 text-center text-muted-foreground">
          작성한 게시글이 없습니다.
        </div>
      )}

      {/* 사용자 게시물 리스트 */}
      {posts && posts.length > 0 && (
        // Virtuoso 최대 높이 설정 필수
        <div className="h-96 w-full rounded-md border p-2">
          <Virtuoso
            style={{ height: "100%" }}
            data={posts}
            totalCount={posts.length}
            itemContent={(index, post) => (
              <div className="pb-2">
                {" "}
                {/* 리스트 아이템 간 간격용 래퍼 */}
                <Link
                  href={`/post/detail/${post.id}`}
                  className="block rounded-md border bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium truncate">{post.title}</span>
                  </div>
                </Link>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default UserPosts;
