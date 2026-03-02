"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar, Eye, ThumbsUp, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyMuted, TypographySmall } from "@/components/ui/typography";
import type { PostSummary } from "@/types/post";

interface PostItemProps {
  post: PostSummary;
}

const PostItem = ({ post }: PostItemProps) => {
  // 날짜 변환
  const formattedDate = format(new Date(post.createdAt), "yyyy.MM.dd", {
    locale: ko,
  });

  const router = useRouter();

  // 클릭 이벤트 : 게시물 상세 페이지로 이동 param = post.id
  const handlePostItemClick = () => {
    router.push(`/post/detail/${post.id}`);
  };

  return (
    <Card
      onClick={handlePostItemClick}
      className="w-full group cursor-pointer transition-all duration-300 hover:shadow-md hover:border-primary/50 relative overflow-hidden h-full flex flex-col"
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
          {post.title}
        </CardTitle>
        <TypographyMuted>
          <span className="flex items-center gap-1.5">
            <User size={14} className="text-primary/70" />
            {post.user.username}
          </span>
        </TypographyMuted>
      </CardHeader>

      <CardFooter className="pt-2 border-t flex justify-between items-center text-muted-foreground bg-muted/30 group-hover:bg-transparent transition-colors duration-300">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5" title="조회수">
            <Eye size={16} />
            <TypographySmall>
              {post.viewCount ? post.viewCount : "0"}
            </TypographySmall>
          </div>
          <div className="flex items-center gap-1.5" title="좋아요">
            <ThumbsUp
              size={16}
              className="group-hover:text-red-500 transition-colors duration-300"
            />
            <TypographySmall>
              {post.likeCount ? post.likeCount : "0"}
            </TypographySmall>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Calendar size={14} />
          <TypographySmall>{formattedDate}</TypographySmall>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostItem;
