"use client";

import { PencilLineIcon, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TypographyH1 } from "@/components/ui/typography";
import { usePostStore } from "@/stores/usePostStore";
import { SearchType } from "@/types/post";

export const SearchCategories = new Map<string, Array<SearchType>>([
  ["전체", [SearchType.AUTHOR, SearchType.TITLE, SearchType.CONTENT]],
  ["제목+내용", [SearchType.TITLE, SearchType.CONTENT]],
  ["제목", [SearchType.TITLE]],
  ["내용", [SearchType.CONTENT]],
  ["작성자", [SearchType.AUTHOR]],
]);

// 카테고리 기본값
const DEFAULT_CATEGORY = "전체";

const PostListHeader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchKeyword, setSearchType, setSearchKeyword } = usePostStore();

  const router = useRouter();

  useEffect(() => {
    const initialTypes = SearchCategories.get(DEFAULT_CATEGORY);
    if (initialTypes) {
      setSearchType(initialTypes);
    }
  }, [setSearchType]);

  const handleSearch = () => {
    setSearchKeyword(inputRef.current?.value || "");
  };

  // 글 쓰기 이동
  const handleCreatePostClick = () => {
    router.push("/post/create");
  };

  return (
    <div className="w-full">
      <div className="flex justify-between px-4">
        <TypographyH1>IntraBoard</TypographyH1>
        <Button variant="default" size="lg" onClick={handleCreatePostClick}>
          <PencilLineIcon />글 쓰기
        </Button>
      </div>

      {/* 검색 헤더 */}
      <Card className="mt-4">
        <div className="mx-4 flex gap-4 flex-col md:flex-row ">
          <Field orientation="horizontal">
            <Input
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              type="search"
              placeholder="검색어를 입력하세요."
              className="flex-1"
            />
            <Button onClick={handleSearch}>검색</Button>
          </Field>

          {/* 검색 범위 콤보박스 */}
          <div className="w-40 place-self-end md:place-self-auto">
            <Combobox
              items={[...SearchCategories.keys()]}
              defaultValue="전체"
              onInputValueChange={(v) =>
                setSearchType(SearchCategories.get(v)!)
              }
            >
              <ComboboxInput readOnly onMouseDown={(e) => e.preventDefault()} />

              <ComboboxContent>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>

        {/* 검색 결과 텍스트 & 초기화 버튼 */}
        {searchKeyword.length > 0 ? (
          <div className="mx-6 flex justify-between items-center gap-2">
            <div className="flex gap-2">
              <p className="font-bold">"{searchKeyword}"</p>
              <p>에 대한 검색 결과입니다.</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
                setSearchKeyword("");
              }}
            >
              <RotateCcw />
              초기화
            </Button>
          </div>
        ) : null}
      </Card>
    </div>
  );
};

export default PostListHeader;
