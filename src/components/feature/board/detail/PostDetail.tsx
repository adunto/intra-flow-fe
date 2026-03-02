import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TypographyH3, TypographyMuted } from "@/components/ui/typography";
import { fetchPostDetail } from "@/dal/post";
import PostDetailCommentInput from "./PostDetailCommentInput";
import PostDetailCommentList from "./PostDetailCommentList";
import PostDetailContent from "./PostDetailContent";

// TODO : 게시물 캐싱

const PostDetail = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const { postId } = await params;

  // 캐싱 필요
  const postDetail = await fetchPostDetail(postId);

  // 데이터가 없을 경우 오류 처리
  if (!postDetail) {
    alert("존재하지 않는 게시물입니다.");
    return;
  }

  return (
    <div className="w-full max-w-4xl mt-16 mx-4 flex flex-col gap-4">
      <Card className="w-full">
        {/* 게시물 제목 + 작성자 + 작성일 */}
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
            {postDetail.title}
          </CardTitle>
          <TypographyMuted>
            <span className="flex items-center gap-1.5">
              <User size={14} className="text-primary/70" />
              {postDetail.user.username}
            </span>
          </TypographyMuted>
        </CardHeader>

        <Separator className="" />

        {/* 게시물 본문 내용 */}
        <CardContent>
          <PostDetailContent savedJsonData={postDetail.content} />
        </CardContent>
      </Card>

      {/* 댓글 목록 */}
      <div className="w-full mt-10">
        <TypographyH3>댓글</TypographyH3>
        <PostDetailCommentList postId={postId} />
      </div>

      {/* 댓글 작성 인풋 */}
      <PostDetailCommentInput postId={postId} />
    </div>
  );
};

export default PostDetail;
