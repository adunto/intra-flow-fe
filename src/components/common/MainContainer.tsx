"use client";

import { useTabStore } from "@/stores/useTabStore";
import { Activity } from "react";
import Board from "../feature/board/Board";
import Messenger from "../feature/messenger/Messenger";

const MainContainer = () => {
  const { tab } = useTabStore();

  return (
    <div className="w-full h-screen">
      <Activity mode={tab === "BOARD" ? "visible" : "hidden"}>
        <Board />
      </Activity>

      <Activity mode={tab === "MESSENGER" ? "visible" : "hidden"}>
        <Messenger />
      </Activity>
    </div>
  );
};

export default MainContainer;
