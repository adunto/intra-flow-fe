"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const EditorComponent = ({
  onUpdate,
  setIsContentEmpty
}: {
  onUpdate: (content: any) => void;
  setIsContentEmpty: (value: boolean) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
    shouldRerenderOnTransaction: true,
    immediatelyRender: true,
    onUpdate: ({ editor }) => {
      // 비어있으면 상태 true, 아니면 false
      if (editor.isEmpty) {
        setIsContentEmpty(true);
      } else {
        setIsContentEmpty(false);
      }
      const jsonContent = editor.getJSON();
      onUpdate(jsonContent);
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="min-w-5xl md:mx-20 mx-5 border border-gray-200 rounded-md">
      {/* 툴바 영역: 텍스트 스타일을 변경하는 버튼들 모음 */}
      <div className="flex gap-2 h-full items-center p-2">
        {/* 굵게 버튼: 클릭 시 toggleBold() 함수를 실행해 텍스트를 굵게 만듭니다. */}
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive("bold") ? "default" : "secondary"}
          size="sm"
        >
          <BoldIcon />
        </Button>

        {/* 기울임 버튼 */}
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive("italic") ? "default" : "outline"}
          size="sm"
        >
          <ItalicIcon />
        </Button>

        {/* 취소선 버튼 */}
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          variant={editor.isActive("strike") ? "default" : "outline"}
          size="sm"
        >
          <StrikethroughIcon />
        </Button>

        {/* 밑줄 버튼 */}
        <Button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          variant={editor.isActive("underline") ? "default" : "outline"}
          size="sm"
        >
          <UnderlineIcon />
        </Button>
      </div>

      <Separator />

      {/* 실제 사용자가 텍스트를 입력하고 확인하는 본문 영역입니다. */}
      <EditorContent
        editor={editor}
        className="min-h-[200px] max-h-[600px] mt-4 p-2 overflow-y-auto"
      />
    </div>
  );
};

export default EditorComponent;
