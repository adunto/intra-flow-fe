"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar, Eye, ThumbsUp, User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      className="w-full h-18 group cursor-pointer transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:bg-primary/5 relative overflow-hidden flex flex-col"
    >
      <CardContent className="h-full flex flex-row justify-between items-center">
        {/* 게시글 - 제목 */}
        <div className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
          {post.title}
        </div>

        {/* 게시글 - 작성자, 조회수, 좋아요, 작성일 */}
        <div className="h-full flex items-center gap-6">
          <TypographyMuted>
            <span className="flex items-center gap-1.5">
              <User size={14} className="text-primary/70" />
              {post.user.username}
            </span>
          </TypographyMuted>

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

          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <TypographySmall>{formattedDate}</TypographySmall>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostItem;
