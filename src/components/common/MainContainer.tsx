"use client";

import { Activity } from "react";
import { useTabStore } from "@/stores/useTabStore";
import Board from "../feature/post/Board";
import Messenger from "../feature/messenger/Messenger";

const MainContainer = () => {
  const { tab } = useTabStore();

  return (
    <div className="h-auto pt-16 flex justify-center">
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
