"use client";

import { Activity } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";

const PostOwnerButtons = ({
  postUserId,
  setOpen,
}: {
  postUserId: number;
  setOpen: (val: boolean) => void;
}) => {
  const { user } = useAuthStore();

  // 해당 게시물 사용자 확인
  const isAuthor = postUserId === user?.id;

  return (
    <Activity mode={isAuthor ? "visible" : "hidden"}>
      <div className="w-full flex justify-end mt-2">
        {isAuthor && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              수정
            </Button>
            <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
              삭제
            </Button>
          </div>
        )}
      </div>
    </Activity>
  );
};

export default PostOwnerButtons;
