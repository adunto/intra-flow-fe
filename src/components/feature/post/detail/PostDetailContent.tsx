"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const PostDetailContent = ({
  savedJsonData,
}: {
  savedJsonData: Array<any>;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content: savedJsonData,
    editable: false, // 편집 불가 모드
  });

  return <EditorContent editor={editor} />;
};

export default PostDetailContent;
