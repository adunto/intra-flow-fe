"use client";

import { Activity } from "react";
import { useTabStore } from "@/stores/useTabStore";
import Messenger from "../feature/messenger/Messenger";
import PostListContainer from "../feature/post/PostListContainer";

const MainContainer = () => {
  const { tab } = useTabStore();

  return (
    <div className="h-auto pt-16 flex justify-center">
      <Activity mode={tab === "BOARD" ? "visible" : "hidden"}>
        <PostListContainer />
      </Activity>

      <Activity mode={tab === "MESSENGER" ? "visible" : "hidden"}>
        <Messenger />
      </Activity>
    </div>
  );
};

export default MainContainer;
