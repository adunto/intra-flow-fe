"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2, LogOutIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/dal/auth";
import { getUserInfo } from "@/dal/user";
import { useAuthStore } from "@/stores/useAuthStore";
import type { User } from "@/types/user";

const UserPopover = () => {
  const { accessToken, setAccessToken } = useAuthStore();
  const [startTransition] = useTransition();
  const router = useRouter();

  const { data: user, isPending: isUserPending } = useQuery<User>({
    queryKey: ["currentUser", accessToken],
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 120,
    retry: false,
  });

  if (isUserPending) {
    return (
      <Button variant="ghost" disabled className="w-32 justify-start gap-2">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        <span className="h-4 w-20 animate-pulse rounded bg-gray-200" />
      </Button>
    );
  }

  if (!accessToken) {
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
        router.refresh();
      });
    } else {
      setAccessToken(null);
    }
  };

  return (
    <div className="flex gap-2">
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

      {/* 로그아웃 버튼 */}
      <Button onClick={() => handleLogout()}>
        <LogOutIcon />
      </Button>
    </div>
  );
};

export default UserPopover;
