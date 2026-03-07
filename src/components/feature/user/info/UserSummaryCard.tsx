"use client";

import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getUserComments, getUserPosts } from "@/dal/user";
import { useAuthStore } from "@/stores/useAuthStore";
import type { CommentSummary } from "@/types/comment";
import type { PostSummary } from "@/types/post";

const UserSummaryCard = () => {
  const { user } = useAuthStore();

  const { data: userPosts } = useQuery<PostSummary[]>({
    queryKey: ["user", "posts"],
    queryFn: getUserPosts,
    staleTime: 1000 * 60 * 5,
  });

  const { data: userComments } = useQuery<CommentSummary[]>({
    queryKey: ["user", "comments"],
    queryFn: getUserComments,
    staleTime: 1000 * 60 * 10,
  });

  return (
    <Card className="max-w-5xl w-full mt-20">
      <CardContent>
        <div className="flex justify-between w-full items-center">
          {/* 사용자 정보 */}
          <div className="flex flex-1 items-center gap-4">
            <Avatar className="rounded-full w-24 h-24">
              <AvatarImage src={user?.profileImage} />
              <AvatarFallback>{user?.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold flex flex-col md:flex-row md:items-center md:gap-2">
                {`${user?.username ? user.username : ""} `}
                {/* <span className="text-base font-normal text-muted-foreground">
                  (담당 부서)
                </span> */}
              </h1>
              <Badge variant="outline" className="mt-2">
                🟢 온라인
              </Badge>
            </div>
          </div>

          {/* 작성글, 댓글, 결재대기 */}
          <div className="flex-1 flex gap-4 text-center items-center justify-center">
            <div>
              <div className="text-xl font-bold">
                {userPosts ? userPosts.length : "0"}
              </div>
              <div className="text-xs text-muted-foreground">작성글</div>
            </div>
            <div>
              <div className="text-xl font-bold">
                {userComments ? userComments.length : "0"}
              </div>
              <div className="text-xs text-muted-foreground">작성 댓글</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSummaryCard;
