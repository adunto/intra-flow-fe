"use client";

import { useState, useTransition } from "react";
import DefaultAlertDialog from "@/components/common/AlertDialog";
import EditorComponent from "@/components/feature/post/create/EditorComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypographyH1 } from "@/components/ui/typography";
import { createPost } from "@/dal/post";

const CreatePostPage = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<Array<any> | null>(null);
  const [isContentEmpty, setIsContentEmpty] = useState<boolean>(true);

  const [isPending, startTransition] = useTransition();

  // 알림창 상태
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (title.length === 0) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (isContentEmpty) {
      alert("내용을 입력해주세요.");
      return;
    }

    startTransition(async () => {
      const post = await createPost({ title, content });
      console.log(post);
      // 게시물 등록 성공
      if (post) {
        window.location.replace("/");

        setTitle("");
        setContent(null);
        setIsContentEmpty(true);
      } else {
        alert("게시물 등록이 실패되었습니다.");
      }
    });
  };

  return (
    <div className="w-full h-full pt-16 flex flex-col gap-4 items-center">
      {isPending && (
        <div
          style={{
            position: "fixed", // 화면 전체에 고정
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.4)", // 반투명한 하얀색 배경
            backdropFilter: "blur(8px)", // 핵심 기능: 배경을 뿌옇게 만드는 블러 효과
            WebkitBackdropFilter: "blur(8px)", // 사파리 브라우저 호환성을 위한 속성
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999, // 다른 모든 화면 요소들보다 무조건 맨 위에 오도록 설정
          }}
        >
          {/* 로딩 화면 정중앙에 보여질 텍스트나 스피너 아이콘을 넣습니다. */}
          <span className="text-xl font-bold text-gray-800">
            게시물 등록 중...
          </span>
        </div>
      )}

      <TypographyH1 className="h-full mt-14 min-w-5xl md:mx-20 mx-5 flex flex-col text-start">
        게시물 작성
      </TypographyH1>

      {/* 제목 + 카테고리 콤보박스 */}
      <div className="min-w-5xl md:mx-20 mx-5 flex flex-col text-start">
        {/* 카테고리 콤보박스 */}

        <Input
          placeholder="제목을 입력해주세요."
          className="w-full"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>

      {/* 에디터 공간 */}
      <EditorComponent
        onUpdate={setContent}
        setIsContentEmpty={setIsContentEmpty}
      />

      {/* 게시물 저장 버튼 */}
      <div className="min-w-5xl md:mx-20 mx-5 flex flex-col">
        <Button className="self-end" onClick={() => setOpen(true)}>
          게시물 등록
        </Button>
      </div>

      {/* 알림창 */}
      <DefaultAlertDialog
        title="게시물 등록"
        message="게시물을 등록하시겠습니까?"
        open={open}
        setOpen={setOpen}
        handleConfirm={handleSubmit}
      />
    </div>
  );
};

export default CreatePostPage;
