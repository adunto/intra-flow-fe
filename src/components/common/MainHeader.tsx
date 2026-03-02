"use client";

import { MessageCircleIcon, PresentationIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { type TabEnum, useTabStore } from "@/stores/useTabStore";
import Logo from "../feature/header/Logo";
import UserInfoButton from "../feature/user/UserInfoButton";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const RootHeader = () => {
  // 탭 스토어
  const { setTab } = useTabStore();
  const [isPending, startTransition] = useTransition();

  // 현재 경로 가져오기
  const currentPath = usePathname();

  const handleTabClick = (tab: TabEnum) => {
    startTransition(() => setTab(tab));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 w-full m-0 bg-white border-b shadow-sm flex items-center flex-row justify-around">
      {/* 로고 & IntraFlow */}
      <Logo />

      {/* 현재 경로가 / 가 아니면 네비게이터 숨기기 */}
      {currentPath === "/" && (
        <Tabs defaultValue="BOARD">
          <TabsList>
            <TabsTrigger value="BOARD" onClick={() => handleTabClick("BOARD")}>
              <PresentationIcon />
              게시판
            </TabsTrigger>
            <TabsTrigger
              value="MESSENGER"
              onClick={() => handleTabClick("MESSENGER")}
            >
              <MessageCircleIcon />
              메신저
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      {/* TODO: 사용자 간편 정보 (버튼) 누르면 모달 띄워주기 */}
      <UserInfoButton />
    </header>
  );
};

export default RootHeader;
