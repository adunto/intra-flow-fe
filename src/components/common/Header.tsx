"use client";

import { LogOut, MessageCircleIcon, PresentationIcon } from "lucide-react";
import Logo from "../feature/header/Logo";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useTabStore } from "@/stores/useTabStore";

const RootHeader = () => {
  // 탭 스토어
  const { tab, setTab } = useTabStore();

  return (
    <header className="w-full h-18 m-0 bg-white border-b shadow-sm fixed flex items-center flex-row justify-between px-10">
      {/* 로고 & IntraFlow */}
      <Logo />

      {/* 네비게이터 Board & Messenger */}
      <Tabs defaultValue="board">
        <TabsList>
          <TabsTrigger value="board">
            <PresentationIcon />
            게시판
          </TabsTrigger>
          <TabsTrigger value="messenger">
            <MessageCircleIcon />
            메신저
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="">
        {/* 사용자 간편 정보 (버튼) 누르면 모달 띄워주기 */}

        {/* 로그아웃 버튼 */}
        <Button>
          <LogOut />
        </Button>
      </div>
    </header>
  );
};

export default RootHeader;
