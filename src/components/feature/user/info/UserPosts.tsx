"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { TypographyH2 } from "@/components/ui/typography";
import { getUserPosts } from "@/dal/user";
import { useAuthStore } from "@/stores/useAuthStore";

const UserPosts = () => {
  const { user } = useAuthStore();

  // 유저 아이디로 게시글 목록 가져오기
  const { data: posts } = useQuery({
    queryKey: ["user-posts", user?.id],
    queryFn: () => getUserPosts(),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });

  return (
    <div className="w-full max-w-5xl mt-4 flex gap-4 flex-col">
      <TypographyH2>작성글</TypographyH2>
      {posts?.map((post) => (
        <Link
          key={post.id}
          href={`/post/detail/${post.id}`}
          className="p-4 rounded-md border hover:bg-muted transition-colors block"
        >
          {post.title}
        </Link>
      ))}
    </div>
  );
};

export default UserPosts;
