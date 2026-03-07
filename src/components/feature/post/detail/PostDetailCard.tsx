"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Clock, ThumbsUp, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import DestructiveAlertDialog from "@/components/common/alert/DestructiveAlertDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyMuted } from "@/components/ui/typography";
import { deletePost, fetchPostDetail } from "@/dal/post";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types/post";
import PostDetailContent from "./PostDetailContent";
import PostOwnerButtons from "./PostOwnerButtons";

const PostDetailCard = ({ postId }: { postId: string }) => {
  const router = useRouter();

  // queryClient 인스턴스
  const queryClient = useQueryClient();

  // 알림창 열림 상태
  const [open, setOpen] = useState<boolean>(false);

  // 게시물 정보 가져오기
  const {
    data: postDetail,
    isPending,
    isError,
  } = useQuery<Post>({
    queryKey: ["post", "detail", postId],
    queryFn: () => fetchPostDetail(postId),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });

  if (isPending) {
    return <Skeleton />;
  }

  // TODO: 데이터가 없을 경우 오류 처리
  if (isError && !postDetail) {
    alert("존재하지 않는 게시물입니다.");
    router.back();
    return;
  }

  let formattedDate: string;

  if (postDetail.updatedAt) {
    const createdAt = formatDate(new Date(postDetail.createdAt));
    const updatedAt = formatDate(new Date(postDetail.updatedAt));
    formattedDate =
      createdAt === updatedAt ? createdAt : `${updatedAt} (수정됨)`;
  } else {
    formattedDate = formatDate(new Date(postDetail.createdAt));
  }

  const handleDelete = async () => {
    try {
      toast.promise(() => deletePost(postId), {
        loading: "게시글 삭제 중...",
        success: "게시글 삭제에 성공했습니다.",
        error: "게시글 삭제에 실패했습니다.",
      });

      router.back();
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["posts", "list"] });
      queryClient.invalidateQueries({ queryKey: ["user", "posts"] });
      queryClient.invalidateQueries({ queryKey: ["user", "comments"] });
    } catch (error) {
      toast.error("게시글 삭제에 실패했습니다.", { position: "bottom-right" });
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="w-full">
      <Card className="w-full">
        {/* 게시물 제목 + 작성자 + 작성일 */}
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
            {postDetail.title}
          </CardTitle>

          <div className="">
            <TypographyMuted>
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-primary/70" />
                {postDetail.user.username}
              </span>
            </TypographyMuted>

            <TypographyMuted>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-primary/70" />
                {formattedDate}
              </span>
            </TypographyMuted>
          </div>
        </CardHeader>

        <Separator className="" />

        {/* 게시물 본문 내용 */}
        <CardContent>
          <PostDetailContent savedJsonData={postDetail.content} />
        </CardContent>

        <CardFooter className="mt-14 w-full flex justify-center">
          <Button variant="outline" className="hover:scale-1.1">
            <ThumbsUp
              size={20}
              className=" hover:text-red-500 transition-colors duration-300"
            />
            좋아요
          </Button>
        </CardFooter>
      </Card>

      <PostOwnerButtons postUserId={postDetail.userId} setOpen={setOpen} />

      {/* 알림창 */}
      <DestructiveAlertDialog
        title="게시물 삭제"
        message="게시물을 삭제하시겠습니까?"
        open={open}
        setOpen={setOpen}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default PostDetailCard;
