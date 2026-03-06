"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2, LogOutIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { logout } from "@/dal/auth";
import { useAuthStore } from "@/stores/useAuthStore";

const UserPopover = () => {
  const { user, accessToken, setAccessToken, isPending } = useAuthStore();
  const [_, startTransition] = useTransition();
  const router = useRouter();

  // 팝업 열림 상태
  const [open, setOpen] = useState(false);

  if (isPending) {
    return (
      <Button variant="ghost" disabled className="w-32 justify-start gap-2">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        <span className="h-4 w-20 animate-pulse rounded bg-gray-200" />
      </Button>
    );
  }

  if (!user || !accessToken) {
    return (
      <Button variant="default" onClick={() => router.push("/login")}>
        로그인 / 회원가입
      </Button>
    );
  }

  const handleLogout = async () => {
    const { success, message } = await logout();

    if (success) {
      // 성공 시
      setAccessToken(null);

      startTransition(() => {
        // 팝업에서 로그아웃 한 경우 팝업 닫기
        setOpen(false);
        router.refresh();
      });
    } else {
      setAccessToken(null);
    }
  };

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-4">
            {/* 프로필 이미지 영역 */}
            <div className="relative h-8 w-8 overflow-hidden rounded-full border bg-muted">
              {user?.profileImage ? (
                <Image
                  src={user.profileImage}
                  alt={user.username}
                  fill
                  className="object-cover"
                  sizes="32px"
                  priority // LCP 최적화
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                  <UserIcon className="h-5 w-5 text-gray-500" />
                </div>
              )}
            </div>

            {/* 사용자 이름 */}
            <span className="text-sm font-medium">{user?.username}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-30 flex flex-col gap-2 p-2">
          <Button
            variant="ghost"
            className="hover:bg-gray-100"
            onClick={() => {
              router.push("/user/info");
              setOpen(false);
            }}
          >
            내 정보
          </Button>
          <Button
            variant="ghost"
            className="hover:bg-gray-100"
            onClick={() => handleLogout()}
          >
            로그아웃
          </Button>
        </PopoverContent>
      </Popover>

      {/* 로그아웃 버튼 */}
      <Button onClick={() => handleLogout()}>
        <LogOutIcon />
      </Button>
    </div>
  );
};

export default UserPopover;
