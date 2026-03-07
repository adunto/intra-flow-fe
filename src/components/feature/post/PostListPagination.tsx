import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePostStore } from "@/stores/usePostStore";

interface PostListPaginationProps {
  total: number;
  page: number;
  lastPage: number;
}

const PostListPagination = ({ page, lastPage }: PostListPaginationProps) => {
  const { setCurrentPagination } = usePostStore();

  // 페이지 그룹 설정 (10개 단위)
  const PAGE_GROUP_SIZE = 10;
  const currentGroup = Math.floor((page - 1) / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, lastPage);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handlePageChange = (p: number) => {
    if (p >= 1 && p <= lastPage) {
      setCurrentPagination(p);
    }
  };

  return (
    <Pagination className="my-4">
      <PaginationContent>
        {page > 1 && (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
          </PaginationItem>
        )}

        {pages.map((item) => (
          <PaginationItem
            key={item}
            className="cursor-pointer"
            onClick={() => handlePageChange(item)}
          >
            <PaginationLink isActive={item === page}>{item}</PaginationLink>
          </PaginationItem>
        ))}

        {page < lastPage && (
          <PaginationItem className="cursor-pointer">
            <PaginationNext onClick={() => handlePageChange(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PostListPagination;