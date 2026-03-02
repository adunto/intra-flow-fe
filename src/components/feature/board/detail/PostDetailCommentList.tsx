"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { fetchPostComments } from "@/dal/comment";
import type { Comment } from "@/types/comment";

const PostDetailCommentList = ({ postId }: { postId: string }) => {
  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ["post-comments", postId],
    queryFn: () => fetchPostComments(postId),
  });

  if (isLoading) return <Loader2 className="animate-spin" />;

  return (
    <div className="space-y-4 mt-4">
      {comments?.map((comment: Comment) => (
        <div key={comment.id} className="border p-4 rounded">
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostDetailCommentList;
