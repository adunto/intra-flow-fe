import { Suspense } from "react";
import PostDetail from "@/components/feature/board/detail/PostDetail";
import PostDetailSkeleton from "@/components/feature/board/detail/PostDetailSkeleton";

const PostDetailPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  return (
    <div className="h-auto pt-16 flex justify-center w-full">
      {/* 게시물 제목 + 내용 */}
      <Suspense fallback={<PostDetailSkeleton />}>
        <PostDetail params={params} />
      </Suspense>
    </div>
  );
};

export default PostDetailPage;
