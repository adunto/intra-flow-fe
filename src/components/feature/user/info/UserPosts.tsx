"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TypographyH2 } from "@/components/ui/typography";
import { getUserPosts } from "@/dal/user";
import type { PostSummary } from "@/types/post";

const UserPosts = () => {
  const [posts, setPosts] = useState<PostSummary[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getUserPosts();
      setPosts(res);
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full max-w-5xl max-h-96 overflow-auto mt-4 flex gap-4 flex-col">
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
