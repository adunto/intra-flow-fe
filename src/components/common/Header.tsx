"use client";

import { LogOut, MessageCircleIcon, PresentationIcon } from "lucide-react";
import Logo from "../feature/header/Logo";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabEnum, useTabStore } from "@/stores/useTabStore";
import { useTransition } from "react";

const RootHeader = () => {
  // 탭 스토어
  const { tab, setTab } = useTabStore();
  const [isPending, startTransition] = useTransition();

  const handleTabClick = (tab: TabEnum) => {
    startTransition(() => setTab(tab));
  };

  return (
    <header className="w-full h-18 m-0 bg-white border-b shadow-sm fixed flex items-center flex-row justify-between px-10">
      {/* 로고 & IntraFlow */}
      <Logo />

      {/* 네비게이터 Board & Messenger */}
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
