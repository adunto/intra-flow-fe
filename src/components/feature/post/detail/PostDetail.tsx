import { TypographyH3 } from "@/components/ui/typography";
import PostDetailCard from "./PostDetailCard";
import PostDetailCommentInput from "./PostDetailCommentInput";
import PostDetailCommentList from "./PostDetailCommentList";

const PostDetail = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const { postId } = await params;

  return (
    <div className="w-full max-w-4xl mt-16 mx-4 flex flex-col gap-4">
      {/* 게시글 본문 + 소유자 버튼 */}
      <PostDetailCard postId={postId} />

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
