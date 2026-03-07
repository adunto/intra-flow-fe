"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { createComment } from "@/dal/comment";

const PostDetailCommentInput = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState<string>("");

  // QueryClient 가져오기
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (comment: string) => createComment(postId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post-comments", postId],
      });
      setComment("");
    },
    onError: () => {
      alert("댓글 작성에 실패했습니다.");
    },
  });

  // 댓글 작성 핸들러
  const handleSubmit = () => {
    if (!comment.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }
    mutate(comment); // Mutation 실행
  };

  return (
    <div className="w-full flex flex-row gap-2 mb-20">
      <Input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full"
        placeholder="댓글을 입력해주세요."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <Button className="self-end" onClick={handleSubmit} disabled={isPending}>
        {isPending ? (
          <>
            <Spinner className="mr-2" />
            댓글 작성 중...
          </>
        ) : (
          "댓글 작성"
        )}
      </Button>
    </div>
  );
};

export default PostDetailCommentInput;
